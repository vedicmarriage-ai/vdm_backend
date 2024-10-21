const { body } = require('express-validator');

module.exports = {
    register: [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    login: [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').exists().withMessage('Password is required')
    ]
};