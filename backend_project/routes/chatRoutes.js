// Chat Routes
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/send', chatController.sendMessage);

module.exports = router;