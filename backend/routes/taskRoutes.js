// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route to export tasks to CSV
router.get('/export', taskController.exportTasks);

// Route to import tasks from CSV
router.post('/import', taskController.importTasks);

// You can add other CRUD routes here as needed

module.exports = router;
