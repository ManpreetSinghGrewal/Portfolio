const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const resumeRoutes = require('./routes/resume');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
// In a real scenario, you'd use process.env.MONGO_URI
// We'll try connecting to a local MongoDB instance, but it's optional for the portfolio to just display projects.
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error (Contact form might not work):', err.message);
  }
};

connectDB();

// Routes
app.use('/api', apiRoutes);
app.use('/api/resume', resumeRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
