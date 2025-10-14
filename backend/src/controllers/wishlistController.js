const wishlistService = require('../services/wishlistService');
const { validationResult } = require('express-validator');

// Get user's wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user.id);
    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { productId } = req.body;
    const wishlist = await wishlistService.addToWishlist(req.user.id, productId);

    res.status(200).json({
      success: true,
      message: 'Product added to wishlist successfully',
      data: wishlist
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ||
                      error.message.includes('not available') ||
                      error.message.includes('already in wishlist') ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const wishlist = await wishlistService.removeFromWishlist(req.user.id, productId);

    res.status(200).json({
      success: true,
      message: 'Product removed from wishlist successfully',
      data: wishlist
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

// Check if product is in wishlist
const checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const isInWishlist = await wishlistService.isInWishlist(req.user.id, productId);

    res.status(200).json({
      success: true,
      data: { isInWishlist }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Clear wishlist
const clearWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.clearWishlist(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Wishlist cleared successfully',
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get wishlist item count
const getWishlistItemCount = async (req, res) => {
  try {
    const count = await wishlistService.getWishlistItemCount(req.user.id);

    res.status(200).json({
      success: true,
      data: { count }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Move item from wishlist to cart
const moveToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cartService = require('../services/cartService');

    const result = await wishlistService.moveToCart(req.user.id, productId, cartService);

    res.status(200).json({
      success: true,
      message: 'Item moved to cart successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get wishlist statistics
const getWishlistStats = async (req, res) => {
  try {
    const stats = await wishlistService.getWishlistStats(req.user.id);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
  clearWishlist,
  getWishlistItemCount,
  moveToCart,
  getWishlistStats
};
