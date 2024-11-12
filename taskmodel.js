const db = require('../db');

const Task = {
  getAllTasks: (userId, callback) => {
    const sql = 'SELECT * FROM tasks WHERE user_id = ?';
    db.query(sql, [userId], callback);
  },

  getTaskById: (id, callback) => {
    const sql = 'SELECT * FROM tasks WHERE id = ?';
    db.query(sql, [id], callback);
  },

  createTask: (task, callback) => {
    const sql = 'INSERT INTO tasks (user_id, title, description, deadline, priority) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [task.user_id, task.title, task.description, task.deadline, task.priority], callback);
  },

  updateTask: (id, task, callback) => {
    const sql = 'UPDATE tasks SET title = ?, description = ?, deadline = ?, priority = ? WHERE id = ?';
    db.query(sql, [task.title, task.description, task.deadline, task.priority, id], callback);
  },

  deleteTask: (id, callback) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], callback);
  },
};

module.exports = Task;
