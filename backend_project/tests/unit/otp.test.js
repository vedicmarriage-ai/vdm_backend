const OTP = require('../models/OTP');

describe('OTP Model Tests', () => {
    it('should save OTP', async () => {
        const otp = new OTP({ /* OTP data */ });
        await otp.save();
        const foundOtp = await OTP.findById(otp._id);
        expect(foundOtp).toBeDefined();
    });
});