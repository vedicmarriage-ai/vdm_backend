class BaseConnectionService {
    sendConnection(senderId, receiverId) {
        // Basic connection logic
        return ConnectionRepository.createConnection(senderId, receiverId);
    }
}