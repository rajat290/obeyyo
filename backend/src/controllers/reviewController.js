const ProductReview = require('../models/ProductReview');
const Product = require('../models/Product');
const Order = require('../models/Order');
const fileUploadService = require('../services/fileUploadService');
const emailService = require('../services/emailService');
const { validationResult } = require('express-validator');

// Create a new review
const createReview = async (req, res) => {
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
    const { rating, title, comment, orderId } = req.body;
    const userId = req.user.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Check if user can review this product
    const canReview = await ProductReview.canUserReviewProduct(userId, productId);
    if (!canReview.canReview) {
      return res.status(400).json({
        success: false,
        error: canReview.reason
      });
    }

    // Handle image uploads
    let images = [];
    let imagePublicIds = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file =>
        fileUploadService.uploadSingle(file, 'reviews')
      );

      const uploadResults = await Promise.all(uploadPromises);
      images = uploadResults.map(result => result.url);
      imagePublicIds = uploadResults.map(result => result.publicId);
    }

    // Create review
    const review = new ProductReview({
      product: productId,
      user: userId,
      order: orderId || null,
      rating: parseInt(rating),
      title,
      comment,
      images,
      imagePublicIds,
      isVerified: canReview.isVerified
    });

    await review.save();

    // Populate review data
    await review.populate([
      { path: 'product', select: 'name images slug' },
      { path: 'user', select: 'name avatar' },
      { path: 'order', select: 'orderNumber' }
    ]);

    // Send notification to admins about new review
    const adminUsers = await require('../models/User').find({ role: 'admin' });
    const adminEmails = adminUsers.map(admin => admin.email);

    if (adminEmails.length > 0) {
      emailService.sendNewReviewNotification(review, product, adminEmails);
    }

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sortBy = 'newest' } = req.query;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    const reviews = await ProductReview.getProductReviews(
      productId,
      parseInt(page),
      parseInt(limit),
      sortBy
    );

    const total = await ProductReview.countDocuments({
      product: productId,
      isApproved: true
    });

    res.status(200).json({
      success: true,
      data: {
        reviews,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get user's reviews
const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const reviews = await ProductReview.find({ user: userId })
      .populate('product', 'name images slug')
      .populate('order', 'orderNumber')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ProductReview.countDocuments({ user: userId });

    res.status(200).json({
      success: true,
      data: {
        reviews,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update review
const updateReview = async (req, res) => {
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
    const { rating, title, comment } = req.body;
    const userId = req.user.id;

    const review = await ProductReview.findOne({
      _id: reviewId,
      user: userId
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found or you do not have permission to update it'
      });
    }

    // Check if review is still editable (within 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    if (review.createdAt < thirtyDaysAgo) {
      return res.status(400).json({
        success: false,
        error: 'Reviews can only be edited within 30 days of submission'
      });
    }

    // Handle new image uploads
    let newImages = [];
    let newImagePublicIds = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file =>
        fileUploadService.uploadSingle(file, 'reviews')
      );

      const uploadResults = await Promise.all(uploadPromises);
      newImages = uploadResults.map(result => result.url);
      newImagePublicIds = uploadResults.map(result => result.publicId);

      // Combine with existing images
      review.images = [...(review.images || []), ...newImages];
      review.imagePublicIds = [...(review.imagePublicIds || []), ...newImagePublicIds];
    }

    // Update review fields
    review.rating = rating ? parseInt(rating) : review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;

    await review.save();

    // Populate review data
    await review.populate([
      { path: 'product', select: 'name images slug' },
      { path: 'user', select: 'name avatar' },
      { path: 'order', select: 'orderNumber' }
    ]);

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await ProductReview.findOne({
      _id: reviewId,
      user: userId
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found or you do not have permission to delete it'
      });
    }

    // Delete associated images from Cloudinary
    if (review.imagePublicIds && review.imagePublicIds.length > 0) {
      await fileUploadService.deleteMultipleFiles(review.imagePublicIds);
    }

    await ProductReview.findByIdAndDelete(reviewId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Mark review as helpful
const markReviewHelpful = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await ProductReview.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    await review.markHelpful(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Review marked as helpful',
      data: {
        helpful: review.helpful,
        notHelpful: review.notHelpful
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Mark review as not helpful
const markReviewNotHelpful = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await ProductReview.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    await review.markNotHelpful(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Review marked as not helpful',
      data: {
        helpful: review.helpful,
        notHelpful: review.notHelpful
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Report review
const reportReview = async (req, res) => {
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

    const review = await ProductReview.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    await review.report(reason);

    res.status(200).json({
      success: true,
      message: 'Review reported successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get product rating summary
const getProductRatingSummary = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    const summary = await ProductReview.getAverageRating(productId);

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Check if user can review product
const checkReviewEligibility = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const result = await ProductReview.canUserReviewProduct(userId, productId);

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

module.exports = {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  markReviewHelpful,
  markReviewNotHelpful,
  reportReview,
  getProductRatingSummary,
  checkReviewEligibility
};
