// app.js

//Use app.js for Application Logic: This keeps routing, middleware, and application-specific logic centralized, allowing easier navigation and modifications

// Configures the application: middleware, routes, services, database connections, etc. Exports the app object.
    //Setting up application-level configurations.
    //Defining routes.
    //Loading middleware (e.g., body-parser, cors, authMiddleware).
    //Connecting to databases (e.g., MongoDB).
    // Handling the request-response cycle of the API.



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');


const mongoose = require('mongoose');
const dotenv = require('dotenv');
const api = require('./api'); // Importing API routes
const rateLimiter = require('./middlewares/rateLimiter');
const corsConfig = require('./config/corsConfig');
const hsts = require('./middlewares/hsts');
const contentSecurityPolicy = require('./middlewares/contentSecurityPolicy');
const errorHandler = require('./middlewares/errorHandler'); // Centralized error handler
const logger = require('./utils/logger'); // Logger setup


// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const roleRoutes = require('./routes/roleRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const otpRoutes = require('./routes/otpRoutes');
const chatRoutes = require('./routes/chatRoutes');
const notificationRoutes = require('./routes/notificationRoutes');



const recommendationRoutes =   require('./modules/recommend/routes/recommendationRoutes'); // Import reccomend  routes
const connectRoutes =          require('./modules/connect/routes/connectRoutes');           // Import connect routes


// Create an instance of the Express app
const app = express();

// Connect to the database
connectDB();


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json({ limit: process.env.REQUEST_PAYLOAD_LIMIT || '1mb' })); // Limit the payload size
app.use(corsConfig); // CORS configuration
app.use(hsts); // Enable HTTP Strict Transport Security
app.use(contentSecurityPolicy); // Content Security Policy
app.use(rateLimiter); // Rate limiting



// Routes for authentication
app.use('/api/auth', require('./routes/authRoutes'));       // For authentication API
// Centralized error handling
app.use(errorHandler);




// Standard routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);




// Feature-specific routes

// Integrate recommendation routes
app.use('/api/recommend', recommendationRoutes);            // Mount connect routes under /api/recommend
// Integrate connect routes
app.use('/api/connect', connectRoutes);                     // Mount connect routes under /api/connect


module.exports = app;  // Export the app
