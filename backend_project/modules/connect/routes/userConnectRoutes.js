// modules/connect/routes/userConnectRoutes.js

const express = require('express');
const router = express.Router();
const userConnectController = require('../controllers/userConnectController');

router.post('/send', userConnectController.sendRequest);
router.post('/accept', userConnectController.acceptRequest);
router.post('/reject', userConnectController.rejectRequest);
router.post('/block', userConnectController.blockRequest);

module.exports = router;
