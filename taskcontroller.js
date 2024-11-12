const Task = require('../models/taskModel');

// Get all tasks
exports.getTasks = (req, res) => {
  const userId = req.userId;
  Task.getAllTasks(userId, (err, results) => {
    if (err) return res.status(500).send('Failed to retrieve tasks');
    res.json(results);
  });
};

// Get a single task by ID
exports.getTaskById = (req, res) => {
  const taskId = req.params.id;
  Task.getTaskById(taskId, (err, results) => {
    if (err || results.length === 0) return res.status(404).send('Task not found');
    res.json(results[0]);
  });
};

// Create a new task
exports.createTask = (req, res) => {
  const task = {
    user_id: req.userId,
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    priority: req.body.priority,
  };
  Task.createTask(task, (err) => {
    if (err) return res.status(500).send('Failed to create task');
    res.status(201).send('Task created successfully');
  });
};

// Update a task
exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const updatedTask = {
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    priority: req.body.priority,
  };
  Task.updateTask(taskId, updatedTask, (err) => {
    if (err) return res.status(500).send('Failed to update task');
    res.send('Task updated successfully');
  });
};

// Delete a task
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  Task.deleteTask(taskId, (err) => {
    if (err) return res.status(500).send('Failed to delete task');
    res.send('Task deleted successfully');
  });
};
