require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/leetcodetracker')
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('students');

    try {
      await collection.dropIndexes();
      console.log('ℹ️ Dropped existing indexes');
    } catch (e) {
      console.log('ℹ️ No indexes to drop or error:', e.message);
    }

    const duplicates = await collection.aggregate([
      {
        $group: {
          _id: "$username",
          ids: { $push: "$_id" },
          count: { $sum: 1 }
        }
      },
      { $match: { count: { $gt: 1 } } }
    ]).toArray();

    for (const doc of duplicates) {
      const idsToRemove = doc.ids.slice(1); // keep the first
      await collection.deleteMany({ _id: { $in: idsToRemove } });
      console.log(`🧹 Removed ${idsToRemove.length} duplicate(s) for username: ${doc._id}`);
    }

    console.log('✅ Duplicate cleanup complete');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Schema and Model
const StudentSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, index: true },
  totalSolved: { type: Number, default: 0 },
  easySolved: { type: Number, default: 0 },
  mediumSolved: { type: Number, default: 0 },
  hardSolved: { type: Number, default: 0 },
});

StudentSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Username must be unique'));
  } else {
    next(error);
  }
});

const Student = mongoose.model('Student', StudentSchema);

// LeetCode Stats Fetch Route
app.post('/api/fetch', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  const query = `
    query {
      matchedUser(username: "${username}") {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      'https://leetcode.com/graphql',
      { query },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const data = response.data.data.matchedUser?.submitStatsGlobal?.acSubmissionNum;

    if (!data) return res.status(404).json({ error: 'User not found' });

    const stats = {
      username,
      totalSolved: data[0]?.count || 0,
      easySolved: data[1]?.count || 0,
      mediumSolved: data[2]?.count || 0,
      hardSolved: data[3]?.count || 0,
    };

    res.json(stats);
  } catch (err) {
    console.error('❌ Error fetching stats:', err.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Save Student Route
app.post('/api/save', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    const existingStudent = await Student.findOne({ username });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student already saved' });
    }

    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Saved successfully' });
  } catch (err) {
    console.error('❌ Error saving student:', err.message);
    if (err.message.includes('unique')) {
      return res.status(400).json({ error: 'Student already saved' });
    }
    res.status(500).json({ error: 'Save failed' });
  }
});

// Get All Students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error('❌ Error fetching students:', err.message);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Update Student
app.put('/api/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const updates = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updates, { new: true });
    if (!updatedStudent) return res.status(404).json({ error: 'Student not found' });

    res.json(updatedStudent);
  } catch (err) {
    console.error('❌ Error updating student:', err.message);
    res.status(500).json({ error: 'Update failed' });
  }
});

// ✅ Delete Student Route - Improved
app.delete('/api/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) return res.status(404).json({ error: 'Student not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting student:', err.message);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
