// Match Model
const mongoose = require('mongoose');
const MatchSchema = new mongoose.Schema({
    userId1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userId2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: Number,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Match', MatchSchema);