const { body, param } = require('express-validator');

const createCategoryValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),

  body('parent')
    .optional()
    .isMongoId()
    .withMessage('Valid parent category ID is required'),

  body('image')
    .optional()
    .isURL()
    .withMessage('Valid image URL is required'),

  body('icon')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Icon must be between 1 and 50 characters'),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  body('showInMenu')
    .optional()
    .isBoolean()
    .withMessage('showInMenu must be a boolean'),

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

const updateCategoryValidator = [
  param('id')
    .isMongoId()
    .withMessage('Valid category ID is required'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),

  body('parent')
    .optional()
    .isMongoId()
    .withMessage('Valid parent category ID is required'),

  body('image')
    .optional()
    .isURL()
    .withMessage('Valid image URL is required'),

  body('icon')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Icon must be between 1 and 50 characters'),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  body('showInMenu')
    .optional()
    .isBoolean()
    .withMessage('showInMenu must be a boolean'),

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

const categoryIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('Valid category ID is required'),
];

const updateOrderValidator = [
  param('id')
    .isMongoId()
    .withMessage('Valid category ID is required'),

  body('order')
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
];

module.exports = {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
  updateOrderValidator,
};
