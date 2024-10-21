// Matchmaker Recommendation Controller
const recommendationService = require('../services/recommendationService');
module.exports = {
    recommendUsers: async (req, res) => {
        try {
            const recommendations = await recommendationService.getRecommendations(req.user);
            res.status(200).json(recommendations);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};