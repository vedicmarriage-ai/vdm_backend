// Service to handle business logic for connection requests
const ConnectRequest = require('../models/ConnectRequest');

module.exports = {
    sendRequest: async (data) => {
        const newRequest = new ConnectRequest({
            senderId: data.senderId,
            receiverId: data.receiverId
        });
        return await newRequest.save();
    },

    acceptRequest: async (data) => {
        const request = await ConnectRequest.findOneAndUpdate(
            { senderId: data.senderId, receiverId: data.receiverId, status: 'pending' },
            { status: 'accepted', updatedAt: Date.now() },
            { new: true }
        );
        if (!request) throw new Error('No pending request found');
        return request;
    },

    rejectRequest: async (data) => {
        const request = await ConnectRequest.findOneAndUpdate(
            { senderId: data.senderId, receiverId: data.receiverId, status: 'pending' },
            { status: 'rejected', updatedAt: Date.now() },
            { new: true }
        );
        if (!request) throw new Error('No pending request found');
        return request;
    },

    blockRequest: async (data) => {
        const request = await ConnectRequest.findOneAndUpdate(
            { senderId: data.senderId, receiverId: data.receiverId },
            { status: 'blocked', updatedAt: Date.now() },
            { new: true }
        );
        return request;
    },
    /// Open/Closed Principle (OCP)
    ///nadding ew feature like “snoozing” a request doesn't modify the existing logic of sending/accepting/rejecting/blocking requests.
    snoozeRequest: async (data) => {
        const request = await ConnectRequest.findOneAndUpdate(
            { senderId: data.senderId, receiverId: data.receiverId, status: 'pending' },
            { status: 'snoozed', updatedAt: Date.now() },
            { new: true }
        );
        if (!request) throw new Error('No pending request found');
        return request;
    }
    
};


///Interface Segregation Principle (ISP)
///Instead of one general-purpose interface, multiple client-specific interfaces are better.
// we split our logic into smaller, specific functions. Each function in the service layer is responsible for a single operation (send, accept, reject, block).
/// This ensures that different parts of the system interact only with the methods they need.