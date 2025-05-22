import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  completed: Boolean,
  date: { type: String, required: true }, // Format: YYYY-MM-DD
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
