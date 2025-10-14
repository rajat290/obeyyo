const Category = require('../models/Category');
const ApiError = require('../utils/apiError');
const slugify = require('slugify');

class CategoryService {
  // Create new category
  async createCategory(categoryData, userId) {
    const { name, parent } = categoryData;

    // Check if parent category exists (if provided)
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        throw new ApiError('Parent category not found', 404);
      }
    }

    // Generate slug
    const slug = slugify(name, { lower: true, strict: true });

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      throw new ApiError('Category with this name already exists', 400);
    }

    // Create category
    const category = await Category.create({
      ...categoryData,
      slug,
      createdBy: userId,
    });

    await category.populate(['parent', 'createdBy']);

    return category;
  }

  // Get all categories with hierarchy
  async getCategories(queryParams = {}) {
    const { includeSubcategories = true, parentOnly = false } = queryParams;

    let filter = { isActive: true };

    if (parentOnly) {
      filter.parent = null; // Only parent categories
    }

    const categories = await Category.find(filter)
      .populate('parent', 'name slug')
      .populate('createdBy', 'firstName lastName')
      .sort({ order: 1, name: 1 });

    if (includeSubcategories && !parentOnly) {
      // Build hierarchical structure
      const categoryMap = new Map();
      const rootCategories = [];

      // First pass: create map of all categories
      categories.forEach(category => {
        categoryMap.set(category._id.toString(), {
          ...category.toObject(),
          subcategories: [],
        });
      });

      // Second pass: build hierarchy
      categories.forEach(category => {
        const categoryObj = categoryMap.get(category._id.toString());

        if (category.parent) {
          const parentObj = categoryMap.get(category.parent._id.toString());
          if (parentObj) {
            parentObj.subcategories.push(categoryObj);
          }
        } else {
          rootCategories.push(categoryObj);
        }
      });

      return rootCategories;
    }

    return categories;
  }

  // Get single category by ID or slug
  async getCategory(identifier) {
    let filter = { isActive: true };

    // Check if identifier is MongoDB ObjectId or slug
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      filter._id = identifier;
    } else {
      filter.slug = identifier;
    }

    const category = await Category.findOne(filter)
      .populate('parent', 'name slug description')
      .populate('createdBy', 'firstName lastName')
      .populate({
        path: 'subcategories',
        match: { isActive: true },
        select: 'name slug description order',
        options: { sort: { order: 1, name: 1 } },
      });

    if (!category) {
      throw new ApiError('Category not found', 404);
    }

    return category;
  }

  // Update category
  async updateCategory(categoryId, updateData, userId) {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new ApiError('Category not found', 404);
    }

    const { name, parent } = updateData;

    // Check if parent category exists (if being updated)
    if (parent && parent !== category.parent?.toString()) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        throw new ApiError('Parent category not found', 404);
      }

      // Prevent circular reference
      if (parent === categoryId) {
        throw new ApiError('Category cannot be its own parent', 400);
      }
    }

    // Update slug if name is being changed
    if (name && name !== category.name) {
      const slug = slugify(name, { lower: true, strict: true });

      // Check if new slug conflicts with existing category (excluding current one)
      const existingCategory = await Category.findOne({
        slug,
        _id: { $ne: categoryId },
      });

      if (existingCategory) {
        throw new ApiError('Category with this name already exists', 400);
      }

      updateData.slug = slug;
    }

    // Update category
    Object.assign(category, updateData);
    category.updatedBy = userId;

    await category.save();
    await category.populate(['parent', 'updatedBy']);

    return category;
  }

  // Delete category (soft delete)
  async deleteCategory(categoryId, userId) {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new ApiError('Category not found', 404);
    }

    // Check if category has subcategories
    const subcategories = await Category.find({ parent: categoryId, isActive: true });
    if (subcategories.length > 0) {
      throw new ApiError('Cannot delete category with active subcategories', 400);
    }

    // Check if category has products
    const Product = require('../models/Product');
    const productsCount = await Product.countDocuments({
      category: categoryId,
      isActive: true,
    });

    if (productsCount > 0) {
      throw new ApiError('Cannot delete category with active products', 400);
    }

    category.isActive = false;
    category.updatedBy = userId;
    await category.save();

    return { message: 'Category deleted successfully' };
  }

  // Get category tree (for admin)
  async getCategoryTree() {
    const categories = await Category.find({ isActive: true })
      .populate('parent', 'name slug')
      .populate('createdBy', 'firstName lastName')
      .sort({ order: 1, name: 1 });

    const categoryMap = new Map();
    const rootCategories = [];

    // Create map of all categories
    categories.forEach(category => {
      categoryMap.set(category._id.toString(), {
        ...category.toObject(),
        children: [],
      });
    });

    // Build tree structure
    categories.forEach(category => {
      const categoryObj = categoryMap.get(category._id.toString());

      if (category.parent) {
        const parentObj = categoryMap.get(category.parent._id.toString());
        if (parentObj) {
          parentObj.children.push(categoryObj);
        }
      } else {
        rootCategories.push(categoryObj);
      }
    });

    return rootCategories;
  }

  // Update category order
  async updateCategoryOrder(categoryId, newOrder, userId) {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new ApiError('Category not found', 404);
    }

    category.order = newOrder;
    category.updatedBy = userId;
    await category.save();

    return category;
  }

  // Get categories for navigation menu
  async getNavigationCategories() {
    const categories = await Category.find({
      isActive: true,
      showInMenu: true,
    })
      .populate({
        path: 'subcategories',
        match: { isActive: true, showInMenu: true },
        select: 'name slug order',
        options: { sort: { order: 1, name: 1 } },
      })
      .sort({ order: 1, name: 1 });

    // Filter only parent categories
    const parentCategories = categories.filter(cat => !cat.parent);

    return parentCategories;
  }
}

module.exports = new CategoryService();
