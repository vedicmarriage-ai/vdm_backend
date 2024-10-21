

// modules/recommend/services/recommendationService.js
const Recommendation = require('../model/recommendationModel');

exports.createRecommendation = async (data) => {
    const recommendation = new Recommendation(data);
    return await recommendation.save();
};

exports.getRecommendationsForUser = async (userId) => {
    return await Recommendation.find({ userId }).populate('recommendedUserIds');
};

// More services can be added as needed...
