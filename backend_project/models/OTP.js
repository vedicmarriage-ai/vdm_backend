// OTP Model
const mongoose = require('mongoose');
const OTPSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    otp: String,
    expiresAt: Date,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('OTP', OTPSchema);