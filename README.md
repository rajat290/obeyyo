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
