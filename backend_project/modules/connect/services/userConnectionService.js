class UserConnectionService extends BaseConnectionService {
    sendConnection(senderId, receiverId) {
        // Specific logic for friend connections
        return ConnectionRepository.createConnection(senderId, receiverId, { type: 'friend' });
    }
}