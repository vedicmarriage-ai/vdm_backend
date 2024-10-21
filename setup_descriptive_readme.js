const fs = require('fs');
const path = require('path');


// Create README.md
const readmeContent = `# Backend Project Structure

This document outlines the structure of the backend project and the purpose of each folder and file within it.

## Folder Structure

\`\`\`plaintext
backend_project/
│
├── config/                            // Configuration files for different environments and services
│   ├── .env.development               // Environment variables for development
│   ├── .env.production                // Environment variables for production
│   ├── cloudStorage.js                // Cloud storage configuration
│   ├── corsConfig.js                  // CORS configuration for whitelisting IPs
│   ├── db.js                          // Database connection configuration
│   ├── otpConfig.js                   // OTP configuration (e.g., expiration time, retry limits)
│   ├── roleAccessConfig.js            // Configuration for Role-Based Access Control (RBAC) settings
│   └── chatConfig.js                  // Configurations related to chat (e.g., message retention, media upload limits)
│
├── controllers/                       // Controllers for handling requests and business logic
│   ├── authController.js              // Authentication related functions (login, register, OTP)
│   ├── userController.js              // User profile management functions
│   ├── matchController.js             // Match generation and fetching functions
│   ├── subscriptionController.js      // Subscription management functions
│   ├── adminController.js             // Admin functions for sensitive changes
│   ├── roleController.js              // Role management functions for users and admins
│   ├── moduleController.js            // Module management functions for different roles
│   ├── otpController.js               // OTP handling for verification, login, and password reset
│   ├── chatController.js              // Chat system functions for messaging, group chats, and media sharing
│   └── notificationController.js      // Notifications related to sensitive changes or new messages
│
├── middlewares/                       // Middleware functions for processing requests
│   ├── authMiddleware.js              // Middleware for validating JWT tokens
│   ├── roleMiddleware.js              // Middleware for checking user roles and permissions
│   ├── errorHandler.js                // Central error handling middleware
│   ├── rateLimiter.js                 // Rate limiting middleware to prevent abuse
│   ├── contentSecurityPolicy.js       // Content Security Policy middleware
│   ├── hsts.js                        // HTTP Strict Transport Security middleware
│   ├── corsMiddleware.js              // Middleware for CORS settings
│   ├── validateRequest.js             // Middleware for validating request payloads
│   ├── otpValidator.js                // Middleware for validating OTP requests
│   ├── moduleAccessMiddleware.js      // Middleware to check if a user has access to a module
│   └── uploadHandler.js               // Middleware for handling file uploads (including chat media)
│
├── models/                            // Mongoose models for MongoDB
│   ├── User.js                        // User model schema
│   ├── Match.js                       // Match model schema
│   ├── Subscription.js                // Subscription model schema
│   ├── Notification.js                // Notification model schema
│   ├── Role.js                        // Role model schema (storing different roles and permissions)
│   ├── Module.js                      // Module model schema (storing different modules for role access)
│   ├── OTP.js                         // OTP model schema (storing OTP tokens and status)
│   ├── Chat.js                        // Chat model schema (storing chat messages and metadata)
│   └── ChatParticipant.js             // Chat participant schema (for group chats, storing participants and their roles)
│
├── routes/                            // API route definitions
│   ├── authRoutes.js                  // Routes for authentication (login, OTP verification)
│   ├── userRoutes.js                  // Routes for user profile operations
│   ├── matchRoutes.js                 // Routes for fetching matches
│   ├── subscriptionRoutes.js          // Routes for handling subscriptions
│   ├── adminRoutes.js                 // Routes for admin-related actions
│   ├── recommendationRoutes.js        // Routes for matchmaker-related actions
│   ├── roleRoutes.js                  // Routes for managing roles and permissions
│   ├── moduleRoutes.js                // Routes for managing modules
│   ├── otpRoutes.js                   // Routes for OTP verification (login, registration, password reset)
│   ├── chatRoutes.js                  // Routes for sending/receiving messages and media sharing
│   └── notificationRoutes.js          // Routes for notifications (e.g., new message alerts)
│
├── services/                          // Services for external integrations and internal logic
│   ├── cloudService.js                // Logic for handling cloud uploads
│   ├── emailService.js                // Logic for sending emails
│   ├── recommendationService.js       // Logic for recommendations by matchmakers
│   ├── otpService.js                  // Logic for generating and validating OTPs
│   ├── roleService.js                 // Logic for handling role-based access
│   ├── moduleService.js               // Logic for managing modules and access control
│   ├── chatService.js                 // Logic for handling chat data, message delivery, and media sharing
│   └── notificationService.js         // Logic for handling notifications (e.g., new messages, admin alerts)
│
├── utils/                             // Utility functions and helpers
│   ├── helper.js                      // General helper functions
│   ├── logger.js                      // Logger setup (e.g., using Winston)
│   ├── jwt.js                         // JWT generation and verification functions
│   ├── otpHelper.js                   // Helper functions for OTP generation and validation
│   ├── roleHelper.js                  // Helper functions for role verification
│   └── chatHelper.js                  // Helper functions for chat-related tasks (e.g., formatting messages)
│
├── notifications/                     // Notification handling
│   ├── notificationService.js         // Logic for sending notifications (email, push, etc.)
│   ├── emailTemplates/                // Email templates for notifications
│   │   └── changeApprovalEmail.html   // HTML template for change approval emails
│   └── otpTemplates/                  // OTP templates for user notifications
│       ├── otpVerificationEmail.html   // Template for OTP verification emails
│       └── otpResetPasswordEmail.html  // Template for OTP password reset emails
│
├── tasks/                             // Background tasks and cron jobs
│   ├── taskQueue.js                   // Task queue management
│   ├── matchScoreRecalculation.js     // Logic for recalculating match scores
│   ├── otpExpirationHandler.js        // Logic for handling OTP expirations
│   ├── chatMessageCleanup.js          // Logic for cleaning up old chat messages
│   └── subscriptionRenewal.js         // Logic for subscription renewals and expirations
│
├── public/                            // Publicly accessible files
│   └── index.html                     // Main HTML file served to the client
│
├── uploads/                           // Directory for file uploads (managed with cloud storage)
│   └── .keep                          // Keep the uploads directory in version control
│
├── logs/                              // Directory for logs (for monitoring and debugging)
│   └── .keep                          // Keep the logs directory in version control
│
├── tests/
│   ├── unit/
│   │   ├── user.test.js: // Unit tests for User model functions and user-related functionalities.
│   │   ├── match.test.js: // Unit tests for Match model functions, validating matchmaking logic.
│   │   ├── subscription.test.js: // Unit tests for Subscription model functions and plans management.
│   │   └── otp.test.js: // Unit tests for OTP model functions, ensuring correct OTP handling.
│   │
│   ├── integration/
│   │   ├── user.routes.test.js: // Integration tests for User API routes like registration and login.
│   │   ├── match.routes.test.js: // Integration tests for Match API routes, verifying match endpoints.
│   │   └── subscription.routes.test.js: // Integration tests for Subscription API routes.
│   │
│   └── helpers/
│       └── testUtils.js: // Helper functions for setting up tests and creating test data.
│
├── validation/
|     ├── user.validation.js: // Validation rules for user data in registration and login.
|     ├── match.validation.js: // Validation logic for match-related data inputs.
|     ├── subscription.validation.js: // Validation rules for subscription data formatting.
|     ├── otp.validation.js: // Validation logic for OTP and user ID formats.
|     └── auth.validation.js: // Validation rules for authentication inputs like email and password.
|     
├── server.js                          // Main entry point to start the server
└── app.js                             // Application setup and configuration
\`\`\`

`;


// Create the README.md content
const readmeContent_final = `# Backend Project Structure\n\n\`\`\`plaintext\n${readmeContent}\n\n` +
`# How to Set Up the Project\n\n` +
`1. **Clone the Repository:**\n` +
`\`\`\`bash\n` +
`git clone <repository-url>\n` +
`cd backend_project\n` +
`\`\`\`\n\n` +
`2. **Install Dependencies:**\n` +
`\`\`\`bash\n` +
`npm install\n` +
`\`\`\`\n\n` +
`3. **Create Environment Files:**\n` +
`- Create your own \`.env.development\` and \`.env.production\` files and set up your environment variables.\n\n` +
`4. **Run the Application:**\n` +
`\`\`\`bash\n` +
`node server.js\n` +
`\`\`\`\n\n` +
`5. **Access the API:**\n` +
`- The API will be running on the specified port in your configuration files.\n`;

// Save the structure into README.md
fs.writeFileSync(path.join(__dirname, 'backend_project', 'README.md'), readmeContent_final);

console.log('Folder structure and setup instructions saved to README.md');
