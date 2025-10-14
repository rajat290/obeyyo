const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ApiError('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return next(new ApiError('User not found', 404));
    }
    
    next();
  } catch (error) {
    return next(new ApiError('Not authorized to access this route', 401));
  }
});

exports.authorize = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    const userRoles = await UserRole.find({ userId: req.user._id });
    
    const hasRole = userRoles.some(ur => roles.includes(ur.role));
    
    if (!hasRole) {
      return next(new ApiError(`User role is not authorized to access this route`, 403));
    }
    
    next();
  });
};

exports.optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } catch (error) {
      // Ignore invalid tokens for optional auth
    }
  }

  next();
});
