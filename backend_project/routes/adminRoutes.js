// Admin Routes
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/approve', adminController.approveChanges);

module.exports = router;