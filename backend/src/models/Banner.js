const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true // Cloudinary URL
  },
  imagePublicId: {
    type: String,
    required: true // For Cloudinary management
  },
  link: {
    type: String,
    trim: true
  },
  linkType: {
    type: String,
    enum: ['product', 'category', 'brand', 'external', 'none'],
    default: 'none'
  },
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'linkType',
    required: false
  },
  position: {
    type: String,
    enum: ['hero', 'sidebar', 'footer', 'popup'],
    required: true
  },
  displayOrder: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: false
  },
  targetAudience: {
    type: String,
    enum: ['all', 'new_users', 'returning_users', 'premium_users'],
    default: 'all'
  },
  clickCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
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
bannerSchema.index({ position: 1, displayOrder: 1, isActive: 1 });
bannerSchema.index({ isActive: 1, startDate: 1, endDate: 1 });
bannerSchema.index({ createdAt: -1 });

// Virtual for checking if banner is currently active
bannerSchema.virtual('isCurrentlyActive').get(function() {
  const now = new Date();
  return this.isActive &&
         this.startDate <= now &&
         (!this.endDate || this.endDate >= now);
});

// Method to increment click count
bannerSchema.methods.incrementClick = function() {
  this.clickCount += 1;
  return this.save();
};

// Method to increment view count
bannerSchema.methods.incrementView = function() {
  this.viewCount += 1;
  return this.save();
};

// Static method to get active banners by position
bannerSchema.statics.getActiveBanners = function(position) {
  const now = new Date();
  return this.find({
    position,
    isActive: true,
    startDate: { $lte: now },
    $or: [{ endDate: null }, { endDate: { $gte: now } }]
  })
  .sort({ displayOrder: 1 })
  .populate('linkId', 'name slug');
};

module.exports = mongoose.model('Banner', bannerSchema);
