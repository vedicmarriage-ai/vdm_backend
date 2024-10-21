const { body } = require('express-validator');

module.exports = {
    createMatch: [
        body('userId').isMongoId().withMessage('Invalid user ID'),
        body('matchId').isMongoId().withMessage('Invalid match ID')
    ]
};