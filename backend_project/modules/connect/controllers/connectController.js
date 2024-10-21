// Handles request logic like sending, accepting, rejecting, and blocking connection requests
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
                    