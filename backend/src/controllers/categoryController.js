const categoryService = require('../services/categoryService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

class CategoryController {
  // @desc    Create new category
  // @route   POST /api/categories
  // @access  Private/Admin
  createCategory = asyncHandler(async (req, res) => {
    const category = await categoryService.createCategory(req.body, req.user._id);
    ApiResponse.success(res, category, 'Category created successfully', 201);
  });

  // @desc    Get all categories
  // @route   GET /api/categories
  // @access  Public
  getCategories = asyncHandler(async (req, res) => {
    const categories = await categoryService.getCategories(req.query);
    ApiResponse.success(res, categories, 'Categories retrieved successfully');
  });

  // @desc    Get single category
  // @route   GET /api/categories/:id
  // @access  Public
  getCategory = asyncHandler(async (req, res) => {
    const category = await categoryService.getCategory(req.params.id);
    ApiResponse.success(res, category, 'Category retrieved successfully');
  });

  // @desc    Update category
  // @route   PUT /api/categories/:id
  // @access  Private/Admin
  updateCategory = asyncHandler(async (req, res) => {
    const category = await categoryService.updateCategory(req.params.id, req.body, req.user._id);
    ApiResponse.success(res, category, 'Category updated successfully');
  });

  // @desc    Delete category
  // @route   DELETE /api/categories/:id
  // @access  Private/Admin
  deleteCategory = asyncHandler(async (req, res) => {
    const result = await categoryService.deleteCategory(req.params.id, req.user._id);
    ApiResponse.success(res, result, 'Category deleted successfully');
  });

  // @desc    Get category tree
  // @route   GET /api/categories/tree
  // @access  Private/Admin
  getCategoryTree = asyncHandler(async (req, res) => {
    const categories = await categoryService.getCategoryTree();
    ApiResponse.success(res, categories, 'Category tree retrieved successfully');
  });

  // @desc    Update category order
  // @route   PUT /api/categories/:id/order
  // @access  Private/Admin
  updateCategoryOrder = asyncHandler(async (req, res) => {
    const category = await categoryService.updateCategoryOrder(req.params.id, req.body.order, req.user._id);
    ApiResponse.success(res, category, 'Category order updated successfully');
  });

  // @desc    Get navigation categories
  // @route   GET /api/categories/navigation
  // @access  Public
  getNavigationCategories = asyncHandler(async (req, res) => {
    const categories = await categoryService.getNavigationCategories();
    ApiResponse.success(res, categories, 'Navigation categories retrieved successfully');
  });
}

module.exports = new CategoryController();
