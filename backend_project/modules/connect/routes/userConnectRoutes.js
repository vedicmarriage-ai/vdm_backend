// modules/connect/routes/userConnectRoutes.js

const express = require('express');
const router = express.Router();
const userConnectController = require('../controllers/userConnectController');
const authMiddleware = require('../../../middleware/authMiddleware'); // Global auth middleware

// Apply global auth middleware
router.use(authMiddleware);

router.post('/send', userConnectController.sendRequest);
router.post('/accept', userConnectController.acceptRequest);
router.post('/reject', userConnectController.rejectRequest);
router.post('/block', userConnectController.blockRequest);

module.exports = router;
