const fs = require('fs');
const path = require('path');

// Define the folder structure and files to create with standard content
const structure = {
    "backend_project": {
        "config": {
            ".env.development": `# Development Environment Variables\nMONGODB_URI=mongodb://localhost:27017/matrimonial_dev\nJWT_SECRET=your_jwt_secret\nCLOUD_STORAGE_KEY=your_cloud_storage_key`,
            ".env.production": `# Production Environment Variables\nMONGODB_URI=mongodb://localhost:27017/matrimonial_prod\nJWT_SECRET=your_jwt_secret\nCLOUD_STORAGE_KEY=your_cloud_storage_key`,
            "cloudStorage.js": `// Cloud Storage Configuration\nconst cloudStorage = require('cloud-storage');\nconst config = require('config');\n\nmodule.exports = cloudStorage.connect(config.CLOUD_STORAGE_KEY);`,
            "corsConfig.js": `// CORS Configuration\nconst allowedOrigins = ['http://example.com'];\n\nmodule.exports = (req, res, next) => {\n    const origin = req.headers.origin;\n    if (allowedOrigins.includes(origin)) {\n        res.setHeader('Access-Control-Allow-Origin', origin);\n    }\n    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');\n    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');\n    next();\n};`,
            "db.js": `// Database Connection Setup\nconst mongoose = require('mongoose');\n\nconst connectDB = async () => {\n    try {\n        await mongoose.connect(process.env.MONGODB_URI, {\n            useNewUrlParser: true,\n            useUnifiedTopology: true\n        });\n        console.log('MongoDB connected');\n    } catch (err) {\n        console.error(err.message);\n        process.exit(1);\n    }\n};\n\nmodule.exports = connectDB;`,
            "otpConfig.js": `// OTP Configuration\nmodule.exports = {\n    EXPIRATION_TIME: 300, // OTP expires in 5 minutes\n    MAX_ATTEMPTS: 5 // Maximum attempts to validate OTP\n};`,
            "roleAccessConfig.js": `// Role-Based Access Control Configuration\nmodule.exports = {\n    roles: {\n        USER: 'user',\n        ADMIN: 'admin',\n        MATCHMAKER: 'matchmaker'\n    }\n};`,
            "chatConfig.js": `// Chat Configuration\nmodule.exports = {\n    MESSAGE_RETENTION_DAYS: 30,\n    MAX_MEDIA_SIZE: 5 * 1024 * 1024 // 5 MB\n};`
        },
        "controllers": {
            "authController.js": `// Authentication Controller\nconst User = require('../models/User');\nconst jwt = require('jsonwebtoken');\n\nexports.register = async (req, res) => {\n    // Registration logic\n};\n\nexports.login = async (req, res) => {\n    // Login logic\n};`,
            "userController.js": `// User Controller\nconst User = require('../models/User');\n\nexports.getUserProfile = async (req, res) => {\n    // Get user profile logic\n};`,
            "matchController.js": `// Match Controller\nconst Match = require('../models/Match');\n\nexports.getMatches = async (req, res) => {\n    // Fetch matches logic\n};`,
            "subscriptionController.js": `// Subscription Controller\nconst Subscription = require('../models/Subscription');\n\nexports.createSubscription = async (req, res) => {\n    // Create subscription logic\n};`,
            "adminController.js": `// Admin Controller\nconst User = require('../models/User');\n\nexports.approveChanges = async (req, res) => {\n    // Admin approve changes logic\n};`,
            "roleController.js": `// Role Controller\nconst Role = require('../models/Role');\n\nexports.getRoles = async (req, res) => {\n    // Get roles logic\n};`,
            "moduleController.js": `// Module Controller\nconst Module = require('../models/Module');\n\nexports.getModules = async (req, res) => {\n    // Get modules logic\n};`,
            "otpController.js": `// OTP Controller\nconst OTP = require('../models/OTP');\n\nexports.generateOTP = async (req, res) => {\n    // Generate OTP logic\n};`,
            "chatController.js": `// Chat Controller\nconst Chat = require('../models/Chat');\n\nexports.sendMessage = async (req, res) => {\n    // Send message logic\n};`,
            "notificationController.js": `// Notification Controller\nconst Notification = require('../models/Notification');\n\nexports.sendNotification = async (req, res) => {\n    // Send notification logic\n};`
        },
        "middlewares": {
            "authMiddleware.js": `// Auth Middleware\nconst jwt = require('jsonwebtoken');\n\nmodule.exports = (req, res, next) => {\n    // JWT validation logic\n};`,
            "roleMiddleware.js": `// Role Middleware\nmodule.exports = (roles) => {\n    return (req, res, next) => {\n        // Role check logic\n    };\n};`,
            "errorHandler.js": `// Error Handler Middleware\nmodule.exports = (err, req, res, next) => {\n    console.error(err.stack);\n    res.status(500).json({ message: 'Internal Server Error' });\n};`,
            "rateLimiter.js": `// Rate Limiter Middleware\nconst rateLimit = require('express-rate-limit');\n\nconst limiter = rateLimit({\n    windowMs: 15 * 60 * 1000, // 15 minutes\n    max: 100 // Limit each IP to 100 requests per windowMs\n});\n\nmodule.exports = limiter;`,
            "contentSecurityPolicy.js": `// Content Security Policy Middleware\nmodule.exports = (req, res, next) => {\n    res.setHeader('Content-Security-Policy', "default-src 'self'");\n    next();\n};`,
            "hsts.js": `// HTTP Strict Transport Security Middleware\nmodule.exports = (req, res, next) => {\n    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');\n    next();\n};`,
            "corsMiddleware.js": `// CORS Middleware\nconst allowedOrigins = ['http://example.com'];\n\nmodule.exports = (req, res, next) => {\n    const origin = req.headers.origin;\n    if (allowedOrigins.includes(origin)) {\n        res.setHeader('Access-Control-Allow-Origin', origin);\n    }\n    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');\n    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');\n    next();\n};`,
            "validateRequest.js": `// Request Validation Middleware\nmodule.exports = (req, res, next) => {\n    // Validate request payload logic\n};`,
            "otpValidator.js": `// OTP Validator Middleware\nmodule.exports = (req, res, next) => {\n    // Validate OTP logic\n};`,
            "moduleAccessMiddleware.js": `// Module Access Middleware\nmodule.exports = (req, res, next) => {\n    // Check if user has access to the module\n};`,
            "uploadHandler.js": `// Upload Handler Middleware\nconst multer = require('multer');\nconst upload = multer({ dest: 'uploads/' });\nmodule.exports = upload;`
        },
        "models": {
            "User.js": `// User Model\nconst mongoose = require('mongoose');\nconst UserSchema = new mongoose.Schema({\n    name: { type: String, required: true },\n    email: { type: String, required: true, unique: true },\n    password: { type: String, required: true },\n    role: { type: String, default: 'user' },\n    createdAt: { type: Date, default: Date.now }\n});\nmodule.exports = mongoose.model('User', UserSchema);`,
            "Match.js": `// Match Model\nconst mongoose = require('mongoose');\nconst MatchSchema = new mongoose.Schema({\n    userId1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },\n    userId2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },\n    score: Number,\n    createdAt: { type: Date, default: Date.now }\n});\nmodule.exports = mongoose.model('Match', MatchSchema);`,
            "Subscription.js": `// Subscription Model\nconst mongoose = require('mongoose');\nconst SubscriptionSchema = new mongoose.Schema({\n    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },\n    plan: String,\n    startDate: Date,\n    endDate: Date\n});\nmodule.exports = mongoose.model('Subscription', SubscriptionSchema);`,
            "Notification.js": `// Notification Model\nconst mongoose = require('mongoose');\nconst NotificationSchema = new mongoose.Schema({\n    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },\n    message: String,\n    isRead: { type: Boolean, default: false },\n    createdAt: { type: Date, default: Date.now }\n});\nmodule.exports = mongoose.model('Notification', NotificationSchema);`,
            "Role.js": `// Role Model\nconst mongoose = require('mongoose');\nconst RoleSchema = new mongoose.Schema({\n    name: { type: String, required: true },\n    description: String\n});\nmodule.exports = mongoose.model('Role', RoleSchema);`,
            "Module.js": `// Module Model\nconst mongoose = require('mongoose');\nconst ModuleSchema = new mongoose.Schema({\n    name: { type: String, required: true },\n    description: String\n});\nmodule.exports = mongoose.model('Module', ModuleSchema);`,
            "OTP.js": `// OTP Model\nconst mongoose = require('mongoose');\nconst OTPSchema = new mongoose.Schema({\n    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },\n    otp: String,\n    expiresAt: Date,\n    createdAt: { type: Date, default: Date.now }\n});\nmodule.exports = mongoose.model('OTP', OTPSchema);`,
            "Chat.js": `// Chat Model\nconst mongoose = require('mongoose');\nconst ChatSchema = new mongoose.Schema({\n    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },\n    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },\n    message: String,\n    createdAt: { type: Date, default: Date.now }\n});\nmodule.exports = mongoose.model('Chat', ChatSchema);`,
            "ChatParticipant.js": `// Chat Participant Model\nconst mongoose = require('mongoose');\nconst ChatParticipantSchema = new mongoose.Schema({\n    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },\n    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }\n});\nmodule.exports = mongoose.model('ChatParticipant', ChatParticipantSchema);`
        },
        "routes": {
            "authRoutes.js": `// Auth Routes\nconst express = require('express');\nconst router = express.Router();\nconst authController = require('../controllers/authController');\n\nrouter.post('/register', authController.register);\nrouter.post('/login', authController.login);\n\nmodule.exports = router;`,
            "userRoutes.js": `// User Routes\nconst express = require('express');\nconst router = express.Router();\nconst userController = require('../controllers/userController');\n\nrouter.get('/profile', userController.getUserProfile);\n\nmodule.exports = router;`,
            "matchRoutes.js": `// Match Routes\nconst express = require('express');\nconst router = express.Router();\nconst matchController = require('../controllers/matchController');\n\nrouter.get('/', matchController.getMatches);\n\nmodule.exports = router;`,
            "subscriptionRoutes.js": `// Subscription Routes\nconst express = require('express');\nconst router = express.Router();\nconst subscriptionController = require('../controllers/subscriptionController');\n\nrouter.post('/', subscriptionController.createSubscription);\n\nmodule.exports = router;`,
            "adminRoutes.js": `// Admin Routes\nconst express = require('express');\nconst router = express.Router();\nconst adminController = require('../controllers/adminController');\n\nrouter.post('/approve', adminController.approveChanges);\n\nmodule.exports = router;`,
            "recommendationRoutes.js": `// Recommendation Routes\nconst express = require('express');\nconst router = express.Router();\nconst recommendationController = require('../controllers/recommendationController');\n\nrouter.get('/', recommendationController.getRecommendations);\n\nmodule.exports = router;`,
            "roleRoutes.js": `// Role Routes\nconst express = require('express');\nconst router = express.Router();\nconst roleController = require('../controllers/roleController');\n\nrouter.get('/', roleController.getRoles);\n\nmodule.exports = router;`,
            "moduleRoutes.js": `// Module Routes\nconst express = require('express');\nconst router = express.Router();\nconst moduleController = require('../controllers/moduleController');\n\nrouter.get('/', moduleController.getModules);\n\nmodule.exports = router;`,
            "otpRoutes.js": `// OTP Routes\nconst express = require('express');\nconst router = express.Router();\nconst otpController = require('../controllers/otpController');\n\nrouter.post('/generate', otpController.generateOTP);\n\nmodule.exports = router;`,
            "chatRoutes.js": `// Chat Routes\nconst express = require('express');\nconst router = express.Router();\nconst chatController = require('../controllers/chatController');\n\nrouter.post('/send', chatController.sendMessage);\n\nmodule.exports = router;`,
            "notificationRoutes.js": `// Notification Routes\nconst express = require('express');\nconst router = express.Router();\nconst notificationController = require('../controllers/notificationController');\n\nrouter.post('/send', notificationController.sendNotification);\n\nmodule.exports = router;`
        },
        "services": {
            "cloudService.js": `// Cloud Service\nconst cloudStorage = require('cloud-storage');\n\nmodule.exports = {\n    uploadFile: (file) => {\n        // Upload file logic\n    }\n};`,
            "emailService.js": `// Email Service\nconst nodemailer = require('nodemailer');\n\nmodule.exports = {\n    sendEmail: (to, subject, text) => {\n        // Send email logic\n    }\n};`,
            "recommendationService.js": `// Recommendation Service\nmodule.exports = {\n    getRecommendations: (userId) => {\n        // Get user recommendations logic\n    }\n};`,
            "otpService.js": `// OTP Service\nconst OTP = require('../models/OTP');\n\nmodule.exports = {\n    generateOTP: (userId) => {\n        // Generate OTP logic\n    }\n};`,
            "roleService.js": `// Role Service\nconst Role = require('../models/Role');\n\nmodule.exports = {\n    getRoles: () => {\n        // Get roles logic\n    }\n};`,
            "moduleService.js": `// Module Service\nconst Module = require('../models/Module');\n\nmodule.exports = {\n    getModules: () => {\n        // Get modules logic\n    }\n};`,
            "chatService.js": `// Chat Service\nconst Chat = require('../models/Chat');\n\nmodule.exports = {\n    sendMessage: (senderId, receiverId, message) => {\n        // Send message logic\n    }\n};`,
            "notificationService.js": `// Notification Service\nconst Notification = require('../models/Notification');\n\nmodule.exports = {\n    sendNotification: (userId, message) => {\n        // Send notification logic\n    }\n};`
        },
        "utils": {
            "helper.js": `// Helper Functions\nmodule.exports = {\n    formatDate: (date) => {\n        // Format date logic\n    }\n};`,
            "logger.js": `// Logger Utility\nconst winston = require('winston');\n\nconst logger = winston.createLogger({\n    level: 'info',\n    format: winston.format.json(),\n    transports: [\n        new winston.transports.Console(),\n        new winston.transports.File({ filename: 'error.log', level: 'error' })\n    ]\n});\n\nmodule.exports = logger;`,
            "jwt.js": `// JWT Utility\nconst jwt = require('jsonwebtoken');\n\nmodule.exports = {\n    generateToken: (user) => {\n        // Generate JWT token logic\n    }\n};`,
            "otpHelper.js": `// OTP Helper Functions\nmodule.exports = {\n    validateOTP: (inputOTP, actualOTP) => {\n        // Validate OTP logic\n    }\n};`,
            "roleHelper.js": `// Role Helper Functions\nmodule.exports = {\n    checkAccess: (userRole, requiredRole) => {\n        // Check user role access logic\n    }\n};`,
            "chatHelper.js": `// Chat Helper Functions\nmodule.exports = {\n    formatMessage: (message) => {\n        // Format message logic\n    }\n};`
        },
        "notifications": {
            "notificationService.js": `// Notification Service\nconst Notification = require('../models/Notification');\n\nmodule.exports = {\n    createNotification: (userId, message) => {\n        // Create notification logic\n    }\n};`,
            "emailTemplates": {
                "welcomeEmail.html": `<html><body><h1>Welcome to Matrimonial Site!</h1><p>Thank you for registering.</p></body></html>`,
                "passwordReset.html": `<html><body><h1>Password Reset</h1><p>Click <a href="{{resetLink}}">here</a> to reset your password.</p></body></html>`
            },
            "otpTemplates": {
                "otpVerification.html": `<html><body><h1>Your OTP Code</h1><p>Your OTP code is {{otpCode}}. It is valid for {{expiration}} minutes.</p></body></html>`
            }
        },
        "tasks": {
            "taskQueue.js": `// Task Queue System\nconst Queue = require('bull');\n\nconst taskQueue = new Queue('taskQueue');\n\n// Add tasks to the queue\nmodule.exports = taskQueue;`,
            "matchScoreRecalculation.js": `// Match Score Recalculation Logic\nmodule.exports = async () => {\n    // Logic to recalculate match scores\n};`,
            "otpExpirationHandler.js": `// OTP Expiration Handler\nmodule.exports = async () => {\n    // Logic to handle OTP expiration\n};`,
            "chatMessageCleanup.js": `// Chat Message Cleanup Task\nmodule.exports = async () => {\n    // Logic to clean up old chat messages\n};`,
            "subscriptionRenewal.js": `// Subscription Renewal Task\nmodule.exports = async () => {\n    // Logic to handle subscription renewals\n};`
        },
        "public": {
            "index.html": `<html><body><h1>Welcome to the Matrimonial Site API!</h1></body></html>`
        },
        "uploads": [
            ".keep"
        ],
        "logs": [
            ".keep"
        ],
        "tests": {
            "unit": {
                "user.test.js": `const request = require('supertest');\nconst app = require('../server');\n\ndescribe('User Model Tests', () => {\n    it('should create a new user', async () => {\n        const user = { /* user data */ };\n        const response = await request(app).post('/api/users').send(user);\n        expect(response.statusCode).toBe(201);\n        expect(response.body).toHaveProperty('user');\n    });\n});`,
                "match.test.js": `const Match = require('../models/Match');\n\ndescribe('Match Model Tests', () => {\n    it('should create a new match', async () => {\n        const match = new Match({ /* match data */ });\n        await match.save();\n        const foundMatch = await Match.findById(match._id);\n        expect(foundMatch).toBeDefined();\n    });\n});`,
                "subscription.test.js": `const Subscription = require('../models/Subscription');\n\ndescribe('Subscription Model Tests', () => {\n    it('should create a new subscription', async () => {\n        const subscription = new Subscription({ /* subscription data */ });\n        await subscription.save();\n        expect(subscription).toHaveProperty('_id');\n    });\n});`,
                "otp.test.js": `const OTP = require('../models/OTP');\n\ndescribe('OTP Model Tests', () => {\n    it('should save OTP', async () => {\n        const otp = new OTP({ /* OTP data */ });\n        await otp.save();\n        const foundOtp = await OTP.findById(otp._id);\n        expect(foundOtp).toBeDefined();\n    });\n});`
            },
            "integration": {
                "user.routes.test.js": `const request = require('supertest');\nconst app = require('../server');\n\ndescribe('User Routes Tests', () => {\n    it('should register a new user', async () => {\n        const user = { /* user registration data */ };\n        const response = await request(app).post('/api/users/register').send(user);\n        expect(response.statusCode).toBe(201);\n    });\n});`,
                "match.routes.test.js": `const request = require('supertest');\nconst app = require('../server');\n\ndescribe('Match Routes Tests', () => {\n    it('should get matches for a user', async () => {\n        const response = await request(app).get('/api/matches/userId');\n        expect(response.statusCode).toBe(200);\n    });\n});`,
                "subscription.routes.test.js": `const request = require('supertest');\nconst app = require('../server');\n\ndescribe('Subscription Routes Tests', () => {\n    it('should get subscription plans', async () => {\n        const response = await request(app).get('/api/subscriptions');\n        expect(response.statusCode).toBe(200);\n    });\n});`
            },
            "helpers": {
                "testUtils.js": `// Utility functions for tests\nconst createUser = async (userData) => {\n    // function to create a user\n};\n\nmodule.exports = { createUser };`
            }
        },
        "validation": {
            "user.validation.js": `const { body } = require('express-validator');\n\nmodule.exports = {\n    register: [\n        body('email').isEmail().withMessage('Invalid email address'),\n        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')\n    ],\n    login: [\n        body('email').isEmail().withMessage('Invalid email address'),\n        body('password').exists().withMessage('Password is required')\n    ]\n};`,
            "match.validation.js": `const { body } = require('express-validator');\n\nmodule.exports = {\n    createMatch: [\n        body('userId').isMongoId().withMessage('Invalid user ID'),\n        body('matchId').isMongoId().withMessage('Invalid match ID')\n    ]\n};`,
            "subscription.validation.js": `const { body } = require('express-validator');\n\nmodule.exports = {\n    createSubscription: [\n        body('type').isIn(['Free', 'Premium', 'Premium Plus']).withMessage('Invalid subscription type'),\n        body('duration').isInt({ gt: 0 }).withMessage('Duration must be a positive integer')\n    ]\n};`,
            "otp.validation.js": `const { body } = require('express-validator');\n\nmodule.exports = {\n    validateOtp: [\n        body('otp').isNumeric().withMessage('OTP must be numeric'),\n        body('userId').isMongoId().withMessage('Invalid user ID')\n    ]\n};`,
            "auth.validation.js": `const { body } = require('express-validator');\n\nmodule.exports = {\n    login: [\n        body('email').isEmail().withMessage('Invalid email'),\n        body('password').notEmpty().withMessage('Password is required')\n    ],\n    register: [\n        body('email').isEmail().withMessage('Invalid email'),\n        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')\n    ]\n};`
        },

        "server.js": `// Server Setup\nconst express = require('express');\nconst connectDB = require('./config/db');\nconst cors = require('cors');\nconst bodyParser = require('body-parser');\n\nconst app = express();\nconst PORT = process.env.PORT || 5000;\n\n// Connect to the database\nconnectDB();\n\n// Middleware\napp.use(cors());\napp.use(bodyParser.json());\n\n// Routes\napp.use('/api/auth', require('./routes/authRoutes'));\napp.use('/api/users', require('./routes/userRoutes'));\napp.use('/api/matches', require('./routes/matchRoutes'));\napp.use('/api/subscriptions', require('./routes/subscriptionRoutes'));\napp.use('/api/admin', require('./routes/adminRoutes'));\napp.use('/api/recommendations', require('./routes/recommendationRoutes'));\napp.use('/api/roles', require('./routes/roleRoutes'));\napp.use('/api/modules', require('./routes/moduleRoutes'));\napp.use('/api/otp', require('./routes/otpRoutes'));\napp.use('/api/chat', require('./routes/chatRoutes'));\napp.use('/api/notifications', require('./routes/notificationRoutes'));\n\napp.listen(PORT, () => {\n    console.log(\`Server is running on port \${PORT}\`);\n});`,
        "app.js": `// App Configuration\nconst express = require('express');\nconst connectDB = require('./config/db');\nconst cors = require('cors');\n\nconst app = express();\nconst PORT = process.env.PORT || 5000;\n\n// Connect to the database\nconnectDB();\n\n// Middleware\napp.use(cors());\napp.use(express.json());\n\n// Routes\napp.use('/api/auth', require('./routes/authRoutes'));\n\nmodule.exports = app;`,
        "README.md": `# Backend Project Structure\n\nThis project is a backend implementation for a matrimonial site.\n\n## Project Structure\n- **config**: Configuration files for the application.\n- **controllers**: Controller files that handle requests and responses.\n- **middlewares**: Middleware functions for handling requests.\n- **models**: Mongoose models for database schemas.\n- **routes**: Route definitions for the API endpoints.\n- **services**: Service files for business logic.\n- **utils**: Utility functions.\n- **notifications**: Notification services and templates.\n- **tasks**: Scheduled tasks and background jobs.\n- **public**: Public files served by the application.\n- **uploads**: File uploads directory.\n- **logs**: Log files directory.\n- **README.md**: Project documentation.\n- **server.js**: Entry point for the application.\n- **app.js**: Application setup and middleware configurations.`,
  
    }
};


function createStructure(structure, basePath) {
    for (const [name, value] of Object.entries(structure)) {
        const currentPath = path.join(basePath, name);

        if (typeof value === 'object' && !Array.isArray(value)) {
            // Create a folder
            fs.mkdirSync(currentPath, { recursive: true });
            // Recursively create the structure inside the folder
            createStructure(value, currentPath);
        } else if (Array.isArray(value)) {
            // Create a folder for arrays and put files inside it
            fs.mkdirSync(currentPath, { recursive: true });
            // Create .keep files to ensure empty folders are not ignored in Git
            value.forEach(file => {
                fs.writeFileSync(path.join(currentPath, file), '');
            });
        } else {
            // Create a file and write content
            fs.writeFileSync(currentPath, value, 'utf8');
        }
    }
}


// Create the folder structure
createStructure(structure, __dirname);


////////create readme.md

// Function to get folder structure
function getFolderStructure(dir, level = 0) {
    const items = fs.readdirSync(dir);
    let structure = '';

    // Separate directories and files
    const directories = items.filter(item => fs.statSync(path.join(dir, item)).isDirectory());
    const files = items.filter(item => !fs.statSync(path.join(dir, item)).isDirectory());

    // List directories first
    directories.forEach(directory => {
        structure += ' '.repeat(level * 4) + '├── ' + directory + '\n';
        structure += getFolderStructure(path.join(dir, directory), level + 1);
    });

    // Then list files
    files.forEach(file => {
        structure += ' '.repeat(level * 4) + '└── ' + file + '\n';
    });

    return structure;
}

const targetDir = path.join(__dirname, 'backend_project');
const folderStructure = getFolderStructure(targetDir);

// Create the README.md content
const readmeContent = `# Backend Project Structure\n\n\`\`\`plaintext\n${folderStructure}\`\`\`\n\n` +
`## How to Set Up the Project\n\n` +
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
fs.writeFileSync(path.join(__dirname, 'backend_project', 'README.md'), readmeContent);

console.log('Folder structure and setup instructions saved to README.md');
