const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/auth');
const fileUploadService = require('../services/fileUploadService');

// Apply authentication and admin authorization to all routes
router.use(protect);
router.use(authorize(['admin']));

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// User Management
router.get('/users', adminController.getAllUsers);
router.put('/users/:userId/status', adminController.updateUserStatus);
router.put('/users/:userId/role', adminController.updateUserRole);

// Product Management
router.get('/products', adminController.getAllProducts);
router.put('/products/:productId/status', adminController.updateProductStatus);

// Order Management
router.get('/orders', adminController.getAllOrders);

// Review Management
router.get('/reviews', adminController.getAllReviews);
router.put('/reviews/:reviewId/approve', adminController.approveReview);
router.put('/reviews/:reviewId/reject', adminController.rejectReview);

// Banner Management
router.get('/banners', adminController.getAllBanners);
router.post('/banners', fileUploadService.createBannerImageUpload().single('image'), adminController.createBanner);
router.put('/banners/:bannerId', fileUploadService.createBannerImageUpload().single('image'), adminController.updateBanner);
router.delete('/banners/:bannerId', adminController.deleteBanner);

// Coupon Management
router.get('/coupons', adminController.getAllCoupons);
router.post('/coupons', adminController.createCoupon);
router.put('/coupons/:couponId', adminController.updateCoupon);
router.delete('/coupons/:couponId', adminController.deleteCoupon);

// Notification Management
router.post('/notifications', adminController.createNotification);
router.get('/notifications', adminController.getAllNotifications);

// Bulk Operations
router.put('/products/bulk/status', adminController.bulkUpdateProductStatus);
router.put('/users/bulk/status', adminController.bulkUpdateUserStatus);

// Analytics
router.get('/analytics', adminController.getAnalytics);

// Email Testing
router.post('/email/test', adminController.sendTestEmail);

module.exports = router;
