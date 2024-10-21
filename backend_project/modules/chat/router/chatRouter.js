// Chat Router
const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');
router.post('/send', chatController.sendMessage);
module.exports = router;