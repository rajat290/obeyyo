const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  maxDiscount: {
    type: Number,
    min: 0,
    required: false // Only for percentage discounts
  },
  minOrderValue: {
    type: Number,
    default: 0,
    min: 0
  },
  maxOrderValue: {
    type: Number,
    min: 0,
    required: false
  },
  usageLimit: {
    type: Number,
    min: 1,
    required: false // null means unlimited
  },
  usageLimitPerUser: {
    type: Number,
    min: 1,
    default: 1
  },
  usedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  applicableBrands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  }],
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  excludedCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  excludedBrands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  }],
  excludedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  userRestrictions: {
    newUsersOnly: {
      type: Boolean,
      default: false
    },
    existingUsersOnly: {
      type: Boolean,
      default: false
    },
    firstOrderOnly: {
      type: Boolean,
      default: false
    },
    minOrdersRequired: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for performance
couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ isActive: 1, expiryDate: 1 });
couponSchema.index({ startDate: 1, expiryDate: 1 });

// Virtual for checking if coupon is currently valid
couponSchema.virtual('isValid').get(function() {
  const now = new Date();
  return this.isActive &&
         this.startDate <= now &&
         this.expiryDate >= now &&
         (!this.usageLimit || this.usedCount < this.usageLimit);
});

// Virtual for remaining uses
couponSchema.virtual('remainingUses').get(function() {
  if (!this.usageLimit) return null; // unlimited
  return Math.max(0, this.usageLimit - this.usedCount);
});

// Method to check if coupon can be applied to cart
couponSchema.methods.canApplyToCart = function(cartTotal, userId, userOrderCount = 0) {
  // Check basic validity
  if (!this.isValid) {
    return { canApply: false, reason: 'Coupon is not valid' };
  }

  // Check minimum order value
  if (cartTotal < this.minOrderValue) {
    return {
      canApply: false,
      reason: `Minimum order value of ₹${this.minOrderValue} required`
    };
  }

  // Check maximum order value
  if (this.maxOrderValue && cartTotal > this.maxOrderValue) {
    return {
      canApply: false,
      reason: `Maximum order value for this coupon is ₹${this.maxOrderValue}`
    };
  }

  // Check user restrictions
  if (this.userRestrictions.newUsersOnly && userOrderCount > 0) {
    return { canApply: false, reason: 'This coupon is for new users only' };
  }

  if (this.userRestrictions.existingUsersOnly && userOrderCount === 0) {
    return { canApply: false, reason: 'This coupon is for existing users only' };
  }

  if (this.userRestrictions.firstOrderOnly && userOrderCount > 0) {
    return { canApply: false, reason: 'This coupon is for first order only' };
  }

  if (this.userRestrictions.minOrdersRequired && userOrderCount < this.userRestrictions.minOrdersRequired) {
    return {
      canApply: false,
      reason: `Minimum ${this.userRestrictions.minOrdersRequired} orders required`
    };
  }

  return { canApply: true };
};

// Method to calculate discount amount
couponSchema.methods.calculateDiscount = function(cartTotal) {
  let discount = 0;

  if (this.discountType === 'percentage') {
    discount = (cartTotal * this.discountValue) / 100;
    if (this.maxDiscount && discount > this.maxDiscount) {
      discount = this.maxDiscount;
    }
  } else {
    discount = this.discountValue;
  }

  // Ensure discount doesn't exceed cart total
  return Math.min(discount, cartTotal);
};

// Static method to find valid coupons for user
couponSchema.statics.findValidCoupons = function(userId, cartTotal, userOrderCount = 0) {
  const now = new Date();

  return this.find({
    isActive: true,
    startDate: { $lte: now },
    expiryDate: { $gte: now },
    $or: [
      { usageLimit: null },
      { $expr: { $lt: ['$usedCount', '$usageLimit'] } }
    ]
  })
  .populate('applicableCategories', 'name')
  .populate('applicableBrands', 'name')
  .populate('applicableProducts', 'name');
};

module.exports = mongoose.model('Coupon', couponSchema);
