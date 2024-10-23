// generic(OTP) verification Controller
const VerificationService = require('../services/verificationService');

// Verify OTP and update password
exports.verifyOTPAndUpdatePassword = async (req, res) => {
  const { userId, otpCode, newPassword } = req.body;
  try {
    const result = await VerificationService.verifyOTPAndUpdatePassword(userId, otpCode, newPassword);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Verify Selfie
exports.verifySelfie = async (req, res) => {
  const { userId, capturedImageUrl } = req.body;
  try {
    const result = await VerificationService.verifySelfie(userId, capturedImageUrl);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Verify Gallery Photo
exports.verifyGalleryPhoto = async (req, res) => {
  const { userId, photoId } = req.body;
  try {
    const result = await VerificationService.verifyGalleryPhoto(userId, photoId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Generate OTP
exports.generateOTP = async (req, res) => {
  const { userId, purpose, otpType } = req.body;
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate random 6-digit OTP

  try {
    const result = await VerificationService.createOTP(userId, purpose, otpCode, otpType);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
