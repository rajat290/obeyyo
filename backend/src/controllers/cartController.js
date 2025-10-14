const cartService = require('../services/cartService');
const { validationResult } = require('express-validator');

// Get user's cart
const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { productId, variantId, quantity } = req.body;
    const cart = await cartService.addToCart(
      req.user.id,
      productId,
      variantId,
      quantity
    );

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ||
                      error.message.includes('not available') ||
                      error.message.includes('Insufficient stock') ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

// Update cart item
const updateCartItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { productId, variantId } = req.params;
    const { quantity } = req.body;

    const cart = await cartService.updateCartItem(
      req.user.id,
      productId,
      variantId,
      quantity
    );

    res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      data: cart
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId, variantId } = req.params;

    const cart = await cartService.removeFromCart(
      req.user.id,
      productId,
      variantId
    );

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cart
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get cart item count
const getCartItemCount = async (req, res) => {
  try {
    const count = await cartService.getCartItemCount(req.user.id);

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

// Validate cart
const validateCart = async (req, res) => {
  try {
    const validation = await cartService.validateCart(req.user.id);

    res.status(200).json({
      success: true,
      data: validation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartItemCount,
  validateCart
};
