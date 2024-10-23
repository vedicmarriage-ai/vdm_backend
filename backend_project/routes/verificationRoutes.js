// generic(OTP) verification Routes
const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

// Route to verify OTP and update password
router.post('/otp/verify', verificationController.verifyOTPAndUpdatePassword);

// Route to verify selfie
router.post('/selfie/verify', verificationController.verifySelfie);

// Route to verify gallery photo
router.post('/gallery/verify', verificationController.verifyGalleryPhoto);

// Route to generate OTP
router.post('/otp/generate', verificationController.generateOTP);

module.exports = router;
