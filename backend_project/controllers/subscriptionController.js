// Subscription Controller
const subscriptionService = require('./services/subscriptionService');


/**
 * Create a new subscription for the user after payment
 * Endpoint: POST /api/subscription/create
 */
const createSubscription = async (req, res) => {
    const { userId, subscriptionId, paymentInfo } = req.body;
    try {
        await subscriptionService.assignSubscriptionToUser(userId, subscriptionId, paymentInfo);
        res.status(200).json({ message: 'Subscription created successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Assign a subscription to a user
 * Endpoint: POST /api/subscription/assign
 */
const assignSubscription = async (req, res) => {
    const { userId, subscriptionId, paymentInfo } = req.body;
    try {
        await subscriptionService.assignSubscriptionToUser(userId, subscriptionId, paymentInfo);
        res.status(200).json({ message: 'Subscription assigned successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Track facility usage for a user
 * Endpoint: POST /api/subscription/use-facility
 */
const useFacility = async (req, res) => {
    const { userId, facility } = req.body;
    try {
        await subscriptionService.trackFacilityUsage(userId, facility);
        res.status(200).json({ message: `Used one ${facility}.` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createSubscription,
    assignSubscription,
    useFacility,
};
