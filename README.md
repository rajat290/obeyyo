# 🛍️ Obeyyo - Modern E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-47A248.svg)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-000000.svg)](https://expressjs.com/)

A full-stack e-commerce platform built with modern technologies, featuring a responsive React frontend and a robust Node.js/Express backend with MongoDB.

![Obeyyo Preview](./public/lovable-uploads/preview.png)

## ✨ Features

### 🛒 Core E-Commerce Features
- **Product Catalog**: Browse products by categories, brands, and filters
- **Shopping Cart**: Add, remove, and manage cart items with real-time updates
- **Wishlist**: Save favorite products for later
- **User Authentication**: Secure login/signup with JWT tokens
- **Order Management**: Complete order lifecycle from placement to delivery
- **Payment Integration**: Razorpay payment gateway support
- **Product Reviews**: Rate and review products
- **Search & Filters**: Advanced product search and filtering

### 👨‍💼 Admin Panel
- **Dashboard Analytics**: Sales, orders, and user statistics
- **Product Management**: CRUD operations for products
- **Category Management**: Organize products by categories
- **Brand Management**: Manage brand information
- **Order Management**: Process and track orders
- **User Management**: Admin user accounts
- **Banner Management**: Homepage promotional banners

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with perfect mobile experience
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Fast Loading**: Optimized performance with lazy loading
- **Offline Support**: Basic functionality works offline
- **Real-time Updates**: Live cart and wishlist counts

### 🔧 Technical Features
- **Type Safety**: Full TypeScript implementation
- **API Documentation**: Comprehensive REST API with Swagger
- **Security**: JWT authentication, input validation, rate limiting
- **File Upload**: Cloudinary integration for image management
- **Email Notifications**: Automated email service
- **Error Handling**: Comprehensive error management
- **Testing Ready**: Jest and Supertest setup

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 7.0+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/obeyyo.git
   cd obeyyo
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm run dev
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
obeyyo/
├── backend/                          # Node.js/Express Backend
│   ├── src/
│   │   ├── config/                   # Database & service configs
│   │   ├── controllers/              # Route controllers
│   │   ├── models/                   # MongoDB models
│   │   ├── routes/                   # API routes
│   │   ├── services/                 # Business logic services
│   │   ├── middlewares/              # Custom middlewares
│   │   ├── validators/               # Input validation
│   │   ├── utils/                    # Helper functions
│   │   └── app.js                    # Express app setup
│   ├── tests/                        # Unit & integration tests
│   └── package.json
├── src/                              # React Frontend
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                       # Shadcn/UI components
│   │   ├── home/                     # Homepage sections
│   │   ├── admin/                    # Admin components
│   │   └── *.tsx                     # Shared components
│   ├── pages/                        # Page components
│   ├── contexts/                     # React contexts
│   ├── hooks/                        # Custom hooks
│   ├── lib/                          # Utilities & configs
│   └── App.tsx
├── public/                           # Static assets
└── package.json
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful and accessible UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling and validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Joi** - Input validation
- **Multer** - File upload handling
- **Cloudinary** - Image hosting and management
- **Razorpay** - Payment gateway
- **Nodemailer** - Email service

### DevOps & Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Supertest** - API testing
- **Winston** - Logging
- **PM2** - Process management (production)

## 🔧 Configuration

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Backend (.env)**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/obeyyo
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Obeyyo
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

## 📚 API Documentation

The backend provides a comprehensive REST API with the following main endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart & Wishlist
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/products` - Manage products
- `GET /api/admin/orders` - Manage orders
- `GET /api/admin/users` - Manage users

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests (if implemented)
npm test
```

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting service
```

### Production Checklist
- [ ] Set NODE_ENV=production
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure cloud storage for images
- [ ] Set up payment gateway
- [ ] Configure email service
- [ ] Set up monitoring and logging
- [ ] Configure reverse proxy (nginx)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - Beautifully designed components
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Express.js](https://expressjs.com/) - Web framework for Node.js

## 📞 Support

For support, email support@obeyyo.com or join our Discord community.

## 🔄 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] AI-powered product recommendations
- [ ] Social commerce features
- [ ] Advanced inventory management
- [ ] Loyalty program
- [ ] Live chat support

---

**Made with ❤️ by the Obeyyo Team**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/obeyyo.svg?style=social&label=Star)](https://github.com/yourusername/obeyyo)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/obeyyo.svg?style=social&label=Fork)](https://github.com/yourusername/obeyyo)






# Frontend & Backend Integration Guide - Obeyyo E-Commerce Platform

## Table of Contents
1. [API Endpoints with Postman Testing Syntax](#api-endpoints-with-postman-testing-syntax)
2. [Frontend File-wise API Integration](#frontend-file-wise-api-integration)
3. [Backend File Responsibility Mapping](#backend-file-responsibility-mapping)

---

## API Endpoints with Postman Testing Syntax

### Base URL
```
http://localhost:5000/api
```

### Authentication Headers
For authenticated requests, include:
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

---

### 1. Authentication & User Management

#### 1.1 Register User
**Method:** POST
**Endpoint:** `/auth/register`
**Backend File:** `backend/src/controllers/authController.js`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91-9876543210"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token_here"
  }
}
```

#### 1.2 Login User
**Method:** POST
**Endpoint:** `/auth/login`
**Backend File:** `backend/src/controllers/authController.js`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token_here"
  }
}
```

#### 1.3 Get User Profile
**Method:** GET
**Endpoint:** `/users/profile`
**Backend File:** `backend/src/controllers/userController.js`
**Headers:** Authorization required
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+91-9876543210",
      "avatar": "image_url"
    }
  }
}
```

#### 1.4 Update User Profile
**Method:** PUT
**Endpoint:** `/users/profile`
**Backend File:** `backend/src/controllers/userController.js`
**Headers:** Authorization required
**Request Body:**
```json
{
  "firstName": "John Updated",
  "lastName": "Doe Updated",
  "phone": "+91-9876543210"
}
```

#### 1.5 Get User Addresses
**Method:** GET
**Endpoint:** `/users/addresses`
**Backend File:** `backend/src/controllers/userController.js`
**Headers:** Authorization required
**Response:**
```json
{
  "success": true,
  "data": {
    "addresses": [
      {
        "id": "address_id",
        "type": "home",
        "fullName": "John Doe",
        "phone": "+91-9876543210",
        "addressLine1": "123 Main St",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001",
        "isDefault": true
      }
    ]
  }
}
```

#### 1.6 Add User Address
**Method:** POST
**Endpoint:** `/users/addresses`
**Backend File:** `backend/src/controllers/userController.js`
**Headers:** Authorization required
**Request Body:**
```json
{
  "type": "home",
  "fullName": "John Doe",
  "phone": "+91-9876543210",
  "addressLine1": "123 Main St",
  "addressLine2": "Near Park",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "country": "India",
  "isDefault": true
}
```

---

### 2. Product Management

#### 2.1 Get All Products
**Method:** GET
**Endpoint:** `/products`
**Backend File:** `backend/src/controllers/productController.js`
**Query Parameters:**
- `page=1` (pagination)
- `limit=20` (items per page)
- `category=men` (filter by category)
- `brand=nike` (filter by brand)
- `minPrice=1000` (price filter)
- `maxPrice=5000` (price filter)
- `search=shirt` (search query)
**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "product_id",
        "name": "Cotton T-Shirt",
        "price": 1299,
        "originalPrice": 1599,
        "rating": 4.5,
        "reviews": 25,
        "image": "image_url",
        "brand": "Nike",
        "category": "men",
        "isNew": true,
        "isTrending": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

#### 2.2 Get Product by Slug
**Method:** GET
**Endpoint:** `/products/cotton-t-shirt`
**Backend File:** `backend/src/controllers/productController.js`
**Response:**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "product_id",
      "name": "Cotton T-Shirt",
      "description": "Comfortable cotton t-shirt",
      "price": 1299,
      "images": ["image1.jpg", "image2.jpg"],
      "category": "men",
      "brand": "Nike",
      "rating": 4.5,
      "reviews": 25,
      "sizes": ["S", "M", "L", "XL"],
      "colors": ["White", "Black", "Blue"]
    }
  }
}
```

#### 2.3 Get Featured Products
**Method:** GET
**Endpoint:** `/products/featured`
**Backend File:** `backend/src/controllers/productController.js`
**Query Parameters:** `limit=10`
**Response:** Same as Get All Products

#### 2.4 Get Trending Products
**Method:** GET
**Endpoint:** `/products/trending`
**Backend File:** `backend/src/controllers/productController.js`
**Query Parameters:** `limit=10`

#### 2.5 Get New Arrivals
**Method:** GET
**Endpoint:** `/products/new-arrivals`
**Backend File:** `backend/src/controllers/productController.js`
**Query Parameters:** `limit=10`

#### 2.6 Get Related Products
**Method:** GET
**Endpoint:** `/products/related/product_id`
**Backend File:** `backend/src/controllers/productController.js`
**Query Parameters:** `limit=6`

#### 2.7 Get Product Reviews
**Method:** GET
**Endpoint:** `/reviews/product/product_id`
**Backend File:** `backend/src/controllers/reviewController.js`
**Response:**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "review_id",
        "user": "John Doe",
        "rating": 5,
        "title": "Great product",
        "comment": "Very comfortable and good quality",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "averageRating": 4.5,
    "totalReviews": 25
  }
}
```

#### 2.8 Submit Product Review
**Method:** POST
**Endpoint:** `/reviews`
**Backend File:** `backend/src/controllers/reviewController.js`
**Headers:** Authorization required
**Request Body:**
```json
{
  "productId": "product_id",
  "rating": 5,
  "title": "Great product",
  "comment": "Very comfortable and good quality"
}
```

---

### 3. Categories & Brands

#### 3.1 Get All Categories
**Method:** GET
**Endpoint:** `/categories`
**Backend File:** `backend/src/controllers/categoryController.js`
**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "category_id",
        "name": "Men",
        "slug": "men",
        "image": "category_image.jpg"
