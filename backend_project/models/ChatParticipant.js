// Chat Participant Model
const mongoose = require('mongoose');
const ChatParticipantSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('ChatParticipant', ChatParticipantSchema);