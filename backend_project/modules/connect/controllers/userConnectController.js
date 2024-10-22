// modules/connect/controllers/userConnectController.js

const userConnectService = require('../services/userConnectService');

module.exports = {
    sendRequest: async (req, res) => {
        try {
            const result = await userConnectService.sendRequest(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    acceptRequest: async (req, res) => {
        try {
            const result = await userConnectService.acceptRequest(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    rejectRequest: async (req, res) => {
        try {
            const result = await userConnectService.rejectRequest(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    blockRequest: async (req, res) => {
        try {
            const result = await userConnectService.blockRequest(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};
