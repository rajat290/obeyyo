const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: false // For reviews on purchased products
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  images: [{
    type: String, // Cloudinary URLs
    required: false
  }],
  imagePublicIds: [{
    type: String, // For Cloudinary management
    required: false
  }],
  isVerified: {
    type: Boolean,
    default: false // True if user actually purchased the product
  },
  isApproved: {
    type: Boolean,
    default: true // Admin approval for public display
  },
  helpful: {
    type: Number,
    default: 0,
    min: 0
  },
  notHelpful: {
    type: Number,
    default: 0,
    min: 0
  },
  reportedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  response: {
    comment: {
      type: String,
      maxlength: 500
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: {
      type: Date
    }
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  }
}, {
  timestamps: true
});

// Indexes for performance
productReviewSchema.index({ product: 1, isApproved: 1, createdAt: -1 });
productReviewSchema.index({ user: 1, product: 1 }, { unique: true }); // One review per user per product
productReviewSchema.index({ rating: 1, product: 1 });
productReviewSchema.index({ isVerified: 1, product: 1 });

// Virtual for helpful percentage
productReviewSchema.virtual('helpfulPercentage').get(function() {
  const total = this.helpful + this.notHelpful;
  return total > 0 ? Math.round((this.helpful / total) * 100) : 0;
});

// Method to mark as helpful
productReviewSchema.methods.markHelpful = function(userId) {
  // In a real app, you'd track who voted to prevent multiple votes
  this.helpful += 1;
  return this.save();
};

// Method to mark as not helpful
productReviewSchema.methods.markNotHelpful = function(userId) {
  this.notHelpful += 1;
  return this.save();
};

// Method to report review
productReviewSchema.methods.report = function(reason) {
  this.reportedCount += 1;
  if (!this.metadata) this.metadata = {};
  if (!this.metadata.reports) this.metadata.reports = [];
  this.metadata.reports.push({
    reason,
    reportedAt: new Date()
  });
  return this.save();
};

// Method to respond to review (admin/seller)
productReviewSchema.methods.respond = function(comment, respondedBy) {
  this.response = {
    comment,
    respondedBy,
    respondedAt: new Date()
  };
  return this.save();
};

// Static method to get average rating for product
productReviewSchema.statics.getAverageRating = async function(productId) {
  const result = await this.aggregate([
    { $match: { product: productId, isApproved: true } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        ratingDistribution: {
          $push: '$rating'
        }
      }
    }
  ]);

  if (result.length === 0) {
    return { averageRating: 0, totalReviews: 0, ratingDistribution: {} };
  }

  const data = result[0];
  const distribution = [1, 2, 3, 4, 5].reduce((acc, rating) => {
    acc[rating] = data.ratingDistribution.filter(r => r === rating).length;
    return acc;
  }, {});

  return {
    averageRating: Math.round(data.averageRating * 10) / 10,
    totalReviews: data.totalReviews,
    ratingDistribution: distribution
  };
};

// Static method to get reviews for product
productReviewSchema.statics.getProductReviews = function(productId, page = 1, limit = 10, sortBy = 'newest') {
  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    highest: { rating: -1 },
    lowest: { rating: 1 },
    helpful: { helpful: -1 }
  };

  return this.find({ product: productId, isApproved: true })
    .populate('user', 'name avatar')
    .populate('order', 'orderNumber')
    .sort(sortOptions[sortBy] || sortOptions.newest)
    .limit(limit * 1)
    .skip((page - 1) * limit);
};

// Static method to check if user can review product
productReviewSchema.statics.canUserReviewProduct = async function(userId, productId) {
  // Check if user already reviewed this product
  const existingReview = await this.findOne({ user: userId, product: productId });
  if (existingReview) {
    return { canReview: false, reason: 'Already reviewed this product' };
  }

  // Check if user purchased this product (optional - depends on business rules)
  const Order = mongoose.model('Order');
  const hasPurchased = await Order.findOne({
    user: userId,
    'items.product': productId,
    orderStatus: { $in: ['delivered', 'confirmed'] }
  });

  return {
    canReview: true,
    isVerified: !!hasPurchased
  };
};

module.exports = mongoose.model('ProductReview', productReviewSchema);
