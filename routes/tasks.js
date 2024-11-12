const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const jwt = require('jsonwebtoken');

// Middleware for token validation
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access token missing');
  jwt.verify(token.split(' ')[1], 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.userId = user.userId;
    next();
  });
}

// RESTful API Routes
router.get('/tasks', authenticateToken, taskController.getTasks);
router.get('/tasks/:id', authenticateToken, taskController.getTaskById);
router.post('/tasks', authenticateToken, taskController.createTask);
router.put('/tasks/:id', authenticateToken, taskController.updateTask);
router.delete('/tasks/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
