const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const { authLimiter, passwordResetLimiter } = require('../middlewares/rateLimiter');
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
} = require('../validators/authValidators');

const router = express.Router();

// Public routes
router.post('/register', authLimiter, validate(registerValidator), authController.register);
router.post('/login', authLimiter, validate(loginValidator), authController.login);
router.post('/forgot-password', passwordResetLimiter, validate(forgotPasswordValidator), authController.forgotPassword);
router.post('/reset-password/:token', validate(resetPasswordValidator), authController.resetPassword);
router.post('/verify-email/:token', authController.verifyEmail);

// Protected routes
router.use(protect); // All routes below require authentication

router.get('/profile', authController.getProfile);
router.put('/profile', validate(updateProfileValidator), authController.updateProfile);
router.put('/change-password', validate(changePasswordValidator), authController.changePassword);
router.post('/logout', authController.logout);

module.exports = router;
