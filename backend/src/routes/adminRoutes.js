const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {
  updateUserStatusValidation,
  updateUserRoleValidation,
  updateProductStatusValidation,
  rejectReviewValidation,
  createBannerValidation,
  updateBannerValidation,
  deleteBannerValidation,
  createCouponValidation,
  updateCouponValidation,
  deleteCouponValidation,
  createNotificationValidation,
  bulkUpdateProductStatusValidation,
  bulkUpdateUserStatusValidation,
  getAnalyticsValidation
} = require('../validators/adminValidators');
const { protect, authorize } = require('../middlewares/auth');
const fileUploadService = require('../services/fileUploadService');

// Apply authentication and admin authorization to all routes
router.use(protect);
router.use(authorize(['admin']));

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// User Management
router.get('/users', adminController.getAllUsers);
router.put('/users/:userId/status', updateUserStatusValidation, adminController.updateUserStatus);
router.put('/users/:userId/role', updateUserRoleValidation, adminController.updateUserRole);

// Product Management
router.get('/products', adminController.getAllProducts);
router.put('/products/:productId/status', updateProductStatusValidation, adminController.updateProductStatus);

// Order Management
router.get('/orders', adminController.getAllOrders);

// Review Management
router.get('/reviews', adminController.getAllReviews);
router.put('/reviews/:reviewId/approve', adminController.approveReview);
router.put('/reviews/:reviewId/reject', rejectReviewValidation, adminController.rejectReview);

// Banner Management
router.get('/banners', adminController.getAllBanners);
router.post('/banners', fileUploadService.createBannerImageUpload().single('image'), createBannerValidation, adminController.createBanner);
router.put('/banners/:bannerId', fileUploadService.createBannerImageUpload().single('image'), updateBannerValidation, adminController.updateBanner);
router.delete('/banners/:bannerId', deleteBannerValidation, adminController.deleteBanner);

// Coupon Management
router.get('/coupons', adminController.getAllCoupons);
router.post('/coupons', createCouponValidation, adminController.createCoupon);
router.put('/coupons/:couponId', updateCouponValidation, adminController.updateCoupon);
router.delete('/coupons/:couponId', deleteCouponValidation, adminController.deleteCoupon);

// Notification Management
router.post('/notifications', createNotificationValidation, adminController.createNotification);
router.get('/notifications', adminController.getAllNotifications);

// Bulk Operations
router.put('/products/bulk/status', bulkUpdateProductStatusValidation, adminController.bulkUpdateProductStatus);
router.put('/users/bulk/status', bulkUpdateUserStatusValidation, adminController.bulkUpdateUserStatus);

// Analytics
router.get('/analytics', getAnalyticsValidation, adminController.getAnalytics);

// Email Testing
router.post('/email/test', adminController.sendTestEmail);

module.exports = router;
