//This controller manages the requests and responses for recommendations.

const recommendationService = require('../services/recommendationService');

/**
 * Create a new recommendation.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createRecommendation = async (req, res) => {
    const { recommendedUserIds } = req.body;
    try {
        const recommendation = await recommendationService.createRecommendation(req.user.id, req.user.id, recommendedUserIds);
        return res.status(201).json(recommendation);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


/**
 * Update an existing recommendation.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateRecommendation = async (req, res) => {
    const { recommendationId, status } = req.body;
    try {
        const recommendation = await recommendationService.updateRecommendation(req.user.id, recommendationId, status);
        return res.status(200).json(recommendation);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


/**
 * Delete a recommendation.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteRecommendation = async (req, res) => {
    const { recommendationId } = req.body;
    try {
        const result = await recommendationService.deleteRecommendation(req.user.id, recommendationId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createRecommendation,
    updateRecommendation,
    deleteRecommendation,
};


