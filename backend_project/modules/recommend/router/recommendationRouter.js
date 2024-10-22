


///This file defines the routes for handling recommendations.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');


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

// Apply global auth middleware
router.use(authMiddleware);

// Define routes using global auth middleware
router.post('/', createRecommendation);         // POST /recommendation
router.put('/:id', updateRecommendation);          // PUT /recommendation
router.delete('/:id', deleteRecommendation);       // DELETE /recommendation

// // aply authMiddleware on specific routes to route
// router.post('/create', authMiddleware, createRecommendation);
// router.put('/update/:id', authMiddleware, updateRecommendation);
// router.delete('/delete/:id', authMiddleware, deleteRecommendation);

module.exports = router;
