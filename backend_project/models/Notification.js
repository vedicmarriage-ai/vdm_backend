// Notification Model
const mongoose = require('mongoose');


const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // The recipient user
    type: { 
        type: String, 
        required: true, 
        enum: [
            'admin_verification_selfie',   // Admin verification of user's selfie
            'admin_verification_govt_id',   // Admin verification of user's government ID
            'admin_sensitive_field_change',   // Admin approval for sensitive field changes (gender, mother tongue)
            'admin_photo_approval',           // Admin approval for photo uploads
            'connection_request',              // User received a connection request
            'photo_request',                   // User received a request to see their photo
            'contact_request',                 // User received a request to view contact information
            'profile_visit',                   // Notification for when someone visits their profile
            'shortlisted',                     // Notification for when a user is shortlisted by someone
            'other_user_activity'              // Placeholder for any other user activities
        ] 
    }, // Type of notification
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // The user who triggered the notification
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected', 'seen'], 
        default: 'pending' 
    }, // Status of the notification
    createdAt: { type: Date, default: Date.now }, // Timestamp for the notification
    updatedAt: { type: Date, default: Date.now }, // Timestamp for the notification update
    additionalInfo: { 
        type: Object, 
        default: {} 
    }, // Optional: Store additional information related to the notification (e.g., request details)
});

// Indexing for performance
NotificationSchema.index({ userId: 1, createdAt: -1 }); // Index to optimize query performance

module.exports = mongoose.model('Notification', NotificationSchema);
