const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Plan name
    price: { type: Number, required: true }, // Subscription price
    durationInDays: { type: Number, required: true }, // Plan duration in days

    facilities: {
        contactsView: { type: Number, default: 0 }, // Total contact views allowed per month
        connections: { type: Number, default: 0 }, // Total connections allowed per month
        messages: { type: Number, default: 0 }, // Total messages allowed per month
        recommendation: { type: Number, default: 0 }, // Maximum number of recommendations allowed
        advanceAnalytics: { type: Boolean, default: false }, // Access to advanced analytics
        customMatching: { type: Boolean, default: false }, // Access to custom matching ranking
        searchAndFilter: { type: Boolean, default: false }, // Access to advanced search and filter options
    },

    isActive: { type: Boolean, default: true }, // Whether the plan is active or not
    createdAt: { type: Date, default: Date.now }, // Plan creation date
    updatedAt: { type: Date, default: Date.now }, // Plan last update date
});

module.exports = mongoose.model('Subscription', subscriptionSchema);


const freePlan = new Subscription({
    name: 'Free',
    price: 0,
    durationInDays: 30,
    facilities: {
        contactsView: 5, // Limited contact views per month
        connections: 5, // Limited connections per month
        messages: 5, // Limited messages per month
        recommendation: 0, // No recommendations allowed
        advanceAnalytics: false, // No advanced analytics
        customMatching: false, // No custom matching
        searchAndFilter: false // No advanced search and filter
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
});

const premiumPlan = new Subscription({
    name: 'Premium',
    price: 1000, // Assume the price is 100 units of currency
    durationInDays: 30,
    facilities: {
        contactsView: 50, // 50 contacts view per month
        connections: 50, // 50 connections allowed
        messages: 50, // 50 messages per month
        recommendation: 0, // 0 recommendations allowed
        advanceAnalytics: true, // Receive advanced analytics
        customMatching: true, // Receive custom matching ranking
        searchAndFilter: true, // Access to advanced search and filter options
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
});

const premiumPlusPlan = new Subscription({
    name: 'Premium Plus',
    price: 2000,
    durationInDays: 60,
    facilities: {
        contactsView: 100, // 100 contacts view per month
        connections: 100, // 100 connections allowed
        messages: 100, // 100 messages per month
        recommendation: 0, // 0 recommendations allowed
        advanceAnalytics: true, // Advanced analytics for each match
        customMatching: true, // Custom matching ranking
        searchAndFilter: true, // Advanced search and filter
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
});

const vedicRecommenderPlan = new Subscription({
    name: 'Vedic Recommender',
    price: 500,
    durationInDays: 30,
    facilities: {
        contactsView: 150, // 150 contacts view per month
        connections: 150, // 150 connections allowed
        messages: 150, // 150 messages per month
        recommendation: 20, // 20 recommendations allowed
        advanceAnalytics: true, // Advanced analytics for each match
        customMatching: true, // Custom matching ranking
        searchAndFilter: true, // Advanced search and filter
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
});
