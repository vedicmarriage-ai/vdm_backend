// modules/connect/routes/matchmakerConnectRoutes.js

const express = require('express');
const router = express.Router();
const matchmakerConnectController = require('../controllers/matchmakerConnectController');
const authMiddleware = require('../../../middleware/authMiddleware'); // Global auth middleware

// Apply global auth middleware
router.use(authMiddleware);

router.post('/send', matchmakerConnectController.sendRequest);
router.post('/accept', matchmakerConnectController.acceptRequest);
router.post('/reject', matchmakerConnectController.rejectRequest);
router.post('/block', matchmakerConnectController.blockRequest);

module.exports = router;
