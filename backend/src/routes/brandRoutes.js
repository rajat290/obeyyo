const express = require('express');
const brandController = require('../controllers/brandController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', brandController.getBrands);
router.get('/featured', brandController.getFeaturedBrands);
router.get('/category/:categoryId', brandController.getBrandsByCategory);
router.get('/search', brandController.searchBrands);
router.get('/:id', brandController.getBrand);

// Admin only routes
router.use(protect);
router.use(authorize('admin', 'moderator'));

router.post('/', brandController.createBrand);
router.put('/:id', brandController.updateBrand);
router.put('/:id/toggle-featured', brandController.toggleFeatured);
router.delete('/:id', brandController.deleteBrand);
router.get('/:id/stats', brandController.getBrandStats);

module.exports = router;
