// OTP Model /verification model

/*

# photo verifcation
Upload Process:
When a user uploads a selfie, government ID (front and back), or a gallery photo,
save the file to the 'uploads/unverified/' directory, and set the status to 'pending'.
  
Verification Process:
Once verification occurs (e.g., through an admin review or automated process):
- Update the status field of the relevant image to 'verified'.
- Move the image to 'uploads/verified/' if you choose to separate verified images 
  from unverified ones.
- Optionally, update the imageUrl to reflect the new location.

Retrieval Process:
When fetching user data, check the status of each image and serve the 
appropriate URL based on whether the image is verified or unverified.
*/


/**
 * 
### OTP verication  
Features:
    -Purpose Field: Helps differentiate the OTP use cases like registration, login, password reset.
    -OTP Expiry: Ensures OTPs expire within a short period for security reasons.
    -Attempts Field: Limits the number of verification attempts to prevent brute-force attacks.
    -Example Use Case (Dedicated OTP Schema)
        A user requests to reset their password.
        The OTP is generated and stored in the OTP collection, not touching the main user collection.
        When the user verifies the OTP, it updates the OTP record in the dedicated collection without modifying the user document until the OTP verification is successful.
updating
    Once the OTP is verified, the system can update the user’s password in the User collection, without needing to handle OTP logic directly in the user schema.

 * 
 */
const mongoose = require('mongoose');


const verificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user being verified
  
  selfie: { 
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' }, 
    lastUpdated: { type: Date, default: Date.now }, 
    capturedImageUrl: String, // URL for the live captured image
    verificationMethod: { type: String, enum: ['live_capture', 'manual_upload'], default: 'live_capture' }, 
    verificationResult: { type: String, enum: ['successful', 'failed', 'pending'], default: 'pending' },
    unverifiedUrl: { type: String } // URL for unverified selfie
  },
  
  govtId: { 
    number: { type: String, required: true }, // Government ID number
    front: { 
      imageUrl: { type: String, required: true }, // URL for the front image
      status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' }, 
      lastUpdated: { type: Date, default: Date.now } 
    }, 
    back: { 
      imageUrl: { type: String, required: true }, // URL for the back image
      status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' }, 
      lastUpdated: { type: Date, default: Date.now } 
    } 
  },

  galleryPhotos: [{ 
    photoId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    photoUrl: { type: String, required: true }, // URL for gallery photos
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' }, 
    verificationComments: { type: String }, // Optional comments from the verifier
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the photo was uploaded
    lastUpdated: { type: Date, default: Date.now }, // Timestamp for the last update to the photo's verification status
    verifiedAt: { type: Date }, // Timestamp for when the photo was verified (if applicable)

  }],
  
  otp: {
    otpCode: { type: String, required: true }, // Generated OTP code
    purpose: { type: String, required: true }, // Purpose (e.g., 'registration', 'login', 'password_reset')
    otpType: { type: String, required: true }, // OTP type ('mobile', 'email')
    isVerified: { type: Boolean, default: false }, // Indicates if OTP was successfully verified
    createdAt: { type: Date, default: Date.now }, // When the OTP was generated
    expiresAt: { type: Date, required: true }, // Expiry time for the OTP (e.g., 5-10 minutes)
    attempts: { type: Number, default: 0 } // Number of verification attempts made
  }

});

// Exporting the Verification model
const Verification = mongoose.model('Verification', verificationSchema);
module.exports = Verification;
