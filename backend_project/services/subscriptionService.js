const User = require('./models/User');
const Subscription = require('./models/Subscription');

/**
 * Assigns a subscription to a user.
 * @param {ObjectId} userId - The ID of the user to assign the subscription to.
 * @param {ObjectId} subscriptionId - The ID of the subscription plan.
 * @param {Object} paymentInfo - Payment details including transactionId, paymentMethod, and paymentDate.
 */
const assignSubscriptionToUser = async (userId, subscriptionId, paymentInfo) => {
    try {
        // Fetch the subscription plan
        const subscriptionPlan = await Subscription.findById(subscriptionId);
        if (!subscriptionPlan) {
            throw new Error('Subscription plan not found');
        }

        // Calculate the expiry date based on the duration of the plan
        const subscribedAt = new Date();
        const validTill = new Date(subscribedAt);
        validTill.setDate(validTill.getDate() + subscriptionPlan.durationInDays);

        // Prepare facilitiesUsage based on the subscription plan
        const facilitiesUsage = {
            contactsView: {
                total: subscriptionPlan.facilities.contactsView,
                remaining: subscriptionPlan.facilities.contactsView,
            },
            connections: {
                total: subscriptionPlan.facilities.connections,
                remaining: subscriptionPlan.facilities.connections,
            },
            messages: {
                total: subscriptionPlan.facilities.messages,
                remaining: subscriptionPlan.facilities.messages,
            },
            recommendation: {
                total: subscriptionPlan.facilities.recommendation,
                remaining: subscriptionPlan.facilities.recommendation,
            },
            advanceAnalytics: subscriptionPlan.facilities.advanceAnalytics,  // Boolean
            customMatching: subscriptionPlan.facilities.customMatching,      // Boolean
            searchAndFilter: subscriptionPlan.facilities.searchAndFilter,    // Boolean
        };

        // Update the user with subscription details
        await User.findByIdAndUpdate(userId, {
            subscription: {
                subscriptionId: subscriptionPlan._id,
                paymentInfo: {
                    transactionId: paymentInfo.transactionId,
                    paymentMethod: paymentInfo.paymentMethod,
                    paymentDate: paymentInfo.paymentDate,
                },
                subscribedAt,
                validTill,
                facilitiesUsage,  // Initialize facilitiesUsage
            },
        });

        console.log('Subscription assigned successfully');
    } catch (error) {
        console.error('Error assigning subscription to user:', error.message);
    }
};

/**
 * Tracks the usage of a facility for a user.
 * @param {ObjectId} userId - The ID of the user.
 * @param {String} facility - The name of the facility being used (e.g., "contactsView", "messages").
 */
const trackFacilityUsage = async (userId, facility) => {
    try {
        // Fetch the user
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const usage = user.subscription.facilitiesUsage[facility];

        // Check if the facility exists and if the user has remaining usage
        if (usage && usage.remaining > 0) {
            // Deduct one from the remaining usage
            usage.remaining -= 1;

            // Save the updated user document
            await user.save();
            console.log(`Used one ${facility}. Remaining: ${usage.remaining}`);
        } else {
            console.log(`No remaining ${facility} available.`);
        }
    } catch (error) {
        console.error('Error tracking facility usage:', error.message);
    }
};

module.exports = {
    assignSubscriptionToUser,
    trackFacilityUsage,
};
