// modules/connect/services/matchmakerConnectService.js

const BaseConnectService = require('./BaseConnectService');
const User = require('../../users/models/User');

class MatchmakerConnectService extends BaseConnectService {
    constructor() {
        super(User);
    }

    // Additional matchmaker-specific methods if required
}

module.exports = new MatchmakerConnectService();
