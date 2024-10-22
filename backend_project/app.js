
//Use app.js for Application Logic: This keeps routing, middleware, and application-specific logic centralized, allowing easier navigation and modifications

// App Configuration

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const recommendationRoutes = require('./modules/recommend/routes/recommendationRoutes'); // Import reccomend  routes
const connectRoutes = require('./modules/connect/routes/connectRoutes'); // Import connect routes



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



// Integrate recommendation routes
app.use('/api/recommend', recommendationRoutes);

// Integrate connect routes
app.use('/api/connect', connectRoutes); // Mount connect routes under /api/connect

// Other global middleware...

// Database connection and server start logic...
