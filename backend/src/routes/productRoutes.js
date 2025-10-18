const express = require('express');
const productController = require('../controllers/productController');
const { protect, authorize, optionalAuth } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
  productQueryValidator,
  createReviewValidator,
} = require('../validators/productValidators');

const router = express.Router();

// Public routes
router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/category/:slug', productController.getProductsByCategory);
router.get('/brand/:slug', productController.getProductsByBrand);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProduct);
router.get('/:id/reviews', productController.getProductReviews);

// Protected routes (authentication required)
router.use(protect);

router.post('/:id/reviews', productController.addProductReview);
router.post('/:id/view', productController.trackProductView);

// Admin only routes
router.use(authorize('admin', 'moderator'));

router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
