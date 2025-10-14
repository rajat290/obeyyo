const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Review = require('../models/Review');
const ApiError = require('../utils/apiError');
const pagination = require('../utils/pagination');

class ProductService {
  // Create new product
  async createProduct(productData, userId) {
    const { name, category, brand, variants } = productData;

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      throw new ApiError('Category not found', 404);
    }

    // Check if brand exists (optional)
    if (brand) {
      const brandExists = await Brand.findById(brand);
      if (!brandExists) {
        throw new ApiError('Brand not found', 404);
      }
    }

    // Create product
    const product = await Product.create({
      ...productData,
      createdBy: userId,
    });

    // Populate category and brand
    await product.populate(['category', 'brand', 'createdBy']);

    return product;
  }

  // Get all products with filtering and pagination
  async getProducts(queryParams) {
    const {
      page = 1,
      limit = 10,
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      sort = 'createdAt_desc',
      inStock,
    } = queryParams;

    // Build filter object
    let filter = { isActive: true };

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }
    if (inStock === 'true') filter.stock = { $gt: 0 };

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'price_asc':
        sortObj.price = 1;
        break;
      case 'price_desc':
        sortObj.price = -1;
        break;
      case 'name_asc':
        sortObj.name = 1;
        break;
      case 'name_desc':
        sortObj.name = -1;
        break;
      case 'rating':
        sortObj.averageRating = -1;
        break;
      case 'newest':
      default:
        sortObj.createdAt = -1;
        break;
    }

    // Get total count
    const total = await Product.countDocuments(filter);

    // Get products with pagination
    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .populate('brand', 'name slug')
      .populate('createdBy', 'firstName lastName')
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const paginationInfo = pagination(page, limit, total);

    return {
      products,
      pagination: paginationInfo,
    };
  }

  // Get single product by ID or slug
  async getProduct(identifier) {
    let filter = { isActive: true };

    // Check if identifier is MongoDB ObjectId or slug
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      filter._id = identifier;
    } else {
      filter.slug = identifier;
    }

    const product = await Product.findOne(filter)
      .populate('category', 'name slug description')
      .populate('brand', 'name slug description')
      .populate('variants')
      .populate('createdBy', 'firstName lastName')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar',
        },
      });

    if (!product) {
      throw new ApiError('Product not found', 404);
    }

    // Increment view count
    product.viewCount += 1;
    await product.save();

    return product;
  }

  // Update product
  async updateProduct(productId, updateData, userId) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new ApiError('Product not found', 404);
    }

    // Check if category exists if being updated
    if (updateData.category) {
      const categoryExists = await Category.findById(updateData.category);
      if (!categoryExists) {
        throw new ApiError('Category not found', 404);
      }
    }

    // Check if brand exists if being updated
    if (updateData.brand) {
      const brandExists = await Brand.findById(updateData.brand);
      if (!brandExists) {
        throw new ApiError('Brand not found', 404);
      }
    }

    // Update product
    Object.assign(product, updateData);
    product.updatedBy = userId;

    await product.save();
    await product.populate(['category', 'brand', 'updatedBy']);

    return product;
  }

  // Delete product (soft delete)
  async deleteProduct(productId, userId) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new ApiError('Product not found', 404);
    }

    product.isActive = false;
    product.updatedBy = userId;
    await product.save();

    return { message: 'Product deleted successfully' };
  }

  // Get featured products
  async getFeaturedProducts(limit = 10) {
    const products = await Product.find({ isActive: true, isFeatured: true })
      .populate('category', 'name slug')
      .populate('brand', 'name slug')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    return products;
  }

  // Get products by category
  async getProductsByCategory(categorySlug, queryParams) {
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      throw new ApiError('Category not found', 404);
    }

    const productsData = await this.getProducts({
      ...queryParams,
      category: category._id,
    });

    return {
      ...productsData,
      category,
    };
  }

  // Get products by brand
  async getProductsByBrand(brandSlug, queryParams) {
    const brand = await Brand.findOne({ slug: brandSlug });
    if (!brand) {
      throw new ApiError('Brand not found', 404);
    }

    const productsData = await this.getProducts({
      ...queryParams,
      brand: brand._id,
    });

    return {
      ...productsData,
      brand,
    };
  }

  // Search products
  async searchProducts(searchTerm, queryParams) {
    return this.getProducts({
      ...queryParams,
      search: searchTerm,
    });
  }

  // Add product review
  async addProductReview(productId, userId, reviewData) {
    const { rating, comment } = reviewData;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError('Product not found', 404);
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
    });

    if (existingReview) {
      throw new ApiError('You have already reviewed this product', 400);
    }

    // Create review
    const review = await Review.create({
      product: productId,
      user: userId,
      rating,
      comment,
    });

    // Update product rating
    await this.updateProductRating(productId);

    await review.populate('user', 'firstName lastName avatar');

    return review;
  }

  // Update product average rating
  async updateProductRating(productId) {
    const reviews = await Review.find({ product: productId });

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      await Product.findByIdAndUpdate(productId, {
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        reviewCount: reviews.length,
      });
    }
  }

  // Get product reviews
  async getProductReviews(productId, queryParams) {
    const { page = 1, limit = 10 } = queryParams;

    const total = await Review.countDocuments({ product: productId });
    const reviews = await Review.find({ product: productId })
      .populate('user', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const paginationInfo = pagination(page, limit, total);

    return {
      reviews,
      pagination: paginationInfo,
    };
  }
}

module.exports = new ProductService();
