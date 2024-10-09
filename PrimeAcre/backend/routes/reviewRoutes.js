// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { isAuthenticated, isClient } = require('../middleware/auth');

// Create a review
router.post('/:id/reviews', isAuthenticated, isClient, reviewController.createReview);

// Get all reviews for a property
router.get('/:id/reviews', reviewController.getReviewsByProperty);

// Edit and delete a review
router.patch(
  '/:propertyId/reviews/:reviewId',
  isAuthenticated,
  isClient,
  reviewController.updateReview
);
router.delete(
  '/:propertyId/reviews/:reviewId',
  isAuthenticated,
  isClient,
  reviewController.deleteReview
);

module.exports = router;