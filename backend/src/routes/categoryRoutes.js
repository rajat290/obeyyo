const express = require('express');
const categoryController = require('../controllers/categoryController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', categoryController.getCategories);
router.get('/navigation', categoryController.getNavigationCategories);
router.get('/:id', categoryController.getCategory);

// Admin only routes
router.use(protect);
router.use(authorize('admin', 'moderator'));

router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.put('/:id/order', categoryController.updateCategoryOrder);
router.delete('/:id', categoryController.deleteCategory);
router.get('/admin/tree', categoryController.getCategoryTree);

module.exports = router;
