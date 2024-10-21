
// modules/recommendations/models/Recommendation.js
const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    matchmakerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recommendedUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


// modules/recommendations/controllers/recommendationController.js
const User = require('../../../models/User')


module.exports = mongoose.model('Recommendation', recommendationSchema);

