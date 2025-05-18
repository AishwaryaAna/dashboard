require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB once, using either environment variable or local default
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/leetcodetracker')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Define Mongoose schema and model
const StudentSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, index: true }, // add required and index for uniqueness
  totalSolved: { type: Number, default: 0 },
  easySolved: { type: Number, default: 0 },
  mediumSolved: { type: Number, default: 0 },
  hardSolved: { type: Number, default: 0 },
});

// Handle duplicate key error nicely
StudentSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Username must be unique'));
  } else {
    next(error);
  }
});

const Student = mongoose.model('Student', StudentSchema);

// API routes

// Fetch stats from LeetCode GraphQL API
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
    console.error('Error fetching stats:', err.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Save student stats — only if not already saved
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
    console.error('Error saving student:', err.message);
    // Differentiate duplicate key error for safety
    if (err.message.includes('unique')) {
      return res.status(400).json({ error: 'Student already saved' });
    }
    res.status(500).json({ error: 'Save failed' });
  }
});

// Get all saved students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err.message);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
