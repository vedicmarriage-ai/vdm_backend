// Auth Middleware
const jwt = require('jsonwebtoken');


const User = require('../models/User'); // Import User model

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from the headers
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID
        const user = await User.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
};

module.exports = authMiddleware;
