const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const dotenv = require('dotenv');
const path = require('path');
const db=require('./config/db')

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from uploads directory (for downloading files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/tasks', taskRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskmanagerexport')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
