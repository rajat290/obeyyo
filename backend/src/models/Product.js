const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  shortDescription: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  images: [{
    type: String, // URLs
  }],
  thumbnailImage: String,
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  isFlashSale: {
    type: Boolean,
    default: false,
  },
  flashSaleEndDate: Date,
  tags: [String],
  colors: [String],
  sizes: [String],
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  metaTitle: String,
  metaDescription: String,
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Create slug from name before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    const slugify = require('slugify');
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Virtual for discount price
productSchema.virtual('discountPrice').get(function() {
  if (this.discount > 0) {
    return this.price - (this.price * this.discount / 100);
  }
  return this.price;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
