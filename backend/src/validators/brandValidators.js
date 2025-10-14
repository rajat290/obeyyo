const { body, param } = require('express-validator');

const createBrandValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Brand name must be between 2 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),

  body('logo')
    .optional()
    .isURL()
    .withMessage('Valid logo URL is required'),

  body('website')
    .optional()
    .isURL()
    .withMessage('Valid website URL is required'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email address is required')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Valid phone number is required'),

  body('address')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Address must be between 10 and 200 characters'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean'),

  body('metaTitle')
    .optional()
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage('Meta title must be between 1 and 60 characters'),

  body('metaDescription')
    .optional()
    .trim()
    .isLength({ min: 1, max: 160 })
    .withMessage('Meta description must be between 1 and 160 characters'),
];

const updateBrandValidator = [
  param('id')
    .isMongoId()
    .withMessage('Valid brand ID is required'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Brand name must be between 2 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),

  body('logo')
    .optional()
    .isURL()
    .withMessage('Valid logo URL is required'),

  body('website')
    .optional()
    .isURL()
    .withMessage('Valid website URL is required'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email address is required')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Valid phone number is required'),

  body('address')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Address must be between 10 and 200 characters'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean'),

  body('metaTitle')
    .optional()
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage('Meta title must be between 1 and 60 characters'),

  body('metaDescription')
    .optional()
    .trim()
    .isLength({ min: 1, max: 160 })
    .withMessage('Meta description must be between 1 and 160 characters'),
];

const brandIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('Valid brand ID is required'),
];

const brandQueryValidator = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  body('search')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Search term must be at least 1 character'),

  body('sort')
    .optional()
    .isIn(['name_asc', 'name_desc', 'newest', 'oldest'])
    .withMessage('Invalid sort option'),

  body('featured')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('Featured must be true or false'),
];

module.exports = {
  createBrandValidator,
  updateBrandValidator,
  brandIdValidator,
  brandQueryValidator,
};
