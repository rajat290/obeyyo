const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middlewares/auth');
const fileUploadService = require('../services/fileUploadService');

// Public routes (no authentication required)
router.get('/products/:productId', reviewController.getProductReviews);
router.get('/products/:productId/summary', reviewController.getProductRatingSummary);

// Protected routes (authentication required)
router.use(protect);

// User review management
router.post('/products/:productId', fileUploadService.createReviewImageUpload().array('images', 5), reviewController.createReview);
router.get('/user', reviewController.getUserReviews);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

// Review interactions
router.post('/:reviewId/helpful', reviewController.markReviewHelpful);
router.post('/:reviewId/not-helpful', reviewController.markReviewNotHelpful);
router.post('/:reviewId/report', reviewController.reportReview);

// Review eligibility check
router.get('/products/:productId/eligibility', reviewController.checkReviewEligibility);

module.exports = router;
