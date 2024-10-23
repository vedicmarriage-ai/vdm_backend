// User Model
const mongoose = require('mongoose');

// Define the schema for connections
const connectionRequestSchema = new mongoose.Schema({
    requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['user', 'matchmaker'], required: true }, // Source of connection
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'blocked'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})


// // Define the schema for recommendations
// const recommendationSchema = new mongoose.Schema({
//     userId: {                                  //store the ID of the user for whom recommendations are being made.
//         type: mongoose.Schema.Types.ObjectId, // Reference to the User model,Specifies that this field should contain an ObjectId.
//         ref: 'User',                           // Indicates that this is a reference to a User model
//         required: true                         // This field is mandatory
//     },
//     matchmakerId: {                            //Makes this field mandator
//         type: mongoose.Schema.Types.ObjectId, // Reference to the User model for the matchmaker
//         ref: 'User',                           // Indicates that this is a reference to a User
//         required: true                         // This field is mandatory
//     },
//     recommendedUserIds: [{                     //hold the IDs of users recommended to the userId.
//         type: mongoose.Schema.Types.ObjectId, // Array of references to recommended users
//         ref: 'User'                           // Indicates that these are references to the User model
//     }],
//     status: {                                 // field stores the status of the recommendation 
//         type: String,                         // Field to store the status of the recommendation
//         enum: ['pending', 'accepted', 'declined'], // Allowed values for the status
//         default: 'pending'                    // Default value for the status is 'pending'
//     },
//     createdAt: {                               // stores the date and time when the recommendation was created  
//         type: Date,                           // Field to store the creation date of the recommendation
//         default: Date.now                     // Default value is the current date and time
//     },
//     updatedAt: {                              // this field tracks when the recommendation was last updated
//         type: Date,                           // Field to store the last updated date of the recommendation
//         default: Date.now                     // Default value is the current date and time
//     },
// });



const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    password: { type: String, required: true }, // User's password

    verification: {
        gallery: [{ 
            photoId: { type: mongoose.Schema.Types.ObjectId, ref: 'GalleryPhoto', default: null }, // Reference to the verified gallery photo
            url: { type: String, default: null }, // URL for the verified user-uploaded photo
            uploadedAt: { type: Date, default: Date.now } // Date the photo was uploaded
        }],
        verifiedPhotos: { 
            selfie: { type: String, default: null }, // URL of the verified selfie
            govtId: { 
                front: { type: String, default: null }, // URL of the verified front image of the government ID
                back: { type: String, default: null }    // URL of the verified back image of the government ID
            }
        }
    },
    connections: {
        sentRequests: [connectionRequestSchema], // Requests initiated by the user
        receivedRequests: [connectionRequestSchema], // Requests received by the user
        confirmedConnections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        lastConnectedAt: Date,
    },

    //recommendations: [recommendationSchema], // Include the recommendation schema here
    recommendations: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        matchmakerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        recommendedUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }],

    subscription: {
        subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }, // Reference to the subscription plan
        paymentInfo: {
            transactionId: { type: String }, // Transaction ID for the payment
            paymentMethod: { type: String }, // e.g., "credit_card", "paypal"
            paymentDate: { type: Date },     // Date of the payment
        },
        subscribedAt: { type: Date, default: Date.now }, // Date when subscription started
        validTill: { type: Date },                       // Expiry date of the current subscription

        facilitiesUsage: {
            contactsView: {
                total: { type: Number, default: 0 },     // Total allowed contact views from the subscription plan
                remaining: { type: Number, default: 0 }, // Remaining contact views
            },
            connections: {
                total: { type: Number, default: 0 },     // Total allowed connections from the subscription plan
                remaining: { type: Number, default: 0 }, // Remaining connections
            },
            messages: {
                total: { type: Number, default: 0 },     // Total allowed messages from the subscription plan
                remaining: { type: Number, default: 0 }, // Remaining messages
            },
            recommendations: {
                total: { type: Number, default: 0 },     // Total recommendations allowed from the plan
                remaining: { type: Number, default: 0 }, // Remaining recommendations
            },
            advancedAnalytics: {
                enabled: { type: Boolean, default: false }, // Whether advanced analytics is enabled for the user
            },
            customMatching: {
                enabled: { type: Boolean, default: false }, // Whether custom matching is enabled for the user
            },
            searchAndFilter: {
                enabled: { type: Boolean, default: false }, // Whether advanced search and filter options are enabled
            }
        }
    },


    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);