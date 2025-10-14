# Backend Development Guide - Obeyyo E-Commerce Platform

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Folder Structure](#folder-structure)
6. [Implementation Steps](#implementation-steps)
7. [Frontend Integration](#frontend-integration)
8. [Security Considerations](#security-considerations)

---

## Architecture Overview

### Layered Architecture
```
┌─────────────────────────────────────┐
│         Frontend (React)            │
└─────────────────┬───────────────────┘
                  │ HTTP/REST
┌─────────────────▼───────────────────┐
│         API Gateway/Routes          │
├─────────────────────────────────────┤
│         Controllers Layer           │
├─────────────────────────────────────┤
│         Services Layer              │
├─────────────────────────────────────┤
│         Models/Database Layer       │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│    Database (MongoDB/PostgreSQL)    │
└─────────────────────────────────────┘
```

---

## Technology Stack

### Core Technologies
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB (recommended) or PostgreSQL
- **ODM/ORM**: Mongoose (MongoDB) or Sequelize/Prisma (PostgreSQL)
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi or express-validator
- **File Upload**: Multer + Cloudinary/AWS S3
- **Payment**: Razorpay/Stripe
- **Email**: Nodemailer
- **Security**: helmet, cors, express-rate-limit

### Additional Tools
- **API Documentation**: Swagger/OpenAPI
- **Logging**: Winston or Morgan
- **Environment**: dotenv
- **Testing**: Jest + Supertest
- **Process Manager**: PM2 (production)

---

## Database Schema

### 1. Users Collection/Table
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String (URL),
  isEmailVerified: Boolean,
  isActive: Boolean,
  memberSince: Date,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. User Roles Collection/Table
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  role: String (enum: ['admin', 'moderator', 'user']),
  createdAt: Date
}
```

### 3. Addresses Collection/Table
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  type: String (enum: ['home', 'work', 'other']),
  fullName: String,
  phone: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
  isDefault: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Categories Collection/Table
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  slug: String (required, unique),
  description: String,
  image: String (URL),
  icon: String,
  parentCategory: ObjectId (ref: Categories, nullable),
  isActive: Boolean,
  displayOrder: Number,
  metaTitle: String,
  metaDescription: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Brands Collection/Table
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  slug: String (required, unique),
  logo: String (URL),
  description: String,
  isActive: Boolean,
  isFeatured: Boolean,
  displayOrder: Number,
  website: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Products Collection/Table
```javascript
{
  _id: ObjectId,
  name: String (required),
  slug: String (required, unique),
  description: String,
  shortDescription: String,
  categoryId: ObjectId (ref: Categories),
  brandId: ObjectId (ref: Brands),
  sku: String (unique),
  price: Number (required),
  originalPrice: Number,
  discount: Number,
  images: [String] (URLs),
  thumbnailImage: String (URL),
  stock: Number,
  isActive: Boolean,
  isFeatured: Boolean,
  isTrending: Boolean,
  isNewArrival: Boolean,
  isFlashSale: Boolean,
  flashSaleEndDate: Date,
  tags: [String],
  colors: [String],
  sizes: [String],
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  metaTitle: String,
  metaDescription: String,
  averageRating: Number,
  totalReviews: Number,
  totalSales: Number,
  viewCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Product Variants Collection/Table
```javascript
{
  _id: ObjectId,
  productId: ObjectId (ref: Products),
  sku: String (unique),
  color: String,
  size: String,
  price: Number,
  stock: Number,
  images: [String],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Reviews Collection/Table
```javascript
{
  _id: ObjectId,
  productId: ObjectId (ref: Products),
  userId: ObjectId (ref: Users),
  orderId: ObjectId (ref: Orders),
  rating: Number (1-5),
  title: String,
  comment: String,
  images: [String],
  isVerifiedPurchase: Boolean,
  helpfulCount: Number,
  isApproved: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 9. Cart Collection/Table
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, nullable for guest),
  sessionId: String (for guest users),
  items: [{
    productId: ObjectId (ref: Products),
    variantId: ObjectId (ref: ProductVariants, nullable),
    quantity: Number,
    price: Number,
    addedAt: Date
  }],
  totalItems: Number,
  subtotal: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 10. Wishlist Collection/Table
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  products: [ObjectId] (ref: Products),
  createdAt: Date,
  updatedAt: Date
}
```

### 11. Orders Collection/Table
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique),
  userId: ObjectId (ref: Users),
  items: [{
    productId: ObjectId (ref: Products),
    variantId: ObjectId (ref: ProductVariants, nullable),
    name: String,
    image: String,
    quantity: Number,
    price: Number,
    discount: Number,
    total: Number
  }],
  shippingAddress: {
    fullName: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  billingAddress: Object (same structure as shippingAddress),
  subtotal: Number,
  discount: Number,
  shippingCharges: Number,
  tax: Number,
  total: Number,
  paymentMethod: String (enum: ['cod', 'online', 'upi', 'card', 'wallet']),
  paymentStatus: String (enum: ['pending', 'paid', 'failed', 'refunded']),
  paymentId: String,
  orderStatus: String (enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned']),
  trackingNumber: String,
  courier: String,
  estimatedDelivery: Date,
  deliveredAt: Date,
  cancelledAt: Date,
  cancellationReason: String,
  returnedAt: Date,
  returnReason: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 12. Order Status History Collection/Table
```javascript
{
  _id: ObjectId,
  orderId: ObjectId (ref: Orders),
  status: String,
  description: String,
  updatedBy: ObjectId (ref: Users, nullable),
  createdAt: Date
}
```

### 13. Coupons Collection/Table
```javascript
{
  _id: ObjectId,
  code: String (unique, required),
  description: String,
  type: String (enum: ['percentage', 'fixed']),
  value: Number,
  minOrderValue: Number,
  maxDiscount: Number,
  usageLimit: Number,
  usedCount: Number,
  validFrom: Date,
  validUntil: Date,
  isActive: Boolean,
  applicableCategories: [ObjectId] (ref: Categories),
  applicableProducts: [ObjectId] (ref: Products),
  createdAt: Date,
  updatedAt: Date
}
```

### 14. Banners Collection/Table
```javascript
{
  _id: ObjectId,
  title: String,
  subtitle: String,
  image: String (URL),
  mobileImage: String (URL),
  linkType: String (enum: ['product', 'category', 'brand', 'url']),
  linkValue: String,
  position: String (enum: ['hero', 'section', 'sidebar']),
  displayOrder: Number,
  isActive: Boolean,
  validFrom: Date,
  validUntil: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 15. Notifications Collection/Table
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  type: String (enum: ['order', 'promotion', 'system']),
  title: String,
  message: String,
  link: String,
  isRead: Boolean,
  createdAt: Date
}
```

### 16. Site Settings Collection/Table
```javascript
{
  _id: ObjectId,
  key: String (unique),
  value: Mixed,
  type: String (enum: ['string', 'number', 'boolean', 'json']),
  description: String,
  updatedAt: Date
}
```

---

## API Endpoints

### Authentication & User Management

#### 1. Auth Routes (`/api/auth`)
```
POST   /api/auth/register          - User registration
POST   /api/auth/login             - User login
POST   /api/auth/logout            - User logout
POST   /api/auth/refresh-token     - Refresh access token
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password with token
POST   /api/auth/verify-email      - Verify email with token
POST   /api/auth/resend-verification - Resend verification email
```

#### 2. User Routes (`/api/users`)
```
GET    /api/users/profile          - Get current user profile
PUT    /api/users/profile          - Update user profile
PUT    /api/users/password         - Change password
DELETE /api/users/account          - Delete user account
GET    /api/users/addresses        - Get user addresses
POST   /api/users/addresses        - Add new address
PUT    /api/users/addresses/:id    - Update address
DELETE /api/users/addresses/:id    - Delete address
PUT    /api/users/addresses/:id/default - Set default address
```

### Product Management

#### 3. Category Routes (`/api/categories`)
```
GET    /api/categories             - Get all categories (public)
GET    /api/categories/:slug       - Get category by slug
GET    /api/categories/:id/products - Get products by category
POST   /api/categories             - Create category (admin)
PUT    /api/categories/:id         - Update category (admin)
DELETE /api/categories/:id         - Delete category (admin)
```

#### 4. Brand Routes (`/api/brands`)
```
GET    /api/brands                 - Get all brands (public)
GET    /api/brands/:slug           - Get brand by slug
GET    /api/brands/:id/products    - Get products by brand
POST   /api/brands                 - Create brand (admin)
PUT    /api/brands/:id             - Update brand (admin)
DELETE /api/brands/:id             - Delete brand (admin)
```

#### 5. Product Routes (`/api/products`)
```
GET    /api/products               - Get all products (with filters, pagination)
GET    /api/products/featured      - Get featured products
GET    /api/products/trending      - Get trending products
GET    /api/products/new-arrivals  - Get new arrivals
GET    /api/products/flash-sale    - Get flash sale products
GET    /api/products/search        - Search products
GET    /api/products/:slug         - Get product by slug
GET    /api/products/:id/related   - Get related products
GET    /api/products/:id/variants  - Get product variants
POST   /api/products               - Create product (admin)
PUT    /api/products/:id           - Update product (admin)
DELETE /api/products/:id           - Delete product (admin)
PUT    /api/products/:id/stock     - Update stock (admin)
```

#### 6. Review Routes (`/api/reviews`)
```
GET    /api/reviews/product/:productId - Get product reviews
POST   /api/reviews                    - Create review (authenticated)
PUT    /api/reviews/:id                - Update review (owner)
DELETE /api/reviews/:id                - Delete review (owner/admin)
POST   /api/reviews/:id/helpful        - Mark review as helpful
```

### Shopping & Orders

#### 7. Cart Routes (`/api/cart`)
```
GET    /api/cart                   - Get user cart
POST   /api/cart/items             - Add item to cart
PUT    /api/cart/items/:id         - Update cart item quantity
DELETE /api/cart/items/:id         - Remove item from cart
DELETE /api/cart                   - Clear cart
POST   /api/cart/sync              - Sync guest cart with user cart
```

#### 8. Wishlist Routes (`/api/wishlist`)
```
GET    /api/wishlist               - Get user wishlist
POST   /api/wishlist               - Add product to wishlist
DELETE /api/wishlist/:productId    - Remove product from wishlist
DELETE /api/wishlist               - Clear wishlist
```

#### 9. Order Routes (`/api/orders`)
```
GET    /api/orders                 - Get user orders
GET    /api/orders/:id             - Get order details
POST   /api/orders                 - Create order (checkout)
POST   /api/orders/:id/cancel      - Cancel order
POST   /api/orders/:id/return      - Request return
GET    /api/orders/:id/track       - Track order
GET    /api/orders/:id/invoice     - Download invoice
```

#### 10. Coupon Routes (`/api/coupons`)
```
POST   /api/coupons/validate       - Validate coupon code
GET    /api/coupons/available      - Get available coupons for user
POST   /api/coupons                - Create coupon (admin)
PUT    /api/coupons/:id            - Update coupon (admin)
DELETE /api/coupons/:id            - Delete coupon (admin)
```

### Payment

#### 11. Payment Routes (`/api/payments`)
```
POST   /api/payments/create-order  - Create payment order
POST   /api/payments/verify        - Verify payment
POST   /api/payments/webhook       - Payment gateway webhook
GET    /api/payments/:id/status    - Get payment status
```

### Admin Panel

#### 12. Admin Dashboard Routes (`/api/admin`)
```
GET    /api/admin/dashboard        - Get dashboard stats
GET    /api/admin/analytics        - Get analytics data
GET    /api/admin/users            - Get all users
PUT    /api/admin/users/:id        - Update user
DELETE /api/admin/users/:id        - Delete user
GET    /api/admin/orders           - Get all orders
PUT    /api/admin/orders/:id/status - Update order status
GET    /api/admin/products/low-stock - Get low stock products
```

#### 13. Banner Management Routes (`/api/admin/banners`)
```
GET    /api/admin/banners          - Get all banners
POST   /api/admin/banners          - Create banner
PUT    /api/admin/banners/:id      - Update banner
DELETE /api/admin/banners/:id      - Delete banner
```

#### 14. Site Settings Routes (`/api/admin/settings`)
```
GET    /api/admin/settings         - Get all settings
PUT    /api/admin/settings         - Update settings
```

### Other Routes

#### 15. Notification Routes (`/api/notifications`)
```
GET    /api/notifications          - Get user notifications
PUT    /api/notifications/:id/read - Mark notification as read
PUT    /api/notifications/read-all - Mark all as read
DELETE /api/notifications/:id      - Delete notification
```

#### 16. File Upload Routes (`/api/upload`)
```
POST   /api/upload/image           - Upload single image
POST   /api/upload/images          - Upload multiple images
DELETE /api/upload/:id             - Delete uploaded file
```

#### 17. Public Routes (`/api/public`)
```
GET    /api/public/banners         - Get active banners
GET    /api/public/settings        - Get public settings
POST   /api/public/contact         - Submit contact form
POST   /api/public/newsletter      - Subscribe to newsletter
```

---

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js           # Database connection
│   │   ├── cloudinary.js         # Cloudinary config
│   │   ├── razorpay.js           # Payment gateway config
│   │   └── email.js              # Email service config
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── UserRole.js
│   │   ├── Address.js
│   │   ├── Category.js
│   │   ├── Brand.js
│   │   ├── Product.js
│   │   ├── ProductVariant.js
│   │   ├── Review.js
│   │   ├── Cart.js
│   │   ├── Wishlist.js
│   │   ├── Order.js
│   │   ├── OrderStatusHistory.js
│   │   ├── Coupon.js
│   │   ├── Banner.js
│   │   ├── Notification.js
│   │   └── SiteSetting.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── categoryController.js
│   │   ├── brandController.js
│   │   ├── productController.js
│   │   ├── reviewController.js
│   │   ├── cartController.js
│   │   ├── wishlistController.js
│   │   ├── orderController.js
│   │   ├── couponController.js
│   │   ├── paymentController.js
│   │   ├── adminController.js
│   │   ├── bannerController.js
│   │   ├── notificationController.js
│   │   └── uploadController.js
│   │
│   ├── services/
│   │   ├── authService.js        # Business logic for auth
│   │   ├── emailService.js       # Email sending
│   │   ├── smsService.js         # SMS sending
│   │   ├── paymentService.js     # Payment processing
│   │   ├── orderService.js       # Order processing
│   │   ├── notificationService.js
│   │   └── fileService.js        # File upload/delete
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── brandRoutes.js
│   │   ├── productRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── couponRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── publicRoutes.js
│   │
│   ├── middlewares/
│   │   ├── auth.js               # JWT authentication
│   │   ├── roleCheck.js          # Role-based access
│   │   ├── validation.js         # Request validation
│   │   ├── errorHandler.js       # Global error handler
│   │   ├── rateLimiter.js        # Rate limiting
│   │   ├── upload.js             # Multer config
│   │   └── logger.js             # Request logger
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── userValidator.js
│   │   ├── productValidator.js
│   │   ├── orderValidator.js
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── apiResponse.js        # Standard API responses
│   │   ├── apiError.js           # Custom error class
│   │   ├── asyncHandler.js       # Async error wrapper
│   │   ├── generateToken.js      # JWT token generation
│   │   ├── pagination.js         # Pagination helper
│   │   ├── fileUpload.js         # File upload helper
│   │   └── constants.js          # App constants
│   │
│   ├── seeders/                  # Database seeders
│   │   ├── categorySeeder.js
│   │   ├── brandSeeder.js
│   │   └── productSeeder.js
│   │
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server entry point
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── uploads/                      # Temp upload directory
├── logs/                         # Application logs
├── .env.example
├── .env
├── .gitignore
├── package.json
├── README.md
└── ecosystem.config.js           # PM2 config
```

---

## Implementation Steps

### Phase 1: Project Setup (Day 1)

#### Step 1: Initialize Project
```bash
mkdir obeyyo-backend
cd obeyyo-backend
npm init -y
```

#### Step 2: Install Dependencies
```bash
# Core dependencies
npm install express mongoose dotenv cors helmet
npm install jsonwebtoken bcryptjs cookie-parser

# Validation & Security
npm install joi express-validator express-rate-limit express-mongo-sanitize xss-clean hpp

# File Upload
npm install multer cloudinary

# Payment
npm install razorpay # or stripe

# Email
npm install nodemailer

# Utilities
npm install morgan winston uuid slugify

# Development dependencies
npm install -D nodemon jest supertest eslint prettier
```

#### Step 3: Create Basic Structure
```bash
mkdir -p src/{config,models,controllers,services,routes,middlewares,validators,utils,seeders}
mkdir -p tests/{unit,integration}
mkdir -p logs uploads
```

#### Step 4: Setup Environment Variables
Create `.env` file:
```env
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/obeyyo
# OR for PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/obeyyo

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email (Gmail/SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Phase 2: Database Setup (Day 1-2)

#### Step 1: Database Connection (`src/config/database.js`)
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

#### Step 2: Create All Models
Start with the User model (`src/models/User.js`):
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
  memberSince: {
    type: Date,
    default: Date.now,
  },
  lastLogin: Date,
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

Create similar models for all other entities (Category, Product, Order, etc.)

### Phase 3: Middleware Setup (Day 2)

#### Authentication Middleware (`src/middlewares/auth.js`)
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');
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
    const UserRole = require('../models/UserRole');
    const userRoles = await UserRole.find({ userId: req.user._id });
    
    const hasRole = userRoles.some(ur => roles.includes(ur.role));
    
    if (!hasRole) {
      return next(new ApiError(`User role is not authorized to access this route`, 403));
    }
    
    next();
  });
};
```

#### Error Handler (`src/middlewares/errorHandler.js`)
```javascript
const ApiError = require('../utils/apiError');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ApiError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ApiError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ApiError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
```

### Phase 4: Controllers & Services (Day 3-7)

#### Example: Auth Controller (`src/controllers/authController.js`)
```javascript
const authService = require('../services/authService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  
  ApiResponse.success(res, result, 'User registered successfully', 201);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  
  // Set cookie
  res.cookie('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  
  ApiResponse.success(res, result, 'Login successful');
});

exports.logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  
  ApiResponse.success(res, null, 'Logout successful');
});
```

#### Example: Auth Service (`src/services/authService.js`)
```javascript
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const ApiError = require('../utils/apiError');
const { generateToken } = require('../utils/generateToken');
const emailService = require('./emailService');

exports.registerUser = async (userData) => {
  const { email, password, firstName, lastName } = userData;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError('Email already registered', 400);
  }

  // Create user
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
  });

  // Create default user role
  await UserRole.create({
    userId: user._id,
    role: 'user',
  });

  // Generate verification token
  const verificationToken = generateToken(user._id, '1d');

  // Send verification email
  await emailService.sendVerificationEmail(email, verificationToken);

  // Generate JWT
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token,
  };
};

exports.loginUser = async (email, password) => {
  // Check for user
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Update last login
  user.lastLogin = Date.now();
  await user.save();

  // Generate token
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token,
  };
};
```

Repeat this pattern for all controllers and services.

### Phase 5: Routes Setup (Day 7-8)

#### Example: Auth Routes (`src/routes/authRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middlewares/validation');
const authValidator = require('../validators/authValidator');

router.post('/register', validate(authValidator.register), authController.register);
router.post('/login', validate(authValidator.login), authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', validate(authValidator.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidator.resetPassword), authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
```

### Phase 6: Main App Setup (Day 8)

#### Express App (`src/app.js`)
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middlewares/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

module.exports = app;
```

#### Server Entry Point (`src/server.js`)
```javascript
const app = require('./app');
const connectDB = require('./config/database');

// Load env vars
require('dotenv').config();

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
```

#### Package.json Scripts
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --watchAll --verbose",
    "seed": "node src/seeders/index.js"
  }
}
```

### Phase 7: Testing (Day 9)

Create test files in `tests/` directory for each endpoint.

### Phase 8: Deployment Preparation (Day 10)

1. Setup PM2 configuration (`ecosystem.config.js`)
2. Create deployment scripts
3. Setup environment variables for production
4. Configure MongoDB Atlas or PostgreSQL hosting
5. Setup Cloudinary for image hosting
6. Configure payment gateway in production mode

---

## Frontend Integration

### Step 1: Create API Client (`src/lib/api.ts` in frontend)

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
```

### Step 2: Create API Service Files

#### Auth Service (`src/services/authService.ts`)
```typescript
import api from '@/lib/api';

export const authService = {
  register: async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    return api.post('/auth/register', data);
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },

  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    return api.get('/users/profile');
  },
};
```

#### Product Service (`src/services/productService.ts`)
```typescript
import api from '@/lib/api';

export const productService = {
  getAllProducts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) => {
    return api.get('/products', { params });
  },

  getProductBySlug: async (slug: string) => {
    return api.get(`/products/${slug}`);
  },

  getFeaturedProducts: async () => {
    return api.get('/products/featured');
  },

  getTrendingProducts: async () => {
    return api.get('/products/trending');
  },

  searchProducts: async (query: string) => {
    return api.get('/products/search', { params: { q: query } });
  },
};
```

#### Cart Service (`src/services/cartService.ts`)
```typescript
import api from '@/lib/api';

export const cartService = {
  getCart: async () => {
    return api.get('/cart');
  },

  addToCart: async (productId: string, quantity: number, variantId?: string) => {
    return api.post('/cart/items', { productId, quantity, variantId });
  },

  updateCartItem: async (itemId: string, quantity: number) => {
    return api.put(`/cart/items/${itemId}`, { quantity });
  },

  removeFromCart: async (itemId: string) => {
    return api.delete(`/cart/items/${itemId}`);
  },

  clearCart: async () => {
    return api.delete('/cart');
  },
};
```

#### Order Service (`src/services/orderService.ts`)
```typescript
import api from '@/lib/api';

export const orderService = {
  createOrder: async (orderData: any) => {
    return api.post('/orders', orderData);
  },

  getOrders: async () => {
    return api.get('/orders');
  },

  getOrderById: async (orderId: string) => {
    return api.get(`/orders/${orderId}`);
  },

  cancelOrder: async (orderId: string, reason: string) => {
    return api.post(`/orders/${orderId}/cancel`, { reason });
  },

  trackOrder: async (orderId: string) => {
    return api.get(`/orders/${orderId}/track`);
  },
};
```

### Step 3: Update Components to Use API

#### Example: Update ProductCard.tsx
```typescript
import { cartService } from '@/services/cartService';
import { useToast } from '@/hooks/use-toast';

const ProductCard = ({ product }) => {
  const { toast } = useToast();

  const handleAddToCart = async () => {
    try {
      await cartService.addToCart(product._id, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  // ... rest of component
};
```

### Step 4: Environment Variables

Create `.env` file in frontend:
```env
VITE_API_URL=http://localhost:5000/api
# For production
# VITE_API_URL=https://api.obeyyo.com/api
```

---

## Security Considerations

### 1. Authentication & Authorization
- ✅ Use JWT with short expiration times
- ✅ Implement refresh token mechanism
- ✅ Store tokens in httpOnly cookies
- ✅ Implement role-based access control (RBAC)
- ✅ Never store roles in client-side storage

### 2. Input Validation
- ✅ Validate all inputs on both client and server
- ✅ Use Joi or express-validator
- ✅ Sanitize inputs to prevent XSS
- ✅ Use parameterized queries to prevent SQL injection
- ✅ Implement rate limiting on sensitive endpoints

### 3. Data Protection
- ✅ Hash passwords with bcrypt (salt rounds >= 10)
- ✅ Never log sensitive information
- ✅ Use HTTPS in production
- ✅ Implement CORS properly
- ✅ Use helmet.js for security headers

### 4. Payment Security
- ✅ Never store card details
- ✅ Use payment gateway webhooks
- ✅ Verify payment signatures
- ✅ Implement idempotency for payments
- ✅ Log all payment transactions

### 5. File Upload Security
- ✅ Validate file types
- ✅ Limit file sizes
- ✅ Sanitize file names
- ✅ Use cloud storage (Cloudinary/S3)
- ✅ Implement virus scanning for uploads

### 6. API Security
- ✅ Implement rate limiting
- ✅ Use API versioning
- ✅ Log all API requests
- ✅ Implement request throttling
- ✅ Use CORS whitelist

---

## Development Timeline

### Week 1: Foundation
- Day 1-2: Project setup, database schema, models
- Day 3-4: Authentication & user management
- Day 5-6: Product & category management
- Day 7: Testing & bug fixes

### Week 2: Shopping Features
- Day 8-9: Cart & wishlist functionality
- Day 10-11: Order management
- Day 12-13: Payment integration
- Day 14: Testing & bug fixes

### Week 3: Admin & Advanced Features
- Day 15-16: Admin dashboard & management
- Day 17-18: Reviews, notifications, coupons
- Day 19-20: File upload, email service
- Day 21: Testing & optimization

### Week 4: Integration & Deployment
- Day 22-24: Frontend integration
- Day 25-26: End-to-end testing
- Day 27-28: Deployment & monitoring
- Day 29-30: Documentation & handover

---

## Additional Resources

### Recommended Packages
- **Logging**: `winston`, `morgan`
- **Validation**: `joi`, `express-validator`
- **Testing**: `jest`, `supertest`, `faker`
- **Documentation**: `swagger-jsdoc`, `swagger-ui-express`
- **Monitoring**: `pm2`, `newrelic`
- **Caching**: `redis`, `node-cache`

### Best Practices
1. Follow RESTful conventions
2. Use proper HTTP status codes
3. Implement comprehensive error handling
4. Write unit and integration tests
5. Document all APIs
6. Use version control (Git)
7. Follow coding standards (ESLint, Prettier)
8. Implement CI/CD pipelines
9. Monitor application performance
10. Regular security audits

---

## Next Steps

1. **Start with Phase 1**: Set up the project structure
2. **Create Core Models**: Focus on User, Product, Order first
3. **Implement Auth**: Get authentication working end-to-end
4. **Build Incrementally**: Add features one at a time
5. **Test Continuously**: Write tests as you build
6. **Document Everything**: Keep README and API docs updated

---

This guide provides a complete roadmap for building your backend. Start with the basics and build incrementally. Feel free to adjust the timeline and priorities based on your specific needs.

Good luck with your development! 🚀
