// Generic(OTP) verification Service
const Verification = require('../models/verificationModel');
const User = require('../models/userModel'); // Import the User model if you need to update user details like password

const axios = require('axios'); // For making third-party API calls
const nodemailer = require('nodemailer'); // For sending emails


class VerificationService {

  // Verify OTP and handle password updates #------------TODO some code are redundant as we have verify otp calss
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

    // Send OTP to phone number using third-party API
    async sendPhoneOtp(userId, phoneNumber) {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate random 6-digit OTP
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10-minute expiry
      
      // Save OTP in the verification record
      let verification = await Verification.findOne({ userId });
      if (!verification) {
        verification = new Verification({ userId });
      }
      verification.otp = {
        otpCode,
        purpose: 'phone_verification',
        otpType: 'mobile',
        expiresAt,
        isVerified: false,
        createdAt: Date.now(),
        attempts: 0
      };
      await verification.save();
  
      // Send OTP using the third-party SMS API
      const smsApiUrl = 'https://third-party-sms-api.com/send'; // Replace with the actual SMS API URL
      const smsApiKey = 'YOUR_SMS_API_KEY'; // Replace with your SMS API key
  
      const response = await axios.post(smsApiUrl, {
        apiKey: smsApiKey,
        to: phoneNumber,
        message: `Your OTP code is ${otpCode}`
      });
  
      if (response.data.status !== 'success') {
        throw new Error('Failed to send OTP to phone number');
      }
  
      return { message: 'OTP sent to phone successfully' };
    }
  
    // Send OTP to email using nodemailer
    async sendEmailOtp(userId, email) {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate random 6-digit OTP
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10-minute expiry
      
      // Save OTP in the verification record
      let verification = await Verification.findOne({ userId });
      if (!verification) {
        verification = new Verification({ userId });
      }
      verification.otp = {
        otpCode,
        purpose: 'email_verification',
        otpType: 'email',
        expiresAt,
        isVerified: false,
        createdAt: Date.now(),
        attempts: 0
      };
      await verification.save();
  
      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Replace with your email service
        auth: {
          user: 'your-email@gmail.com', // Replace with your email
          pass: 'your-email-password' // Replace with your email password
        }
      });
  
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your Email OTP Code',
        text: `Your OTP code is ${otpCode}`
      };
  
      await transporter.sendMail(mailOptions);
  
      return { message: 'OTP sent to email successfully' };
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

  // Verify OTP (for both phone and email)
  async verifyOtp(userId, otpCode) {
    const verification = await Verification.findOne({ userId });

    if (!verification || verification.otp.otpCode !== otpCode || verification.otp.expiresAt < Date.now()) {
      throw new Error('Invalid or expired OTP');
    }

    verification.otp.isVerified = true;
    await verification.save();

    return { message: 'OTP verified successfully' };
  }

}

module.exports = new VerificationService();
