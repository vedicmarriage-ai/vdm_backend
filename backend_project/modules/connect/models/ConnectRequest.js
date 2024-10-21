// Mongoose Schema for Connection Requests
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectRequestSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected', 'blocked'], 
        default: 'pending' 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

module.exports = mongoose.model('ConnectRequest', connectRequestSchema);
                    