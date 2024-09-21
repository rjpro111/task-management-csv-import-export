// utils/validation.js
const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().allow(''),
  dueDate: Joi.date().iso().required(),
  priority: Joi.string().valid('Low', 'Medium', 'High').required(),
  status: Joi.string().valid('To Do', 'In Progress', 'Done').required(),
  assignedUsers: Joi.string().allow(''), // Assuming names are separated by semicolons
});

const validateTask = (task) => {
  // Split assignedUsers string into an array
  if (task.assignedUsers) {
    task.assignedUsers = task.assignedUsers.split(';').map(user => user.trim());
  } else {
    task.assignedUsers = [];
  }

  return taskSchema.validate(task);
};

module.exports = { validateTask };
