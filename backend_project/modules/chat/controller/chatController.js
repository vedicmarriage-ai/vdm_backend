// Chat Controller
const chatService = require('../services/chatService');
module.exports = {
    sendMessage: async (req, res) => {
        try {
            const message = await chatService.sendMessage(req.user, req.body);
            res.status(200).json(message);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};