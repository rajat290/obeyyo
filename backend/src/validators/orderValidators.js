const { body, param } = require('express-validator');
const mongoose = require('mongoose');

// Create order validation
const createOrderValidation = [
  body('shippingAddressId')
    .notEmpty()
    .withMessage('Shipping address is required')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid shipping address ID format');
      }
      return true;
    }),

  body('billingAddressId')
    .optional()
    .custom((value) => {
      if (value && !mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid billing address ID format');
      }
      return true;
    }),

  body('paymentMethod')
    .isIn(['razorpay', 'cod', 'card'])
    .withMessage('Invalid payment method'),

  body('couponCode')
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage('Coupon code must be between 3 and 20 characters')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Coupon code must contain only uppercase letters and numbers'),

  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];

// Verify payment validation
const verifyPaymentValidation = [
  param('orderId')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid order ID format');
      }
      return true;
    }),

  body('razorpay_order_id')
    .notEmpty()
    .withMessage('Razorpay order ID is required'),

  body('razorpay_payment_id')
    .notEmpty()
    .withMessage('Razorpay payment ID is required'),

  body('razorpay_signature')
    .notEmpty()
    .withMessage('Razorpay signature is required')
];

// Get order by ID validation
const getOrderByIdValidation = [
  param('orderId')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid order ID format');
      }
      return true;
    })
];

// Cancel order validation
const cancelOrderValidation = [
  param('orderId')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid order ID format');
      }
      return true;
    }),

  body('reason')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Reason cannot exceed 500 characters')
];

// Update order status validation (admin)
const updateOrderStatusValidation = [
  param('orderId')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid order ID format');
      }
      return true;
    }),

  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'])
    .withMessage('Invalid order status'),

  body('reason')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Reason cannot exceed 500 characters'),

  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters')
];

module.exports = {
  createOrderValidation,
  verifyPaymentValidation,
  getOrderByIdValidation,
  cancelOrderValidation,
  updateOrderStatusValidation
};
