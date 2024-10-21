const { body } = require('express-validator');

module.exports = {
    validateOtp: [
        body('otp').isNumeric().withMessage('OTP must be numeric'),
        body('userId').isMongoId().withMessage('Invalid user ID')
    ]
};