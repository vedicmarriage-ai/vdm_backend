// modules/connect/services/userConnectService.js

const BaseConnectService = require('./BaseConnectService');
const User = require('../../users/models/User');

class UserConnectService extends BaseConnectService {
    constructor() {
        super(User);
    }

    // Additional user-specific methods if required
}

module.exports = new UserConnectService();
