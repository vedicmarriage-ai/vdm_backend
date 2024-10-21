class MatchmakerConnectionService extends BaseConnectionService {
    sendConnection(senderId, receiverId) {
        // Specific logic for matchmaker connections
        return ConnectionRepository.createConnection(senderId, receiverId, { type: 'matchmaker' });
    }
}