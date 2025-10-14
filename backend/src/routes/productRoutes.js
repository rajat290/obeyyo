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
router.get('/', validate(productQueryValidator), productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/category/:slug', validate(productQueryValidator), productController.getProductsByCategory);
router.get('/brand/:slug', validate(productQueryValidator), productController.getProductsByBrand);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProduct);
router.get('/:id/reviews', validate(productQueryValidator), productController.getProductReviews);

// Protected routes (authentication required)
router.use(protect);

router.post('/:id/reviews', validate(createReviewValidator), productController.addProductReview);
router.post('/:id/view', productController.trackProductView);

// Admin only routes
router.use(authorize('admin', 'moderator'));

router.post('/', validate(createProductValidator), productController.createProduct);
router.put('/:id', validate(updateProductValidator), productController.updateProduct);
router.delete('/:id', validate(productIdValidator), productController.deleteProduct);

module.exports = router;
