// User Model
const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['user', 'matchmaker'], required: true }, // Source of connection
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'blocked'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    connections: {
        sentRequests: [connectionRequestSchema], // Requests initiated by the user
        receivedRequests: [connectionRequestSchema], // Requests received by the user
        confirmedConnections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        lastConnectedAt: Date,
    },
    
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);