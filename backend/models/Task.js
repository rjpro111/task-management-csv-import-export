// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, index: true },
  description: { type: String, default: '' },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], required: true },
  assignedUsers: [{ type: String }], // For simplicity, using strings. Replace with ObjectId references if using a User model.
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
