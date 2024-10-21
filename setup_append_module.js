const fs = require('fs');
const path = require('path');


const structure = {
    "backend_project": {

        "modules": {
"connect": {
                "controllers": {
                    "connectController.js": `// Handles request logic like sending, accepting, rejecting, and blocking connection requests
const connectService = require('../services/connectService');

module.exports = {
    sendRequest: async (req, res) => {
        try {
            const result = await connectService.sendRequest(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    acceptRequest: async (req, res) => {
        try {
            const result = await connectService.acceptRequest(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    rejectRequest: async (req, res) => {
        try {
            const result = await connectService.rejectRequest(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    blockRequest: async (req, res) => {
        try {
            const result = await connectService.blockRequest(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
                    `
                },
                "models": {
                    "ConnectRequest.js": `// Mongoose Schema for Connection Requests
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectRequestSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected', 'blocked'], 
        default: 'pending' 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

module.exports = mongoose.model('ConnectRequest', connectRequestSchema);
                    `
                },
                "services": {
                    "connectService.js": `// Service to handle business logic for connection requests
const ConnectRequest = require('../models/ConnectRequest');

module.exports = {
    sendRequest: async (data) => {
        const newRequest = new ConnectRequest({
            senderId: data.senderId,
            receiverId: data.receiverId
        });
        return await newRequest.save();
    },

    acceptRequest: async (data) => {
        const request = await ConnectRequest.findOneAndUpdate(
            { senderId: data.senderId, receiverId: data.receiverId, status: 'pending' },
            { status: 'accepted', updatedAt: Date.now() },
            { new: true }
        );
        if (!request) throw new Error('No pending request found');
        return request;
    },

    rejectRequest: async (data) => {
        const request = await ConnectRequest.findOneAndUpdate(
            { senderId: data.senderId, receiverId: data.receiverId, status: 'pending' },
            { status: 'rejected', updatedAt: Date.now() },
            { new: true }
        );
        if (!request) throw new Error('No pending request found');
        return request;
    },

    blockRequest: async (data) => {
        const request = await ConnectRequest.findOneAndUpdate(
            { senderId: data.senderId, receiverId: data.receiverId },
            { status: 'blocked', updatedAt: Date.now() },
            { new: true }
        );
        return request;
    }
};
                    `
                },
                "routes": {
                    "connectRoutes.js": `// Routes for connection request module
const express = require('express');
const router = express.Router();
const connectController = require('../controllers/connectController');

router.post('/send', connectController.sendRequest);
router.post('/accept', connectController.acceptRequest);
router.post('/reject', connectController.rejectRequest);
router.post('/block', connectController.blockRequest);

module.exports = router;
                    `
                }
            }
        }
    }
};




function createStructure(structure, basePath) {
    for (const [name, value] of Object.entries(structure)) {
        const currentPath = path.join(basePath, name);

        if (typeof value === 'object' && !Array.isArray(value)) {
            // Create a folder
            fs.mkdirSync(currentPath, { recursive: true });
            // Recursively create the structure inside the folder
            createStructure(value, currentPath);
        } else if (Array.isArray(value)) {
            // Create a folder for arrays and put files inside it
            fs.mkdirSync(currentPath, { recursive: true });
            // Create .keep files to ensure empty folders are not ignored in Git
            value.forEach(file => {
                fs.writeFileSync(path.join(currentPath, file), '');
            });
        } else {
            // Create a file and write content
            fs.writeFileSync(currentPath, value, 'utf8');
        }
    }
}


// Create the folder structure
createStructure(structure, "/Users/vedicmarriage/Documents/VedicMarriage_scratch/backend_project_setup/");