const express = require('express');
const categoryController = require('../controllers/categoryController');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
  updateOrderValidator,
} = require('../validators/categoryValidators');

const router = express.Router();

// Public routes
router.get('/', categoryController.getCategories);
router.get('/navigation', categoryController.getNavigationCategories);
router.get('/:id', categoryController.getCategory);

// Admin only routes
router.use(protect);
router.use(authorize('admin', 'moderator'));

router.post('/', validate(createCategoryValidator), categoryController.createCategory);
router.put('/:id', validate(updateCategoryValidator), categoryController.updateCategory);
router.put('/:id/order', validate(updateOrderValidator), categoryController.updateCategoryOrder);
router.delete('/:id', validate(categoryIdValidator), categoryController.deleteCategory);
router.get('/admin/tree', categoryController.getCategoryTree);

module.exports = router;
