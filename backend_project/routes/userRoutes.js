// User Routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.getUserProfile);

module.exports = router;