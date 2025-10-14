const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { protect } = require('../middlewares/auth');
const {
  addToWishlistValidation,
  removeFromWishlistValidation,
  checkWishlistValidation,
  moveToCartValidation
} = require('../validators/wishlistValidators');

// All wishlist routes require authentication
router.use(protect);

// GET /api/wishlist - Get user's wishlist
router.get('/', wishlistController.getWishlist);

// POST /api/wishlist - Add product to wishlist
router.post('/', addToWishlistValidation, wishlistController.addToWishlist);

// DELETE /api/wishlist/:productId - Remove product from wishlist
router.delete('/:productId', removeFromWishlistValidation, wishlistController.removeFromWishlist);

// GET /api/wishlist/check/:productId - Check if product is in wishlist
router.get('/check/:productId', checkWishlistValidation, wishlistController.checkWishlist);

// DELETE /api/wishlist - Clear entire wishlist
router.delete('/', wishlistController.clearWishlist);

// GET /api/wishlist/count - Get wishlist item count
router.get('/count', wishlistController.getWishlistItemCount);

// POST /api/wishlist/move-to-cart/:productId - Move item from wishlist to cart
router.post('/move-to-cart/:productId', moveToCartValidation, wishlistController.moveToCart);

// GET /api/wishlist/stats - Get wishlist statistics
router.get('/stats', wishlistController.getWishlistStats);

module.exports = router;
