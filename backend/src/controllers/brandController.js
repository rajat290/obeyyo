const brandService = require('../services/brandService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

class BrandController {
  // @desc    Create new brand
  // @route   POST /api/brands
  // @access  Private/Admin
  createBrand = asyncHandler(async (req, res) => {
    const brand = await brandService.createBrand(req.body, req.user._id);
    ApiResponse.success(res, brand, 'Brand created successfully', 201);
  });

  // @desc    Get all brands
  // @route   GET /api/brands
  // @access  Public
  getBrands = asyncHandler(async (req, res) => {
    const result = await brandService.getBrands(req.query);
    ApiResponse.paginated(res, result.brands, result.pagination, 'Brands retrieved successfully');
  });

  // @desc    Get single brand
  // @route   GET /api/brands/:id
  // @access  Public
  getBrand = asyncHandler(async (req, res) => {
    const brand = await brandService.getBrand(req.params.id);
    ApiResponse.success(res, brand, 'Brand retrieved successfully');
  });

  // @desc    Update brand
  // @route   PUT /api/brands/:id
  // @access  Private/Admin
  updateBrand = asyncHandler(async (req, res) => {
    const brand = await brandService.updateBrand(req.params.id, req.body, req.user._id);
    ApiResponse.success(res, brand, 'Brand updated successfully');
  });

  // @desc    Delete brand
  // @route   DELETE /api/brands/:id
  // @access  Private/Admin
  deleteBrand = asyncHandler(async (req, res) => {
    const result = await brandService.deleteBrand(req.params.id, req.user._id);
    ApiResponse.success(res, result, 'Brand deleted successfully');
  });

  // @desc    Get featured brands
  // @route   GET /api/brands/featured
  // @access  Public
  getFeaturedBrands = asyncHandler(async (req, res) => {
    const brands = await brandService.getFeaturedBrands(req.query.limit);
    ApiResponse.success(res, brands, 'Featured brands retrieved successfully');
  });

  // @desc    Get brands by category
  // @route   GET /api/brands/category/:categoryId
  // @access  Public
  getBrandsByCategory = asyncHandler(async (req, res) => {
    const brands = await brandService.getBrandsByCategory(req.params.categoryId);
    ApiResponse.success(res, brands, 'Brands retrieved successfully');
  });

  // @desc    Search brands
  // @route   GET /api/brands/search
  // @access  Public
  searchBrands = asyncHandler(async (req, res) => {
    const { q: searchTerm } = req.query;
    if (!searchTerm) {
      return ApiResponse.error(res, 'Search term is required', 400);
    }

    const result = await brandService.searchBrands(searchTerm, req.query);
    ApiResponse.paginated(res, result.brands, result.pagination, 'Search results retrieved successfully');
  });

  // @desc    Toggle brand featured status
  // @route   PUT /api/brands/:id/toggle-featured
  // @access  Private/Admin
  toggleFeatured = asyncHandler(async (req, res) => {
    const brand = await brandService.toggleFeatured(req.params.id, req.user._id);
    ApiResponse.success(res, brand, `Brand ${brand.isFeatured ? 'featured' : 'unfeatured'} successfully`);
  });

  // @desc    Get brand statistics
  // @route   GET /api/brands/:id/stats
  // @access  Private/Admin
  getBrandStats = asyncHandler(async (req, res) => {
    const stats = await brandService.getBrandStats(req.params.id);
    ApiResponse.success(res, stats, 'Brand statistics retrieved successfully');
  });
}

module.exports = new BrandController();
