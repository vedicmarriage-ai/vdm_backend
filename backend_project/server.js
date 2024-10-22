// Server Setup

//Keep server.js for Server Setup: Use it mainly to handle environment configuration, middleware that applies globally, and starting the server.
    //Starting the server and listening on a specific port.
    //Importing the app object from app.js.
    //Handling any server-level logic (e.g., WebSockets, clustering, etc.).
    //Centralized error handling related to server startup or shutdown.


const http = require('http');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const hsts = require('hsts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables based on the environment (dev, prod)
dotenv.config({ path: `.env.${process.env.NODE_ENV}` }); // Ensure NODE_ENV is set to 'dev' or 'prod'

// Import the configured app from app.js
const app = require('./app');

// Custom middleware imports
const { errorHandler } = require('./middlewares/errorHandler');

// 1. Set up CORS policies using environment variable whitelist
const allowedOrigins = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : [];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// 2. API Rate limiting to prevent DDoS attacks (max 100 requests per minute by default)
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: process.env.RATE_LIMIT || 100, // Adjust as per your needs
    message: 'Too many requests, please try again later.'
});
app.use(limiter);

// 3. HTTP Headers for security (Content Security Policy, HSTS)
app.use(helmet()); // Helmet to secure the app by setting various HTTP headers
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    }
}));
app.use(hsts({
    maxAge: 31536000, // Max age of the policy (1 year)
    includeSubDomains: true, // Apply to subdomains
    preload: true,
}));

// 4. API request payload content-type and size filtering
app.use(bodyParser.json({
    limit: process.env.PAYLOAD_LIMIT || '10kb' // Restrict payload size to 10kb (or as per your requirement)
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: process.env.PAYLOAD_LIMIT || '10kb'
}));

// 5. Database connection (Remove hardcoded string, use environment variable)
const dbConnection = process.env.MONGO_URI; 
if (!dbConnection) {
    throw new Error('DB connection string not found. Please set MONGO_URI in environment variables.');
}
mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(`DB Connection Error: ${err.message}`));

// 6. Error handling for uncaughtException and unhandledRejection
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1); // Force exit
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    // Optionally log and restart server if necessary
});

// 7. Use cloud storage for file uploads, not local server storage
// Example for using cloud storage (like AWS S3, Google Cloud)
const { uploadToCloud } = require('./services/cloudUploadService'); // A separate service file for cloud uploading
app.post('/upload', (req, res) => {
    uploadToCloud(req.file) // Cloud upload service handling
        .then(url => res.json({ url }))
        .catch(err => res.status(500).json({ error: 'Upload failed', details: err.message }));
});

// 8. Error handling middleware
app.use(errorHandler); // Centralized error handling (use custom middleware as needed)

// Define the port and start the server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
