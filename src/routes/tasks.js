import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Fetch tasks for a user for today
router.get('/:userId/:date', async (req, res) => {
  const { userId, date } = req.params;
  const tasks = await Task.find({ userId, date });
  res.json(tasks);
});

// Add task
router.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

// Toggle task completion
router.patch('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
