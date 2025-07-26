const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// POST a new task
router.post('/', async (req, res) => {
  try {

        console.log("📦 Incoming POST body:", req.body);

    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: "Task text is required" });
    }

    const newTask = new Task({ text, completed: false });
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (err) {
    console.error("❌ Failed to save task:", err);
    res.status(500).json({ error: "Failed to save task" });
  }
});

// PUT to toggle or update task
router.put('/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
