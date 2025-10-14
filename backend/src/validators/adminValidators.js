const { body, param, query } = require('express-validator');

// User management validators
const updateUserStatusValidation = [
  param('userId')
    .isMongoId()
    .withMessage('Invalid user ID'),
  body('isActive')
    .isBoolean()
    .withMessage('isActive must be a boolean value')
];

const updateUserRoleValidation = [
  param('userId')
    .isMongoId()
    .withMessage('Invalid user ID'),
  body('role')
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin')
];

// Product management validators
const updateProductStatusValidation = [
  param('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('isActive')
    .isBoolean()
    .withMessage('isActive must be a boolean value')
];

// Review management validators
const rejectReviewValidation = [
  param('reviewId')
    .isMongoId()
    .withMessage('Invalid review ID'),
  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Rejection reason is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Reason must be between 10 and 500 characters')
];

// Banner management validators
const createBannerValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Banner title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('position')
    .isIn(['hero', 'sidebar', 'footer', 'popup'])
    .withMessage('Position must be one of: hero, sidebar, footer, popup'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a non-negative integer'),
  body('link')
    .optional()
    .isURL()
    .withMessage('Link must be a valid URL'),
  body('linkType')
    .optional()
    .isIn(['product', 'category', 'brand', 'external', 'none'])
    .withMessage('Link type must be one of: product, category, brand, external, none'),
  body('linkId')
    .optional()
    .isMongoId()
    .withMessage('Link ID must be a valid MongoDB ObjectId'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date')
    .custom((endDate, { req }) => {
      if (req.body.startDate && new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('targetAudience')
    .optional()
    .isIn(['all', 'new_users', 'returning_users', 'premium_users'])
    .withMessage('Target audience must be one of: all, new_users, returning_users, premium_users')
];

const updateBannerValidation = [
  param('bannerId')
    .isMongoId()
    .withMessage('Invalid banner ID'),
  ...createBannerValidation
];

const deleteBannerValidation = [
  param('bannerId')
    .isMongoId()
    .withMessage('Invalid banner ID')
];

// Coupon management validators
const createCouponValidation = [
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Coupon code is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Code must be between 3 and 20 characters')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Code must contain only uppercase letters and numbers'),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Coupon title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('discountType')
    .isIn(['percentage', 'fixed'])
    .withMessage('Discount type must be either percentage or fixed'),
  body('discountValue')
    .isFloat({ min: 0 })
    .withMessage('Discount value must be a positive number')
    .custom((value, { req }) => {
      if (req.body.discountType === 'percentage' && value > 100) {
        throw new Error('Percentage discount cannot exceed 100%');
      }
      return true;
    }),
  body('maxDiscount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Max discount must be a positive number'),
  body('minOrderValue')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum order value must be a positive number'),
  body('maxOrderValue')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum order value must be a positive number'),
  body('usageLimit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Usage limit must be a positive integer'),
  body('usageLimitPerUser')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Usage limit per user must be a positive integer'),
  body('expiryDate')
    .isISO8601()
    .withMessage('Expiry date must be a valid ISO 8601 date')
    .custom((expiryDate) => {
      if (new Date(expiryDate) <= new Date()) {
        throw new Error('Expiry date must be in the future');
      }
      return true;
    }),
  body('applicableCategories')
    .optional()
    .isArray()
    .withMessage('Applicable categories must be an array'),
  body('applicableCategories.*')
    .optional()
    .isMongoId()
    .withMessage('Each category ID must be a valid MongoDB ObjectId'),
  body('applicableBrands')
    .optional()
    .isArray()
    .withMessage('Applicable brands must be an array'),
  body('applicableBrands.*')
    .optional()
    .isMongoId()
    .withMessage('Each brand ID must be a valid MongoDB ObjectId'),
  body('applicableProducts')
    .optional()
    .isArray()
    .withMessage('Applicable products must be an array'),
  body('applicableProducts.*')
    .optional()
    .isMongoId()
    .withMessage('Each product ID must be a valid MongoDB ObjectId'),
  body('excludedCategories')
    .optional()
    .isArray()
    .withMessage('Excluded categories must be an array'),
  body('excludedCategories.*')
    .optional()
    .isMongoId()
    .withMessage('Each excluded category ID must be a valid MongoDB ObjectId'),
  body('excludedBrands')
    .optional()
    .isArray()
    .withMessage('Excluded brands must be an array'),
  body('excludedBrands.*')
    .optional()
    .isMongoId()
    .withMessage('Each excluded brand ID must be a valid MongoDB ObjectId'),
  body('excludedProducts')
    .optional()
    .isArray()
    .withMessage('Excluded products must be an array'),
  body('excludedProducts.*')
    .optional()
    .isMongoId()
    .withMessage('Each excluded product ID must be a valid MongoDB ObjectId'),
  body('userRestrictions.newUsersOnly')
    .optional()
    .isBoolean()
    .withMessage('newUsersOnly must be a boolean'),
  body('userRestrictions.existingUsersOnly')
    .optional()
    .isBoolean()
    .withMessage('existingUsersOnly must be a boolean'),
  body('userRestrictions.firstOrderOnly')
    .optional()
    .isBoolean()
    .withMessage('firstOrderOnly must be a boolean'),
  body('userRestrictions.minOrdersRequired')
    .optional()
    .isInt({ min: 0 })
    .withMessage('minOrdersRequired must be a non-negative integer')
];

const updateCouponValidation = [
  param('couponId')
    .isMongoId()
    .withMessage('Invalid coupon ID'),
  ...createCouponValidation.map(validator => validator.optional())
];

const deleteCouponValidation = [
  param('couponId')
    .isMongoId()
    .withMessage('Invalid coupon ID')
];

// Notification management validators
const createNotificationValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Notification title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Notification message is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  body('type')
    .isIn(['info', 'success', 'warning', 'error', 'order', 'promotion', 'system'])
    .withMessage('Type must be one of: info, success, warning, error, order, promotion, system'),
  body('recipientType')
    .optional()
    .isIn(['user', 'admin', 'all_users', 'all_admins'])
    .withMessage('Recipient type must be one of: user, admin, all_users, all_admins'),
  body('recipient')
    .optional()
    .isMongoId()
    .withMessage('Recipient must be a valid MongoDB ObjectId'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Priority must be one of: low, medium, high, urgent'),
  body('actionUrl')
    .optional()
    .isURL()
    .withMessage('Action URL must be a valid URL'),
  body('actionText')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Action text must be less than 50 characters'),
  body('expiresAt')
    .optional()
    .isISO8601()
    .withMessage('Expires at must be a valid ISO 8601 date')
];

// Bulk operations validators
const bulkUpdateProductStatusValidation = [
  body('productIds')
    .isArray({ min: 1 })
    .withMessage('Product IDs must be a non-empty array'),
  body('productIds.*')
    .isMongoId()
    .withMessage('Each product ID must be a valid MongoDB ObjectId'),
  body('isActive')
    .isBoolean()
    .withMessage('isActive must be a boolean value')
];

const bulkUpdateUserStatusValidation = [
  body('userIds')
    .isArray({ min: 1 })
    .withMessage('User IDs must be a non-empty array'),
  body('userIds.*')
    .isMongoId()
    .withMessage('Each user ID must be a valid MongoDB ObjectId'),
  body('isActive')
    .isBoolean()
    .withMessage('isActive must be a boolean value')
];

// Analytics validators
const getAnalyticsValidation = [
  query('timeframe')
    .optional()
    .isIn(['7d', '30d', '90d', '1y'])
    .withMessage('Timeframe must be one of: 7d, 30d, 90d, 1y')
];

module.exports = {
  updateUserStatusValidation,
  updateUserRoleValidation,
  updateProductStatusValidation,
  rejectReviewValidation,
  createBannerValidation,
  updateBannerValidation,
  deleteBannerValidation,
  createCouponValidation,
  updateCouponValidation,
  deleteCouponValidation,
  createNotificationValidation,
  bulkUpdateProductStatusValidation,
  bulkUpdateUserStatusValidation,
  getAnalyticsValidation
};
