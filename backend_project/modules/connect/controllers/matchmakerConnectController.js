// modules/connect/controllers/matchmakerConnectController.js

const matchmakerConnectService = require('../services/matchmakerConnectService');

module.exports = {
    sendRequest: async (req, res) => {
        try {
            const result = await matchmakerConnectService.sendRequest(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    acceptRequest: async (req, res) => {
        try {
            const result = await matchmakerConnectService.acceptRequest(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    rejectRequest: async (req, res) => {
        try {
            const result = await matchmakerConnectService.rejectRequest(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    blockRequest: async (req, res) => {
        try {
            const result = await matchmakerConnectService.blockRequest(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};
