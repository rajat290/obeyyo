const express = require('express');
const brandController = require('../controllers/brandController');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
  createBrandValidator,
  updateBrandValidator,
  brandIdValidator,
  brandQueryValidator,
} = require('../validators/brandValidators');

const router = express.Router();

// Public routes
router.get('/', validate(brandQueryValidator), brandController.getBrands);
router.get('/featured', brandController.getFeaturedBrands);
router.get('/category/:categoryId', brandController.getBrandsByCategory);
router.get('/search', brandController.searchBrands);
router.get('/:id', brandController.getBrand);

// Admin only routes
router.use(protect);
router.use(authorize('admin', 'moderator'));

router.post('/', validate(createBrandValidator), brandController.createBrand);
router.put('/:id', validate(updateBrandValidator), brandController.updateBrand);
router.put('/:id/toggle-featured', validate(brandIdValidator), brandController.toggleFeatured);
router.delete('/:id', validate(brandIdValidator), brandController.deleteBrand);
router.get('/:id/stats', validate(brandIdValidator), brandController.getBrandStats);

module.exports = router;
