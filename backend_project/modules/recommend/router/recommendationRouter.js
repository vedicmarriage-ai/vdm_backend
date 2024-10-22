


///This file defines the routes for handling recommendations.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');

// Apply global auth middleware
router.use(authMiddleware);

// const recommendationController = require('../controllers/recommendationController');

// // Route for creating a recommendation
// router.post('/', recommendationController.createRecommendation);

// // Route for updating a recommendation
// router.put('/:id', recommendationController.updateRecommendation);

// // Route for deleting a recommendation
// router.delete('/:id', recommendationController.deleteRecommendation);

const {
    createRecommendation,
    updateRecommendation,
    deleteRecommendation,
} = require('../controllers/recommendationController');

// Define routes using global auth middleware
router.post('/', createRecommendation);         // POST /recommendation
router.put('/:id', updateRecommendation);          // PUT /recommendation
router.delete('/:id', deleteRecommendation);       // DELETE /recommendation


module.exports = router;
