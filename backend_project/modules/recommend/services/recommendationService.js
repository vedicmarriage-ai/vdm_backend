//This service handles the business logic for recommendations.


const User = require('../models/userModel');
const { trackFacilityUsage } = require('../services/subscriptionService'); // Assuming you have this function to track usage

const createRecommendation = async (userId, matchmakerId, recommendedUserIds) => {
    try {
        const user = await User.findById(userId).populate('subscription');
        if (!user) {
            throw new Error('User not found');
        }

        // Check if user has the Vedic Recommender Plan
        if (user.subscription.subscriptionId.toString() !== process.env.VEDIC_RECOMMENDER_PLAN_ID) {
            throw new Error('User does not have Vedic Recommender Plan');
        }

        // Check if the user has remaining recommendations
        const usage = user.subscription.facilitiesUsage.recommendation;
        if (usage.remaining <= 0) {
            throw new Error('No remaining recommendations available');
        }

        // Create the recommendation
        const recommendation = {
            userId,
            matchmakerId,
            recommendedUserIds,
            status: 'pending',
        };

        user.recommendations.push(recommendation);
        await user.save();

        // Track usage of the recommendation
        await trackFacilityUsage(userId, 'recommendation');

        return recommendation;
    } catch (error) {
        throw new Error(`Error creating recommendation: ${error.message}`);
    }
};

const updateRecommendation = async (userId, recommendationId, status) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const recommendation = user.recommendations.id(recommendationId);
        if (!recommendation) {
            throw new Error('Recommendation not found');
        }

        recommendation.status = status;
        recommendation.updatedAt = Date.now();

        await user.save();
        return recommendation;
    } catch (error) {
        throw new Error(`Error updating recommendation: ${error.message}`);
    }
};

const deleteRecommendation = async (userId, recommendationId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const recommendation = user.recommendations.id(recommendationId);
        if (!recommendation) {
            throw new Error('Recommendation not found');
        }

        recommendation.remove();
        await user.save();
        return { message: 'Recommendation deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting recommendation: ${error.message}`);
    }
};

module.exports = {
    createRecommendation,
    updateRecommendation,
    deleteRecommendation,
};
