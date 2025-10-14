const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middlewares/auth');
const {
  addToCartValidation,
  updateCartItemValidation,
  removeFromCartValidation
} = require('../validators/cartValidators');

// All cart routes require authentication
router.use(protect);

// GET /api/cart - Get user's cart
router.get('/', cartController.getCart);

// POST /api/cart - Add item to cart
router.post('/', addToCartValidation, cartController.addToCart);

// PUT /api/cart/:productId/:variantId - Update cart item quantity
router.put('/:productId/:variantId', updateCartItemValidation, cartController.updateCartItem);

// PUT /api/cart/:productId - Update cart item quantity (no variant)
router.put('/:productId', updateCartItemValidation, cartController.updateCartItem);

// DELETE /api/cart/:productId/:variantId - Remove item from cart
router.delete('/:productId/:variantId', removeFromCartValidation, cartController.removeFromCart);

// DELETE /api/cart/:productId - Remove item from cart (no variant)
router.delete('/:productId', removeFromCartValidation, cartController.removeFromCart);

// DELETE /api/cart - Clear entire cart
router.delete('/', cartController.clearCart);

// GET /api/cart/count - Get cart item count
router.get('/count', cartController.getCartItemCount);

// POST /api/cart/validate - Validate cart before checkout
router.post('/validate', cartController.validateCart);

module.exports = router;
