const { body, param, query } = require('express-validator');

// Create review validation
const createReviewValidation = [
  param('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Review title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Review comment is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters'),
  body('orderId')
    .optional()
    .isMongoId()
    .withMessage('Invalid order ID')
];

// Update review validation
const updateReviewValidation = [
  param('reviewId')
    .isMongoId()
    .withMessage('Invalid review ID'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('comment')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters')
];

// Delete review validation
const deleteReviewValidation = [
  param('reviewId')
    .isMongoId()
    .withMessage('Invalid review ID')
];

// Mark review helpful/not helpful validation
const markReviewHelpfulValidation = [
  param('reviewId')
    .isMongoId()
    .withMessage('Invalid review ID')
];

const markReviewNotHelpfulValidation = [
  param('reviewId')
    .isMongoId()
    .withMessage('Invalid review ID')
];

// Report review validation
const reportReviewValidation = [
  param('reviewId')
    .isMongoId()
    .withMessage('Invalid review ID'),
  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Report reason is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Reason must be between 10 and 500 characters')
    .isIn([
      'Inappropriate content',
      'Spam or fake review',
      'Offensive language',
      'Misleading information',
      'Conflict of interest',
      'Other'
    ])
    .withMessage('Invalid report reason')
];

// Get product reviews validation
const getProductReviewsValidation = [
  param('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('sortBy')
    .optional()
    .isIn(['newest', 'oldest', 'highest', 'lowest', 'helpful'])
    .withMessage('Sort by must be one of: newest, oldest, highest, lowest, helpful')
];

// Get user reviews validation
const getUserReviewsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

// Get product rating summary validation
const getProductRatingSummaryValidation = [
  param('productId')
    .isMongoId()
    .withMessage('Invalid product ID')
];

// Check review eligibility validation
const checkReviewEligibilityValidation = [
  param('productId')
    .isMongoId()
    .withMessage('Invalid product ID')
];

module.exports = {
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
};
