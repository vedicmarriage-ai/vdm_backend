
// modules/recommendations/routes/recommendationRoutes.js
const express = require('express');
const {
    createRecommendation,
    getRecommendations,
    updateRecommendation,
    deleteRecommendation,
} = require('../controller/recommendationController');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createRecommendation);
router.get('/', authMiddleware, getRecommendations);
router.put('/:recommendationId', authMiddleware, updateRecommendation);
router.delete('/:recommendationId', authMiddleware, deleteRecommendation);

module.exports = router;
