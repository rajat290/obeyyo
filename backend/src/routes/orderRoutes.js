const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middlewares/auth');

// All order routes require authentication
router.use(protect);

// User routes
// POST /api/orders - Create new order
router.post('/', orderController.createOrder);

// POST /api/orders/verify-payment/:orderId - Verify Razorpay payment
router.post('/verify-payment/:orderId', orderController.verifyPayment);

// GET /api/orders - Get user's orders
router.get('/', orderController.getUserOrders);

// GET /api/orders/:orderId - Get specific order
router.get('/:orderId', orderController.getOrderById);

// PUT /api/orders/:orderId/cancel - Cancel order
router.put('/:orderId/cancel', orderController.cancelOrder);

// GET /api/orders/stats - Get user's order statistics
router.get('/stats', orderController.getOrderStats);

// Admin routes
// PUT /api/orders/:orderId/status - Update order status (admin only)
router.put('/:orderId/status', authorize('admin'), orderController.updateOrderStatus);

// GET /api/orders/admin/all - Get all orders (admin only)
router.get('/admin/all', authorize('admin'), orderController.getAllOrders);

// GET /api/orders/admin/stats - Get all order statistics (admin only)
router.get('/admin/stats', authorize('admin'), orderController.getAllOrderStats);

module.exports = router;
