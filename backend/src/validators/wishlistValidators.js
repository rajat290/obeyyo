const { body, param } = require('express-validator');
const mongoose = require('mongoose');

// Add to wishlist validation
const addToWishlistValidation = [
  body('productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid product ID format');
      }
      return true;
    })
];

// Remove from wishlist validation
const removeFromWishlistValidation = [
  param('productId')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid product ID format');
      }
      return true;
    })
];

// Check wishlist validation
const checkWishlistValidation = [
  param('productId')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid product ID format');
      }
      return true;
    })
];

// Move to cart validation
const moveToCartValidation = [
  param('productId')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid product ID format');
      }
      return true;
    })
];

module.exports = {
  addToWishlistValidation,
  removeFromWishlistValidation,
  checkWishlistValidation,
  moveToCartValidation
};
