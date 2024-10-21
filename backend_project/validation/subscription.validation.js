const { body } = require('express-validator');

module.exports = {
    createSubscription: [
        body('type').isIn(['Free', 'Premium', 'Premium Plus']).withMessage('Invalid subscription type'),
        body('duration').isInt({ gt: 0 }).withMessage('Duration must be a positive integer')
    ]
};