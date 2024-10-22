// Subscription Routes
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');


router.post('/assign', subscriptionController.assignSubscription);
router.post('/use-facility', subscriptionController.useFacility);

module.exports = router;
