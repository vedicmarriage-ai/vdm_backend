// modules/connect/services/BaseConnectService.js

const User = require('../../users/models/User');

class BaseConnectService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async sendRequest({ senderId, receiverId, type }) {
        const sender = await this.userModel.findById(senderId);
        const receiver = await this.userModel.findById(receiverId);

        if (!sender || !receiver) throw new Error('User not found');

        const requestExists = receiver.connections.receivedRequests.find(
            (request) => request.requesterId.equals(senderId)
        );

        if (requestExists) throw new Error('Request already sent');

        // Update sender and receiver documents
        sender.connections.sentRequests.push({ requesterId: receiverId, type });
        receiver.connections.receivedRequests.push({ requesterId: senderId, type });

        await sender.save();
        await receiver.save();

        return { message: 'Request sent' };
    }

    async acceptRequest({ receiverId, senderId }) {
        const receiver = await this.userModel.findById(receiverId);
        const sender = await this.userModel.findById(senderId);

        if (!receiver || !sender) throw new Error('User not found');

        const requestIndex = receiver.connections.receivedRequests.findIndex(
            (request) => request.requesterId.equals(senderId) && request.status === 'pending'
        );

        if (requestIndex === -1) throw new Error('Request not found');

        // Update status to accepted
        receiver.connections.receivedRequests[requestIndex].status = 'accepted';
        receiver.connections.confirmedConnections.push(senderId);

        sender.connections.confirmedConnections.push(receiverId);
        sender.connections.sentRequests = sender.connections.sentRequests.filter(
            (request) => !request.requesterId.equals(receiverId)
        );

        await receiver.save();
        await sender.save();

        return { message: 'Request accepted' };
    }

    async rejectRequest({ receiverId, senderId }) {
        const receiver = await this.userModel.findById(receiverId);
        const sender = await this.userModel.findById(senderId);

        if (!receiver || !sender) throw new Error('User not found');

        const requestIndex = receiver.connections.receivedRequests.findIndex(
            (request) => request.requesterId.equals(senderId) && request.status === 'pending'
        );

        if (requestIndex === -1) throw new Error('Request not found');

        // Update status to rejected
        receiver.connections.receivedRequests[requestIndex].status = 'rejected';
        sender.connections.sentRequests = sender.connections.sentRequests.filter(
            (request) => !request.requesterId.equals(receiverId)
        );

        await receiver.save();
        await sender.save();

        return { message: 'Request rejected' };
    }

    async blockRequest({ receiverId, senderId }) {
        const receiver = await this.userModel.findById(receiverId);
        const sender = await this.userModel.findById(senderId);

        if (!receiver || !sender) throw new Error('User not found');

        const requestIndex = receiver.connections.receivedRequests.findIndex(
            (request) => request.requesterId.equals(senderId)
        );

        if (requestIndex === -1) throw new Error('Request not found');

        // Update status to blocked
        receiver.connections.receivedRequests[requestIndex].status = 'blocked';

        await receiver.save();
        return { message: 'Request blocked' };
    }
}

module.exports = BaseConnectService;
