
//Use app.js for Application Logic: This keeps routing, middleware, and application-specific logic centralized, allowing easier navigation and modifications

// App Configuration

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));





const recommendationRoutes = require('./modules/recommend/routes/recommendationRoutes');

app.use('/api/recommend', recommendationRoutes);

// Connect to MongoDB and start the server...




module.exports = app;
