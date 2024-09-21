// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = 'your-mongodb-connection-string'; // Replace with your MongoDB connection string
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
