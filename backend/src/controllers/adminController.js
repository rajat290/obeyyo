const adminService = require('../services/adminService');
const emailService = require('../services/emailService');
const fileUploadService = require('../services/fileUploadService');
const { validationResult } = require('express-validator');

// Dashboard
const getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();

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

// User Management
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '' } = req.query;

    const result = await adminService.getAllUsers(
      parseInt(page),
      parseInt(limit),
      search,
      role
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await adminService.updateUserStatus(userId, isActive);

    res.status(200).json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: user
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { userId } = req.params;
    const { role } = req.body;

    const user = await adminService.updateUserRole(userId, role);

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

// Product Management
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category = '', status = '' } = req.query;

    const result = await adminService.getAllProducts(
      parseInt(page),
      parseInt(limit),
      search,
      category,
      status
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { productId } = req.params;
    const { isActive } = req.body;

    const product = await adminService.updateProductStatus(productId, isActive);

    res.status(200).json({
      success: true,
      message: `Product ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: product
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

// Order Management
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '', search = '' } = req.query;

    const result = await adminService.getAllOrders(
      parseInt(page),
      parseInt(limit),
      status,
      search
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Review Management
const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'pending', search = '' } = req.query;

    const result = await adminService.getAllReviews(
      parseInt(page),
      parseInt(limit),
      status,
      search
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const approveReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await adminService.approveReview(reviewId, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Review approved successfully',
      data: review
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

const rejectReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { reviewId } = req.params;
    const { reason } = req.body;

    const review = await adminService.rejectReview(reviewId, req.user.id, reason);

    res.status(200).json({
      success: true,
      message: 'Review rejected successfully',
      data: review
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

// Banner Management
const getAllBanners = async (req, res) => {
  try {
    const { page = 1, limit = 10, position = '' } = req.query;

    const result = await adminService.getAllBanners(
      parseInt(page),
      parseInt(limit),
      position
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const createBanner = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const bannerData = req.body;

    // Handle image upload if provided
    if (req.file) {
      const uploadResult = await fileUploadService.uploadSingle(
        req.file,
        'banners'
      );
      bannerData.image = uploadResult.url;
      bannerData.imagePublicId = uploadResult.publicId;
    }

    const banner = await adminService.createBanner(bannerData, req.user.id);

    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: banner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { bannerId } = req.params;
    const updateData = req.body;

    // Handle image upload if provided
    if (req.file) {
      const uploadResult = await fileUploadService.uploadSingle(
        req.file,
        'banners'
      );
      updateData.image = uploadResult.url;
      updateData.imagePublicId = uploadResult.publicId;
    }

    const banner = await adminService.updateBanner(bannerId, updateData);

    res.status(200).json({
      success: true,
      message: 'Banner updated successfully',
      data: banner
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;

    const result = await adminService.deleteBanner(bannerId);

    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

// Coupon Management
const getAllCoupons = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '' } = req.query;

    const result = await adminService.getAllCoupons(
      parseInt(page),
      parseInt(limit),
      status
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const createCoupon = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const couponData = req.body;
    const coupon = await adminService.createCoupon(couponData, req.user.id);

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      data: coupon
    });
  } catch (error) {
    const statusCode = error.message.includes('duplicate') ? 409 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { couponId } = req.params;
    const updateData = req.body;

    const coupon = await adminService.updateCoupon(couponId, updateData);

    res.status(200).json({
      success: true,
      message: 'Coupon updated successfully',
      data: coupon
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;

    const result = await adminService.deleteCoupon(couponId);

    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 :
                      error.message.includes('used in orders') ? 409 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

// Notification Management
const createNotification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const notificationData = req.body;
    const notification = await adminService.createNotification(notificationData, req.user.id);

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10, type = '' } = req.query;

    const result = await adminService.getAllNotifications(
      parseInt(page),
      parseInt(limit),
      type
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Bulk Operations
const bulkUpdateProductStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { productIds, isActive } = req.body;

    const result = await adminService.bulkUpdateProductStatus(productIds, isActive);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const bulkUpdateUserStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { userIds, isActive } = req.body;

    const result = await adminService.bulkUpdateUserStatus(userIds, isActive);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Analytics
const getAnalytics = async (req, res) => {
  try {
    const { timeframe = '30d' } = req.query;

    const analytics = await adminService.getAnalytics(timeframe);

    res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Email testing
const sendTestEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email address is required'
      });
    }

    const result = await emailService.sendTestEmail(email);

    res.status(200).json({
      success: true,
      message: 'Test email sent successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserStatus,
  updateUserRole,
  getAllProducts,
  updateProductStatus,
  getAllOrders,
  getAllReviews,
  approveReview,
  rejectReview,
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  createNotification,
  getAllNotifications,
  bulkUpdateProductStatus,
  bulkUpdateUserStatus,
  getAnalytics,
  sendTestEmail
};
