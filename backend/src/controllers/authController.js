const authService = require('../services/authService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

class AuthController {
  // @desc    Register user
  // @route   POST /api/auth/register
  // @access  Public
  register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    ApiResponse.success(res, result, 'User registered successfully', 201);
  });

  // @desc    Login user
  // @route   POST /api/auth/login
  // @access  Public
  login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body.email, req.body.password);
    ApiResponse.success(res, result, 'Login successful');
  });

  // @desc    Get current user profile
  // @route   GET /api/auth/profile
  // @access  Private
  getProfile = asyncHandler(async (req, res) => {
    const user = await authService.getProfile(req.user._id);
    ApiResponse.success(res, user, 'Profile retrieved successfully');
  });

  // @desc    Update user profile
  // @route   PUT /api/auth/profile
  // @access  Private
  updateProfile = asyncHandler(async (req, res) => {
    const user = await authService.updateProfile(req.user._id, req.body);
    ApiResponse.success(res, user, 'Profile updated successfully');
  });

  // @desc    Change password
  // @route   PUT /api/auth/change-password
  // @access  Private
  changePassword = asyncHandler(async (req, res) => {
    const result = await authService.changePassword(
      req.user._id,
      req.body.currentPassword,
      req.body.newPassword
    );
    ApiResponse.success(res, result, 'Password changed successfully');
  });

  // @desc    Forgot password
  // @route   POST /api/auth/forgot-password
  // @access  Public
  forgotPassword = asyncHandler(async (req, res) => {
    const resetToken = await authService.forgotPassword(req.body.email);
    // In production, send email with reset token
    // For now, return token for testing
    ApiResponse.success(res, { resetToken }, 'Password reset token generated');
  });

  // @desc    Reset password
  // @route   POST /api/auth/reset-password
  // @access  Public
  resetPassword = asyncHandler(async (req, res) => {
    const result = await authService.resetPassword(req.params.token, req.body.password);
    ApiResponse.success(res, result, 'Password reset successfully');
  });

  // @desc    Verify email
  // @route   POST /api/auth/verify-email
  // @access  Public
  verifyEmail = asyncHandler(async (req, res) => {
    const result = await authService.verifyEmail(req.params.token);
    ApiResponse.success(res, result, 'Email verified successfully');
  });

  // @desc    Logout user
  // @route   POST /api/auth/logout
  // @access  Private
  logout = asyncHandler(async (req, res) => {
    // In a stateless JWT setup, logout is handled on the client side
    // by removing the token from storage
    ApiResponse.success(res, null, 'Logged out successfully');
  });
}

module.exports = new AuthController();
