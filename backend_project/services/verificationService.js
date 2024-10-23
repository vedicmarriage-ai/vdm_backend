// Generic(OTP) verification Service
const Verification = require('../models/verificationModel');
const User = require('../models/userModel'); // Import the User model if you need to update user details like password

class VerificationService {

  // Verify OTP and handle password updates
  async verifyOTPAndUpdatePassword(userId, otpCode, newPassword) {
    const verification = await Verification.findOne({ userId });

    if (!verification || verification.otp.otpCode !== otpCode || verification.otp.expiresAt < Date.now()) {
      throw new Error('Invalid or expired OTP');
    }

    // Mark OTP as verified
    verification.otp.isVerified = true;
    await verification.save();

    // Update user password in the User model
    await User.findByIdAndUpdate(userId, { password: newPassword });
    
    return { message: 'Password updated successfully' };
  }

  // Verify selfie photo
  async verifySelfie(userId, capturedImageUrl) {
    const verification = await Verification.findOne({ userId });
    if (!verification) throw new Error('Verification record not found');

    verification.selfie.status = 'verified';
    verification.selfie.capturedImageUrl = capturedImageUrl;
    verification.selfie.lastUpdated = Date.now();
    
    await verification.save();

    return { message: 'Selfie verified successfully' };
  }

  // Verify gallery photo
  async verifyGalleryPhoto(userId, photoId) {
    const verification = await Verification.findOne({ userId });
    if (!verification) throw new Error('Verification record not found');

    const photo = verification.galleryPhotos.id(photoId);
    if (!photo) throw new Error('Gallery photo not found');

    photo.status = 'verified';
    photo.verifiedAt = Date.now();
    
    await verification.save();

    return { message: 'Gallery photo verified successfully' };
  }

  // Create and send OTP
  async createOTP(userId, purpose, otpCode, otpType) {
    const verification = await Verification.findOne({ userId });
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    verification.otp = {
      otpCode,
      purpose,
      otpType,
      expiresAt,
      isVerified: false,
      attempts: 0,
      createdAt: Date.now(),
    };

    await verification.save();
    return { message: 'OTP generated successfully', otpCode }; // In real case, send OTP via email/SMS
  }
}

module.exports = new VerificationService();
