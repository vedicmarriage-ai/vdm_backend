// Routes for connection request module
const express = require('express');
const router = express.Router();
const connectController = require('../controllers/connectController');

router.post('/send', connectController.sendRequest);
router.post('/accept', connectController.acceptRequest);
router.post('/reject', connectController.rejectRequest);
router.post('/block', connectController.blockRequest);

module.exports = router;
