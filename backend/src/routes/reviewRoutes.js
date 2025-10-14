const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const {
  createReviewValidation,
  updateReviewValidation,
  deleteReviewValidation,
  markReviewHelpfulValidation,
  markReviewNotHelpfulValidation,
  reportReviewValidation,
  getProductReviewsValidation,
  getUserReviewsValidation,
  getProductRatingSummaryValidation,
  checkReviewEligibilityValidation
} = require('../validators/reviewValidators');
const { protect } = require('../middlewares/auth');
const fileUploadService = require('../services/fileUploadService');

// Public routes (no authentication required)
router.get('/products/:productId', getProductReviewsValidation, reviewController.getProductReviews);
router.get('/products/:productId/summary', getProductRatingSummaryValidation, reviewController.getProductRatingSummary);

// Protected routes (authentication required)
router.use(protect);

// User review management
router.post('/products/:productId', fileUploadService.createReviewImageUpload().array('images', 5), createReviewValidation, reviewController.createReview);
router.get('/user', getUserReviewsValidation, reviewController.getUserReviews);
router.put('/:reviewId', updateReviewValidation, reviewController.updateReview);
router.delete('/:reviewId', deleteReviewValidation, reviewController.deleteReview);

// Review interactions
router.post('/:reviewId/helpful', markReviewHelpfulValidation, reviewController.markReviewHelpful);
router.post('/:reviewId/not-helpful', markReviewNotHelpfulValidation, reviewController.markReviewNotHelpful);
router.post('/:reviewId/report', reportReviewValidation, reviewController.reportReview);

// Review eligibility check
router.get('/products/:productId/eligibility', checkReviewEligibilityValidation, reviewController.checkReviewEligibility);

module.exports = router;
