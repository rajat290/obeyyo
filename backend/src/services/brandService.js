const Brand = require('../models/Brand');
const ApiError = require('../utils/apiError');
const slugify = require('slugify');

class BrandService {
  // Create new brand
  async createBrand(brandData, userId) {
    const { name } = brandData;

    // Generate slug
    const slug = slugify(name, { lower: true, strict: true });

    // Check if slug already exists
    const existingBrand = await Brand.findOne({ slug });
    if (existingBrand) {
      throw new ApiError('Brand with this name already exists', 400);
    }

    // Create brand
    const brand = await Brand.create({
      ...brandData,
      slug,
      createdBy: userId,
    });

    await brand.populate('createdBy', 'firstName lastName');

    return brand;
  }

  // Get all brands
  async getBrands(queryParams = {}) {
    const { page = 1, limit = 10, search, sort = 'name_asc', featured } = queryParams;

    let filter = { isActive: true };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'name_desc':
        sortObj.name = -1;
        break;
      case 'newest':
        sortObj.createdAt = -1;
        break;
      case 'oldest':
        sortObj.createdAt = 1;
        break;
      case 'name_asc':
      default:
        sortObj.name = 1;
        break;
    }

    // Get total count
    const total = await Brand.countDocuments(filter);

    // Get brands with pagination
    const brands = await Brand.find(filter)
      .populate('createdBy', 'firstName lastName')
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const pagination = {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
      itemsPerPage: parseInt(limit),
      hasNextPage: parseInt(page) < Math.ceil(total / parseInt(limit)),
      hasPrevPage: parseInt(page) > 1,
    };

    return {
      brands,
      pagination,
    };
  }

  // Get single brand by ID or slug
  async getBrand(identifier) {
    let filter = { isActive: true };

    // Check if identifier is MongoDB ObjectId or slug
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      filter._id = identifier;
    } else {
      filter.slug = identifier;
    }

    const brand = await Brand.findOne(filter)
      .populate('createdBy', 'firstName lastName');

    if (!brand) {
      throw new ApiError('Brand not found', 404);
    }

    return brand;
  }

  // Update brand
  async updateBrand(brandId, updateData, userId) {
    const brand = await Brand.findById(brandId);

    if (!brand) {
      throw new ApiError('Brand not found', 404);
    }

    const { name } = updateData;

    // Update slug if name is being changed
    if (name && name !== brand.name) {
      const slug = slugify(name, { lower: true, strict: true });

      // Check if new slug conflicts with existing brand (excluding current one)
      const existingBrand = await Brand.findOne({
        slug,
        _id: { $ne: brandId },
      });

      if (existingBrand) {
        throw new ApiError('Brand with this name already exists', 400);
      }

      updateData.slug = slug;
    }

    // Update brand
    Object.assign(brand, updateData);
    brand.updatedBy = userId;

    await brand.save();
    await brand.populate('updatedBy', 'firstName lastName');

    return brand;
  }

  // Delete brand (soft delete)
  async deleteBrand(brandId, userId) {
    const brand = await Brand.findById(brandId);

    if (!brand) {
      throw new ApiError('Brand not found', 404);
    }

    // Check if brand has products
    const Product = require('../models/Product');
    const productsCount = await Product.countDocuments({
      brand: brandId,
      isActive: true,
    });

    if (productsCount > 0) {
      throw new ApiError('Cannot delete brand with active products', 400);
    }

    brand.isActive = false;
    brand.updatedBy = userId;
    await brand.save();

    return { message: 'Brand deleted successfully' };
  }

  // Get featured brands
  async getFeaturedBrands(limit = 10) {
    const brands = await Brand.find({ isActive: true, isFeatured: true })
      .populate('createdBy', 'firstName lastName')
      .sort({ name: 1 })
      .limit(parseInt(limit));

    return brands;
  }

  // Get brands for specific category
  async getBrandsByCategory(categoryId) {
    const Product = require('../models/Product');

    // Find all brands that have products in the given category
    const brands = await Product.distinct('brand', {
      category: categoryId,
      isActive: true,
    });

    if (brands.length === 0) {
      return [];
    }

    const brandDetails = await Brand.find({
      _id: { $in: brands },
      isActive: true,
    })
      .populate('createdBy', 'firstName lastName')
      .sort({ name: 1 });

    return brandDetails;
  }

  // Search brands
  async searchBrands(searchTerm, queryParams = {}) {
    return this.getBrands({
      ...queryParams,
      search: searchTerm,
    });
  }

  // Toggle brand featured status
  async toggleFeatured(brandId, userId) {
    const brand = await Brand.findById(brandId);

    if (!brand) {
      throw new ApiError('Brand not found', 404);
    }

    brand.isFeatured = !brand.isFeatured;
    brand.updatedBy = userId;
    await brand.save();

    return brand;
  }

  // Get brand statistics
  async getBrandStats(brandId) {
    const Product = require('../models/Product');
    const Order = require('../models/Order');

    const brand = await Brand.findById(brandId);
    if (!brand) {
      throw new ApiError('Brand not found', 404);
    }

    // Get product count
    const productCount = await Product.countDocuments({
      brand: brandId,
      isActive: true,
    });

    // Get total sales (this would require aggregation on orders)
    // For now, return basic stats
    const stats = {
      brand: brand.name,
      productCount,
      isActive: brand.isActive,
      isFeatured: brand.isFeatured,
      createdAt: brand.createdAt,
    };

    return stats;
  }
}

module.exports = new BrandService();
