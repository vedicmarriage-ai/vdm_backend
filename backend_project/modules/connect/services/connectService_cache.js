const cache = new CacheService(); // New service instead of MongoDB

module.exports = {

    sendRequest: async (data) => {
        const newRequest = new cache({
            senderId: data.senderId,
            receiverId: data.receiverId
        });
        return await newRequest.save();
    },
    acceptRequest: async (data) => {
        const request = await cache.updateRequest(
            data.senderId, data.receiverId, 'accepted'
        );
        if (!request) throw new Error('No pending request found');
        return request;
    }
}

///Liskov Substitution Principle (LSP)
// Objects or instances of a subclass should be replaceable with instances of their parent class without affecting the correctness of the program.
//If we replace the MongoDB implementation in connectService.js with an in-memory cache for handling pending requests, the controller doesn’t need to change