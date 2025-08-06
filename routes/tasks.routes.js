const express = require('express');
const router = express.Router();
const Task = require('../models/Task.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// GET all tasks for the logged-in user
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Failed to fetch tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST a new task for the logged-in user
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;

    console.log("📦 Incoming POST body:", req.body);
    console.log("👤 User ID:", userId);

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: "Task text is required" });
    }

    const newTask = new Task({
      text,
      completed: false,
      user: userId,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("❌ Failed to save task:", err);
    res.status(500).json({ error: "Failed to save task" });
  }
});

// PUT to update a task (only if it belongs to the logged-in user)
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId }, // ensure ownership
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error("❌ Failed to update task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE a task (only if it belongs to the logged-in user)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: userId
    });

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to delete task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
