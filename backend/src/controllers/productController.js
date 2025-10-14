const productService = require('../services/productService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

class ProductController {
  // @desc    Create new product
  // @route   POST /api/products
  // @access  Private/Admin
  createProduct = asyncHandler(async (req, res) => {
    const product = await productService.createProduct(req.body, req.user._id);
    ApiResponse.success(res, product, 'Product created successfully', 201);
  });

  // @desc    Get all products
  // @route   GET /api/products
  // @access  Public
  getProducts = asyncHandler(async (req, res) => {
    const result = await productService.getProducts(req.query);
    ApiResponse.paginated(res, result.products, result.pagination, 'Products retrieved successfully');
  });

  // @desc    Get single product
  // @route   GET /api/products/:id
  // @access  Public
  getProduct = asyncHandler(async (req, res) => {
    const product = await productService.getProduct(req.params.id);
    ApiResponse.success(res, product, 'Product retrieved successfully');
  });

  // @desc    Update product
  // @route   PUT /api/products/:id
  // @access  Private/Admin
  updateProduct = asyncHandler(async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body, req.user._id);
    ApiResponse.success(res, product, 'Product updated successfully');
  });

  // @desc    Delete product
  // @route   DELETE /api/products/:id
  // @access  Private/Admin
  deleteProduct = asyncHandler(async (req, res) => {
    const result = await productService.deleteProduct(req.params.id, req.user._id);
    ApiResponse.success(res, result, 'Product deleted successfully');
  });

  // @desc    Get featured products
  // @route   GET /api/products/featured
  // @access  Public
  getFeaturedProducts = asyncHandler(async (req, res) => {
    const products = await productService.getFeaturedProducts(req.query.limit);
    ApiResponse.success(res, products, 'Featured products retrieved successfully');
  });

  // @desc    Get products by category
  // @route   GET /api/products/category/:slug
  // @access  Public
  getProductsByCategory = asyncHandler(async (req, res) => {
    const result = await productService.getProductsByCategory(req.params.slug, req.query);
    ApiResponse.paginated(res, result.products, result.pagination, 'Products retrieved successfully', 200, { category: result.category });
  });

  // @desc    Get products by brand
  // @route   GET /api/products/brand/:slug
  // @access  Public
  getProductsByBrand = asyncHandler(async (req, res) => {
    const result = await productService.getProductsByBrand(req.params.slug, req.query);
    ApiResponse.paginated(res, result.products, result.pagination, 'Products retrieved successfully', 200, { brand: result.brand });
  });

  // @desc    Search products
  // @route   GET /api/products/search
  // @access  Public
  searchProducts = asyncHandler(async (req, res) => {
    const { q: searchTerm } = req.query;
    if (!searchTerm) {
      return ApiResponse.error(res, 'Search term is required', 400);
    }

    const result = await productService.searchProducts(searchTerm, req.query);
    ApiResponse.paginated(res, result.products, result.pagination, 'Search results retrieved successfully');
  });

  // @desc    Add product review
  // @route   POST /api/products/:id/reviews
  // @access  Private
  addProductReview = asyncHandler(async (req, res) => {
    const review = await productService.addProductReview(req.params.id, req.user._id, req.body);
    ApiResponse.success(res, review, 'Review added successfully', 201);
  });

  // @desc    Get product reviews
  // @route   GET /api/products/:id/reviews
  // @access  Public
  getProductReviews = asyncHandler(async (req, res) => {
    const result = await productService.getProductReviews(req.params.id, req.query);
    ApiResponse.paginated(res, result.reviews, result.pagination, 'Reviews retrieved successfully');
  });

  // @desc    Track product view
  // @route   POST /api/products/:id/view
  // @access  Public
  trackProductView = asyncHandler(async (req, res) => {
    // This is handled in the getProduct service method
    // Just return success for tracking endpoint
    ApiResponse.success(res, null, 'View tracked successfully');
  });
}

module.exports = new ProductController();
