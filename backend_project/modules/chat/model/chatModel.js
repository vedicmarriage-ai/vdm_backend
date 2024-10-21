// Chat Model
const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    from_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    media: { type: String },
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Chat', chatSchema);