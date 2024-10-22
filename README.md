# Backend Project Structure

```plaintext
├── config
    └── .env.development
    └── .env.production
    └── chatConfig.js
    └── cloudStorage.js
    └── corsConfig.js
    └── db.js
    └── otpConfig.js
    └── roleAccessConfig.js
├── controllers
    └── adminController.js
    └── authController.js
    └── chatController.js
    └── matchController.js
    └── moduleController.js
    └── notificationController.js
    └── otpController.js
    └── roleController.js
    └── subscriptionController.js
    └── userController.js
├── logs
    └── .keep
├── middlewares
    └── authMiddleware.js
    └── contentSecurityPolicy.js
    └── corsMiddleware.js
    └── errorHandler.js
    └── hsts.js
    └── moduleAccessMiddleware.js
    └── otpValidator.js
    └── rateLimiter.js
    └── roleMiddleware.js
    └── uploadHandler.js
    └── validateRequest.js
├── models
    └── Chat.js
    └── ChatParticipant.js
    └── Match.js
    └── Module.js
    └── Notification.js
    └── OTP.js
    └── Role.js
    └── Subscription.js
    └── User.js
├── modules
    ├── chat
        ├── controller
            └── chatController.js
        ├── model
            └── chatModel.js
        ├── router
            └── chatRouter.js
        ├── services
            └── chatService.js
    ├── connect
        ├── controllers
            └── connectController.js
            └── matchmakerConnectController.js
            └── userConnectController.js
        ├── models
            └── ConnectRequest.js
        ├── routes
            └── connectRoutes.js
            └── matchmakerConnectRoutes.js
            └── userConnectRoutes.js
        ├── services
            └── baseConnectionService.js
            └── connectService.js
            └── connectService_cache.js
            └── matchmakerConnectionService.js
            └── userConnectionService.js
    ├── recommend
        ├── controller
            └── recommendationController.js
        ├── model
            └── recommendationModel.js
        ├── router
            └── recommendationRouter.js
        ├── services
            └── recommendationService.js
        └── README.md
├── notifications
    ├── emailTemplates
        └── passwordReset.html
        └── welcomeEmail.html
    ├── otpTemplates
        └── otpVerification.html
    └── notificationService.js
├── public
    └── index.html
├── routes
    └── adminRoutes.js
    └── authRoutes.js
    └── chatRoutes.js
    └── matchRoutes.js
    └── moduleRoutes.js
    └── notificationRoutes.js
    └── otpRoutes.js
    └── recommendationRoutes.js
    └── roleRoutes.js
    └── subscriptionRoutes.js
    └── userRoutes.js
├── services
    └── chatService.js
    └── cloudService.js
    └── emailService.js
    └── moduleService.js
    └── notificationService.js
    └── otpService.js
    └── recommendationService.js
    └── roleService.js
    └── subscriptionService.js
├── tasks
    └── chatMessageCleanup.js
    └── matchScoreRecalculation.js
    └── otpExpirationHandler.js
    └── subscriptionRenewal.js
    └── taskQueue.js
├── tests
    ├── helpers
        └── testUtils.js
    ├── integration
        └── match.routes.test.js
        └── subscription.routes.test.js
        └── user.routes.test.js
    ├── unit
        └── match.test.js
        └── otp.test.js
        └── subscription.test.js
        └── user.test.js
├── uploads
    └── .keep
├── utils
    └── chatHelper.js
    └── helper.js
    └── jwt.js
    └── logger.js
    └── otpHelper.js
    └── roleHelper.js
├── validation
    └── auth.validation.js
    └── match.validation.js
    └── otp.validation.js
    └── subscription.validation.js
    └── user.validation.js
└── README.md
└── app.js
└── server.js
```

## How to Set Up the Project

1. **Clone the Repository:**
```bash
git clone <repository-url>
cd backend_project
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Create Environment Files:**
- Create your own `.env.development` and `.env.production` files and set up your environment variables.

4. **Run the Application:**
```bash
node server.js
```

5. **Access the API:**
- The API will be running on the specified port in your configuration files.
