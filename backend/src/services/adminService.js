const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Banner = require('../models/Banner');
const Coupon = require('../models/Coupon');
const ProductReview = require('../models/ProductReview');
const Notification = require('../models/Notification');
const emailService = require('./emailService');

class AdminService {
  // Dashboard statistics
  async getDashboardStats() {
    try {
      const [
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        recentOrders,
        lowStockProducts,
        pendingReviews
      ] = await Promise.all([
        User.countDocuments({ role: 'user' }),
        Product.countDocuments({ isActive: true }),
        Order.countDocuments(),
        Order.aggregate([
          { $match: { paymentStatus: 'paid' } },
          { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]),
        Order.find()
          .populate('user', 'name email')
          .sort({ createdAt: -1 })
          .limit(5),
        Product.find({
          isActive: true,
          $expr: { $lt: ['$stock', '$lowStockThreshold'] }
        }).select('name stock lowStockThreshold').limit(10),
        ProductReview.countDocuments({ isApproved: false })
      ]);

      const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

      // Monthly revenue for chart
      const monthlyRevenue = await Order.aggregate([
        {
          $match: {
            paymentStatus: 'paid',
            createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            revenue: { $sum: '$totalAmount' },
            orders: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ]);

      return {
        overview: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue: revenue
        },
        recentOrders,
        lowStockProducts,
        pendingReviews,
        monthlyRevenue
      };
    } catch (error) {
      throw new Error(`Error getting dashboard stats: ${error.message}`);
    }
  }

  // User management
  async getAllUsers(page = 1, limit = 10, search = '', role = '') {
    try {
      const query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }
      if (role) {
        query.role = role;
      }

      const users = await User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await User.countDocuments(query);

      return {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  }

  async updateUserStatus(userId, isActive) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive },
        { new: true }
      ).select('-password');

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error(`Error updating user status: ${error.message}`);
    }
  }

  async updateUserRole(userId, role) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      ).select('-password');

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error(`Error updating user role: ${error.message}`);
    }
  }

  // Product management
  async getAllProducts(page = 1, limit = 10, search = '', category = '', status = '') {
    try {
      const query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { sku: { $regex: search, $options: 'i' } }
        ];
      }
      if (category) {
        query.category = category;
      }
      if (status) {
        query.isActive = status === 'active';
      }

      const products = await Product.find(query)
        .populate('category', 'name')
        .populate('brand', 'name')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Product.countDocuments(query);

      return {
        products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error getting products: ${error.message}`);
    }
  }

  async updateProductStatus(productId, isActive) {
    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { isActive },
        { new: true }
      ).populate('category brand');

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      throw new Error(`Error updating product status: ${error.message}`);
    }
  }

  // Order management
  async getAllOrders(page = 1, limit = 10, status = '', search = '') {
    try {
      const query = {};
      if (status) {
        query.orderStatus = status;
      }
      if (search) {
        query.$or = [
          { orderNumber: { $regex: search, $options: 'i' } },
          { 'user.name': { $regex: search, $options: 'i' } },
          { 'user.email': { $regex: search, $options: 'i' } }
        ];
      }

      const orders = await Order.find(query)
        .populate('user', 'name email')
        .populate('items.product', 'name images')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Order.countDocuments(query);

      return {
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error getting orders: ${error.message}`);
    }
  }

  // Review management
  async getAllReviews(page = 1, limit = 10, status = 'pending', search = '') {
    try {
      const query = {};
      if (status === 'pending') {
        query.isApproved = false;
      } else if (status === 'approved') {
        query.isApproved = true;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { comment: { $regex: search, $options: 'i' } },
          { 'product.name': { $regex: search, $options: 'i' } }
        ];
      }

      const reviews = await ProductReview.find(query)
        .populate('product', 'name images slug')
        .populate('user', 'name avatar')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await ProductReview.countDocuments(query);

      return {
        reviews,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error getting reviews: ${error.message}`);
    }
  }

  async approveReview(reviewId, adminId) {
    try {
      const review = await ProductReview.findByIdAndUpdate(
        reviewId,
        {
          isApproved: true,
          'metadata.approvedBy': adminId,
          'metadata.approvedAt': new Date()
        },
        { new: true }
      ).populate('product user');

      if (!review) {
        throw new Error('Review not found');
      }

      return review;
    } catch (error) {
      throw new Error(`Error approving review: ${error.message}`);
    }
  }

  async rejectReview(reviewId, adminId, reason) {
    try {
      const review = await ProductReview.findByIdAndUpdate(
        reviewId,
        {
          isApproved: false,
          'metadata.rejectedBy': adminId,
          'metadata.rejectedAt': new Date(),
          'metadata.rejectionReason': reason
        },
        { new: true }
      ).populate('product user');

      if (!review) {
        throw new Error('Review not found');
      }

      return review;
    } catch (error) {
      throw new Error(`Error rejecting review: ${error.message}`);
    }
  }

  // Banner management
  async getAllBanners(page = 1, limit = 10, position = '') {
    try {
      const query = {};
      if (position) {
        query.position = position;
      }

      const banners = await Banner.find(query)
        .populate('createdBy', 'name')
        .sort({ displayOrder: 1, createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Banner.countDocuments(query);

      return {
        banners,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error getting banners: ${error.message}`);
    }
  }

  async createBanner(bannerData, adminId) {
    try {
      const banner = new Banner({
        ...bannerData,
        createdBy: adminId
      });

      return await banner.save();
    } catch (error) {
      throw new Error(`Error creating banner: ${error.message}`);
    }
  }

  async updateBanner(bannerId, updateData) {
    try {
      const banner = await Banner.findByIdAndUpdate(
        bannerId,
        updateData,
        { new: true }
      ).populate('createdBy', 'name');

      if (!banner) {
        throw new Error('Banner not found');
      }

      return banner;
    } catch (error) {
      throw new Error(`Error updating banner: ${error.message}`);
    }
  }

  async deleteBanner(bannerId) {
    try {
      const banner = await Banner.findById(bannerId);
      if (!banner) {
        throw new Error('Banner not found');
      }

      // Delete image from Cloudinary if exists
      if (banner.imagePublicId) {
        const fileUploadService = require('./fileUploadService');
        await fileUploadService.deleteFile(banner.imagePublicId);
      }

      await Banner.findByIdAndDelete(bannerId);
      return { success: true, message: 'Banner deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting banner: ${error.message}`);
    }
  }

  // Coupon management
  async getAllCoupons(page = 1, limit = 10, status = '') {
    try {
      const query = {};
      if (status === 'active') {
        query.isActive = true;
        query.expiryDate = { $gte: new Date() };
      } else if (status === 'expired') {
        query.expiryDate = { $lt: new Date() };
      } else if (status === 'inactive') {
        query.isActive = false;
      }

      const coupons = await Coupon.find(query)
        .populate('createdBy', 'name')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Coupon.countDocuments(query);

      return {
        coupons,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error getting coupons: ${error.message}`);
    }
  }

  async createCoupon(couponData, adminId) {
    try {
      const coupon = new Coupon({
        ...couponData,
        createdBy: adminId
      });

      return await coupon.save();
    } catch (error) {
      throw new Error(`Error creating coupon: ${error.message}`);
    }
  }

  async updateCoupon(couponId, updateData) {
    try {
      const coupon = await Coupon.findByIdAndUpdate(
        couponId,
        updateData,
        { new: true }
      ).populate('createdBy', 'name');

      if (!coupon) {
        throw new Error('Coupon not found');
      }

      return coupon;
    } catch (error) {
      throw new Error(`Error updating coupon: ${error.message}`);
    }
  }

  async deleteCoupon(couponId) {
    try {
      const coupon = await Coupon.findById(couponId);
      if (!coupon) {
        throw new Error('Coupon not found');
      }

      // Check if coupon is being used
      const Order = require('../models/Order');
      const usageCount = await Order.countDocuments({ coupon: couponId });
      if (usageCount > 0) {
        throw new Error('Cannot delete coupon that has been used in orders');
      }

      await Coupon.findByIdAndDelete(couponId);
      return { success: true, message: 'Coupon deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting coupon: ${error.message}`);
    }
  }

  // Notification management
  async createNotification(notificationData, adminId) {
    try {
      const notification = new Notification({
        ...notificationData,
        createdBy: adminId
      });

      return await notification.save();
    } catch (error) {
      throw new Error(`Error creating notification: ${error.message}`);
    }
  }

  async getAllNotifications(page = 1, limit = 10, type = '') {
    try {
      const query = {};
      if (type) {
        query.type = type;
      }

      const notifications = await Notification.find(query)
        .populate('recipient', 'name email')
        .populate('createdBy', 'name')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Notification.countDocuments(query);

      return {
        notifications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error getting notifications: ${error.message}`);
    }
  }

  // Bulk operations
  async bulkUpdateProductStatus(productIds, isActive) {
    try {
      const result = await Product.updateMany(
        { _id: { $in: productIds } },
        { isActive }
      );

      return {
        success: true,
        modifiedCount: result.modifiedCount,
        message: `${result.modifiedCount} products updated successfully`
      };
    } catch (error) {
      throw new Error(`Error bulk updating products: ${error.message}`);
    }
  }

  async bulkUpdateUserStatus(userIds, isActive) {
    try {
      const result = await User.updateMany(
        { _id: { $in: userIds } },
        { isActive }
      );

      return {
        success: true,
        modifiedCount: result.modifiedCount,
        message: `${result.modifiedCount} users updated successfully`
      };
    } catch (error) {
      throw new Error(`Error bulk updating users: ${error.message}`);
    }
  }

  // Analytics
  async getAnalytics(timeframe = '30d') {
    try {
      const now = new Date();
      let startDate;

      switch (timeframe) {
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case '1y':
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      const [
        userStats,
        orderStats,
        revenueStats,
        productStats
      ] = await Promise.all([
        // User registration stats
        User.aggregate([
          { $match: { createdAt: { $gte: startDate } } },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id': 1 } }
        ]),

        // Order stats
        Order.aggregate([
          { $match: { createdAt: { $gte: startDate } } },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
              },
              count: { $sum: 1 },
              revenue: { $sum: '$totalAmount' }
            }
          },
          { $sort: { '_id': 1 } }
        ]),

        // Revenue by payment status
        Order.aggregate([
          { $match: { createdAt: { $gte: startDate }, paymentStatus: 'paid' } },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: '$totalAmount' },
              totalOrders: { $sum: 1 }
            }
          }
        ]),

        // Top products
        Order.aggregate([
          { $match: { createdAt: { $gte: startDate } } },
          { $unwind: '$items' },
          {
            $group: {
              _id: '$items.product',
              totalSold: { $sum: '$items.quantity' },
              revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
            }
          },
          {
            $lookup: {
              from: 'products',
              localField: '_id',
              foreignField: '_id',
              as: 'product'
            }
          },
          { $unwind: '$product' },
          { $sort: { totalSold: -1 } },
          { $limit: 10 }
        ])
      ]);

      return {
        timeframe,
        userRegistrations: userStats,
        orders: orderStats,
        revenue: revenueStats[0] || { totalRevenue: 0, totalOrders: 0 },
        topProducts: productStats
      };
    } catch (error) {
      throw new Error(`Error getting analytics: ${error.message}`);
    }
  }
}

module.exports = new AdminService();
