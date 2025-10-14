const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalItems: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update totals before saving
wishlistSchema.pre('save', function(next) {
  this.totalItems = this.items.length;
  this.lastUpdated = Date.now();
  next();
});

// Ensure no duplicate products in wishlist
wishlistSchema.pre('save', function(next) {
  const productIds = this.items.map(item => item.product.toString());
  const uniqueProductIds = [...new Set(productIds)];

  if (productIds.length !== uniqueProductIds.length) {
    this.items = this.items.filter((item, index) => {
      return productIds.indexOf(item.product.toString()) === index;
    });
  }

  next();
});

// Index for performance
wishlistSchema.index({ user: 1 });
wishlistSchema.index({ 'items.product': 1 });

module.exports = mongoose.model('Wishlist', wishlistSchema);
