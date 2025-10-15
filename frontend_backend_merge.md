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
      }
    ]
  }
}
```

#### 3.2 Get All Brands
**Method:** GET
**Endpoint:** `/brands`
**Backend File:** `backend/src/controllers/brandController.js`
**Response:**
```json
{
  "success": true,
  "data": {
    "brands": [
      {
        "id": "brand_id",
        "name": "Nike",
        "slug": "nike",
        "logo": "brand_logo.jpg"
      }
    ]
  }
}
```

---

### 4. Shopping Cart

#### 4.1 Get User Cart
**Method:** GET
**Endpoint:** `/cart`
**Backend File:** `backend/src/controllers/cartController.js`
**Headers:** Authorization required
**Response:**
```json
{
  "success": true,
  "data": {
    "cart": {
      "items": [
        {
          "id": "cart_item_id",
          "productId": "product_id",
          "name": "Cotton T-Shirt",
          "price": 1299,
          "quantity": 2,
          "image": "product_image.jpg",
          "size": "M",
          "color": "White"
        }
      ],
      "totalItems": 2,
      "subtotal": 2598,
      "tax": 311.76,
      "shipping": 0,
      "total": 2909.76
    }
  }
}
```

#### 4.2 Add Item to Cart
**Method:** POST
**Endpoint:** `/cart/items`
**Backend File:** `backend/src/controllers/cartController.js`
**Headers:** Authorization required
**Request Body:**
```json
{
  "productId": "product_id",
  "quantity": 1,
  "size": "M",
  "color": "White"
}
```

#### 4.3 Update Cart Item Quantity
**Method:** PUT
**Endpoint:** `/cart/items/cart_item_id`
**Backend File:** `backend/src/controllers/cartController.js`
**Headers:** Authorization required
**Request Body:**
```json
{
  "quantity": 3
}
```

#### 4.4 Remove Item from Cart
**Method:** DELETE
**Endpoint:** `/cart/items/cart_item_id`
**Backend File:** `backend/src/controllers/cartController.js`
**Headers:** Authorization required

#### 4.5 Clear Cart
**Method:** DELETE
**Endpoint:** `/cart`
**Backend File:** `backend/src/controllers/cartController.js`
**Headers:** Authorization required

#### 4.6 Apply Coupon
**Method:** POST
**Endpoint:** `/coupons/validate`
**Backend File:** `backend/src/controllers/couponController.js`
**Headers:** Authorization required
**Request Body:**
```json
{
  "code": "SAVE10"
}
```

---

### 5. Wishlist

#### 5.1 Get User Wishlist
**Method:** GET
**Endpoint:** `/wishlist`
**Backend File:** `backend/src/controllers/wishlistController.js`
**Headers:** Authorization required
**Response:**
```json
{
  "success": true,
  "data": {
    "wishlist": [
      {
        "id": "wishlist_item_id",
        "productId": "product_id",
        "name": "Cotton T-Shirt",
        "price": 1299,
        "image": "product_image.jpg",
        "addedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

#### 5.2 Add to Wishlist
**Method:** POST
**Endpoint:** `/wishlist`
**Backend File:** `backend/src/controllers/wishlistController.js`
**Headers:** Authorization required
**Request Body:**
```json
{
  "productId": "product_id"
}
```

#### 5.3 Remove from Wishlist
**Method:** DELETE
**Endpoint:** `/wishlist/product_id`
**Backend File:** `backend/src/controllers/wishlistController.js`
**Headers:** Authorization required

---

### 6. Orders

#### 6.1 Get User Orders
**Method:** GET
**Endpoint:** `/orders`
**Backend File:** `backend/src/controllers/orderController.js`
**Headers:** Authorization required
**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_id",
        "orderNumber": "ORD-2024-001",
        "status": "delivered",
        "totalAmount": 2909.76,
        "createdAt": "2024-01-15T10:30:00Z",
        "items": [
          {
            "name": "Cotton T-Shirt",
            "quantity": 2,
            "price": 1299
          }
        ]
      }
    ]
  }
}
```

#### 6.2 Get Order Details
**Method:** GET
**Endpoint:** `/orders/order_id`
**Backend File:** `backend/src/controllers/orderController.js`
**Headers:** Authorization required

#### 6.3 Create Order
**Method:** POST
**Endpoint:** `/orders`
**Backend File:** `backend/src/controllers/orderController.js`
**Headers:** Authorization required
**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2,
      "size": "M",
      "color": "White"
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "+91-9876543210",
    "addressLine1": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "paymentMethod": "cod"
}
```

#### 6.4 Cancel Order
**Method:** POST
**Endpoint:** `/orders/order_id/cancel`
**Backend File:** `backend/src/controllers/orderController.js`
**Headers:** Authorization required
**Request Body:**
```json
{
  "reason": "Changed my mind"
}
```

---

### 7. Banners & Public Data

#### 7.1 Get Hero Banners
**Method:** GET
**Endpoint:** `/public/banners`
**Backend File:** `backend/src/controllers/bannerController.js`
**Response:**
```json
{
  "success": true,
  "data": {
    "banners": [
      {
        "id": "banner_id",
        "title": "Sale Banner",
        "image": "banner_image.jpg",
        "link": "/products/sale"
      }
    ]
  }
}
```

---

## Frontend File-wise API Integration

### 1. src/pages/Index.tsx (Homepage)

**APIs Used:**
- `GET /api/banners/hero` - Hero carousel images
- `GET /api/categories` - Main navigation categories
- `GET /api/flash-sales/active` - Active flash sale data
- `GET /api/products/trending?limit=10` - Trending products section
- `GET /api/products/new-arrivals?limit=10` - New arrivals section
- `GET /api/products/top-picks?limit=10` - Top picks section
- `GET /api/recommendations` - Personalized recommendations (authenticated)

**Backend Files Responsible:**
- `backend/src/controllers/bannerController.js` - Hero banners
- `backend/src/controllers/categoryController.js` - Categories
- `backend/src/controllers/productController.js` - All product sections
- `backend/src/controllers/couponController.js` - Flash sales

**Updated Code Structure:**
```typescript
const Index = () => {
  // Fetch hero carousel banners
  const { data: carouselImages = [] } = useQuery({
    queryKey: ['banners', 'hero'],
    queryFn: () => api.get('/banners/hero')
  });

  // Fetch categories for navigation
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories')
  });

  // Fetch flash sale
  const { data: flashSale } = useQuery({
    queryKey: ['flash-sale'],
    queryFn: () => api.get('/flash-sales/active')
  });

  // Fetch trending products
  const { data: trendingProducts = [] } = useQuery({
    queryKey: ['products', 'trending'],
    queryFn: () => api.get('/products/trending?limit=10')
  });

  // Similar for newArrivals, topPicks, recommended
};
```

---

### 2. src/pages/ProductDetail.tsx

**APIs Used:**
- `GET /api/products/:id` - Product details
- `GET /api/reviews/product/:id` - Product reviews
- `GET /api/products/related/:id` - Related products
- `POST /api/wishlist` - Add to wishlist
- `POST /api/cart/items` - Add to cart
- `POST /api/reviews` - Submit review

**Backend Files Responsible:**
- `backend/src/controllers/productController.js` - Product details
- `backend/src/controllers/reviewController.js` - Reviews
- `backend/src/controllers/wishlistController.js` - Wishlist
- `backend/src/controllers/cartController.js` - Cart

**Updated Code Structure:**
```typescript
const ProductDetail = () => {
  const { id } = useParams();

  // Fetch product details
  const { data: product } = useQuery({
    queryKey: ['product', id],
    queryFn: () => api.get(`/products/${id}`)
  });

  // Fetch reviews
  const { data: reviewsData } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => api.get(`/reviews/product/${id}`)
  });

  // Fetch related products
  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['products', 'related', id],
    queryFn: () => api.get(`/products/related/${id}`)
  });

  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: () => api.post('/wishlist', { productId: id }),
    onSuccess: () => toast.success('Added to wishlist')
  });

  // Submit review mutation
  const submitReviewMutation = useMutation({
    mutationFn: (reviewData) => api.post('/reviews', { ...reviewData, productId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', id]);
      toast.success('Review submitted');
    }
  });
};
```

---

### 3. src/pages/Cart.tsx

**APIs Used:**
- `GET /api/cart` - Fetch cart (via CartContext)
- `PUT /api/cart/items/:id` - Update quantity (via CartContext)
- `DELETE /api/cart/items/:id` - Remove item (via CartContext)
- `POST /api/coupons/validate` - Apply coupon

**Backend Files Responsible:**
- `backend/src/controllers/cartController.js` - Cart operations
- `backend/src/controllers/couponController.js` - Coupon validation

**Updated Code Structure:**
```typescript
const Cart = () => {
  const { items, totalPrice, removeItem, updateQuantity } = useCart();

  // Apply coupon mutation
  const applyCouponMutation = useMutation({
    mutationFn: (couponCode) => api.post('/coupons/validate', { code: couponCode }),
    onSuccess: (data) => toast.success(`Coupon applied! Discount: ₹${data.discount}`)
  });

  const handleApplyCoupon = (code) => {
    applyCouponMutation.mutate(code);
  };
};
```

---

### 4. src/pages/Payment.tsx

**APIs Used:**
- `POST /api/orders` - Create order
- `GET /api/users/addresses` - Get saved addresses (via AuthContext)

**Backend Files Responsible:**
- `backend/src/controllers/orderController.js` - Order creation
- `backend/src/controllers/userController.js` - User addresses

**Updated Code Structure:**
```typescript
const Payment = () => {
  const { items, totalPrice, clearCart } = useCart();

  const createOrderMutation = useMutation({
    mutationFn: (orderData) => api.post('/orders', orderData),
    onSuccess: (data) => {
      clearCart();
      navigate(`/payment-success?orderId=${data.order.id}`);
    }
  });

  const onSubmit = (formData) => {
    const orderData = {
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      })),
      shippingAddress: formData,
      paymentMethod: formData.paymentMethod,
      totalAmount: totalPrice * 1.18 + (totalPrice > 500 ? 0 : 50)
    };

    createOrderMutation.mutate(orderData);
  };
};
```

---

### 5. src/pages/Orders.tsx

**APIs Used:**
- `GET /api/orders` - Fetch user orders
- `GET /api/orders/:id` - Order details
- `POST /api/orders/:id/cancel` - Cancel order
- `POST /api/orders/:id/return` - Return order

**Backend Files Responsible:**
- `backend/src/controllers/orderController.js` - All order operations

**Updated Code Structure:**
```typescript
const Orders = () => {
  // Fetch orders
  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: () => api.get('/orders')
  });

  // Cancel order mutation
  const cancelOrderMutation = useMutation({
    mutationFn: (orderId) => api.post(`/orders/${orderId}/cancel`, { reason: 'Changed mind' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast.success('Order cancelled');
    }
  });
};
```

---

### 6. src/pages/Wishlist.tsx

**APIs Used:**
- `GET /api/wishlist` - Fetch wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist
- `POST /api/cart/items` - Move to cart (via CartContext)

**Backend Files Responsible:**
- `backend/src/controllers/wishlistController.js` - Wishlist operations
- `backend/src/controllers/cartController.js` - Cart operations

**Updated Code Structure:**
```typescript
const Wishlist = () => {
  // Fetch wishlist
  const { data: wishlistItems = [] } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => api.get('/wishlist')
  });

  // Remove from wishlist
  const removeFromWishlistMutation = useMutation({
    mutationFn: (itemId) => api.delete(`/wishlist/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
      toast.success('Removed from wishlist');
    }
  });

  // Move to cart
  const moveToCartMutation = useMutation({
    mutationFn: (itemId) => api.post(`/wishlist/move-to-cart/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
      queryClient.invalidateQueries(['cart']);
      toast.success('Moved to cart');
    }
  });
};
```

---

### 7. src/pages/Profile.tsx

**APIs Used:**
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password
- `GET /api/users/addresses` - Get addresses
- `POST /api/users/addresses` - Add address
- `DELETE /api/users/addresses/:id` - Delete address

**Backend Files Responsible:**
- `backend/src/controllers/userController.js` - All user operations

**Updated Code Structure:**
```typescript
const Profile = () => {
  // Fetch profile
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/users/profile')
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (profileData) => api.put('/users/profile', profileData),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      toast.success('Profile updated');
    }
  });

  // Fetch addresses
  const { data: addresses = [] } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => api.get('/users/addresses')
  });

  // Add address mutation
  const addAddressMutation = useMutation({
    mutationFn: (addressData) => api.post('/users/addresses', addressData),
    onSuccess: () => {
      queryClient.invalidateQueries(['addresses']);
      toast.success('Address added');
    }
  });
};
```

---

### 8. src/pages/Login.tsx

**APIs Used:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

**Backend Files Responsible:**
- `backend/src/controllers/authController.js` - Authentication

**Updated Code Structure:**
```typescript
const Login = () => {
  const { login, register: registerUser } = useAuth();

  const onLoginSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success('Registration successful');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed');
    }
  };
};
```

---

### 9. src/pages/Men.tsx (and Women, Kids, etc.)

**APIs Used:**
- `GET /api/products?category=men` - Products by category
- `GET /api/categories/men/filters` - Available filters
- `GET /api/brands?category=men` - Brands for category

**Backend Files Responsible:**
- `backend/src/controllers/productController.js` - Products
- `backend/src/controllers/categoryController.js` - Category filters
- `backend/src/controllers/brandController.js` - Brands

**Updated Code Structure:**
```typescript
const Men = () => {
  // Fetch products with filters
  const { data: productsData } = useQuery({
    queryKey: ['products', 'men', filters],
    queryFn: () => api.get('/products', {
      params: { category: 'men', ...filters }
    })
  });

  // Fetch available filters
  const { data: availableFilters } = useQuery({
    queryKey: ['filters', 'men'],
    queryFn: () => api.get('/categories/men/filters')
  });
};
```

---

### 10. src/components/Layout.tsx

**APIs Used:**
- `GET /api/categories` - Menu categories
- `GET /api/cart` - Cart count (via CartContext)
- `GET /api/notifications` - User notifications

**Backend Files Responsible:**
- `backend/src/controllers/categoryController.js` - Categories
- `backend/src/controllers/cartController.js` - Cart
- `backend/src/controllers/notificationController.js` - Notifications

**Updated Code Structure:**
```typescript
const Layout = () => {
  // Fetch categories for menu
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories')
  });

  // Fetch notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.get('/notifications'),
    enabled: !!user
  });
};
```

---

### 11. src/components/ProductCard.tsx

**APIs Used:**
- `POST /api/wishlist` - Toggle wishlist
- `POST /api/cart/items` - Quick add to cart
- `POST /api/products/:id/view` - Track product view

**Backend Files Responsible:**
- `backend/src/controllers/wishlistController.js` - Wishlist
- `backend/src/controllers/cartController.js` - Cart
- `backend/src/controllers/productController.js` - View tracking

**Updated Code Structure:**
```typescript
const ProductCard = ({ product }) => {
  // Toggle wishlist
  const toggleWishlistMutation = useMutation({
    mutationFn: () => {
      if (isWishlisted) {
        return api.delete(`/wishlist/product/${product.id}`);
      } else {
        return api.post('/wishlist', { productId: product.id });
      }
    },
    onSuccess: () => {
      setIsWishlisted(!isWishlisted);
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    }
  });

  // Track view
  const trackViewMutation = useMutation({
    mutationFn: () => api.post(`/products/${product.id}/view`)
  });
};
```

---

## Backend File Responsibility Mapping

### Controllers

| Backend Controller | Frontend Files Using It | Main Operations |
|-------------------|------------------------|-----------------|
| `authController.js` | Login.tsx, AuthContext | register, login, logout, refresh token |
| `userController.js` | Profile.tsx, Payment.tsx | profile CRUD, addresses CRUD |
| `productController.js` | Index.tsx, ProductDetail.tsx, Men.tsx, ProductCard.tsx | products CRUD, search, filters |
| `categoryController.js` | Index.tsx, Layout.tsx, Men.tsx | categories, filters |
| `brandController.js` | Men.tsx | brands by category |
| `cartController.js` | Cart.tsx, ProductCard.tsx, CartContext | cart operations |
| `wishlistController.js` | Wishlist.tsx, ProductCard.tsx | wishlist operations |
| `orderController.js` | Orders.tsx, Payment.tsx | orders CRUD |
| `reviewController.js` | ProductDetail.tsx | reviews CRUD |
| `couponController.js` | Cart.tsx | coupon validation |
| `bannerController.js` | Index.tsx | banner management |

### Services

| Backend Service | Purpose | Frontend Integration |
|----------------|---------|---------------------|
| `authService.js` | JWT handling, password hashing | AuthContext |
| `emailService.js` | Email notifications | Registration, password reset |
| `cartService.js` | Cart business logic | CartContext |
| `orderService.js` | Order processing | Payment.tsx, Orders.tsx |
| `productService.js` | Product business logic | All product pages |
| `wishlistService.js` | Wishlist operations | Wishlist.tsx, ProductCard.tsx |

### Models

| Backend Model | Frontend Usage | Key Fields |
|---------------|----------------|------------|
| `User.js` | AuthContext, Profile.tsx | email, password, profile data |
| `Product.js` | All product components | name, price, images, category |
| `Cart.js` | CartContext, Cart.tsx | items, quantities, totals |
| `Order.js` | Orders.tsx, Payment.tsx | order details, status |
| `Wishlist.js` | Wishlist.tsx | product references |
| `Category.js` | Layout.tsx, category pages | name, slug, hierarchy |
| `Review.js` | ProductDetail.tsx | ratings, comments |

---

## Quick Reference: API Endpoints by Frontend File

### Index.tsx (Homepage)
- `GET /banners/hero` → `bannerController.js`
- `GET /categories` → `categoryController.js`
- `GET /flash-sales/active` → `couponController.js`
- `GET /products/trending` → `productController.js`
- `GET /products/new-arrivals` → `productController.js`
- `GET /products/top-picks` → `productController.js`
- `GET /recommendations` → `productController.js`

### ProductDetail.tsx
- `GET /products/:id` → `productController.js`
- `GET /reviews/product/:id` → `reviewController.js`
- `GET /products/related/:id` → `productController.js`
- `POST /wishlist` → `wishlistController.js`
- `POST /cart/items` → `cartController.js`
- `POST /reviews` → `reviewController.js`

### Cart.tsx
- `GET /cart` → `cartController.js` (via CartContext)
- `PUT /cart/items/:id` → `cartController.js` (via CartContext)
- `DELETE /cart/items/:id` → `cartController.js` (via CartContext)
- `POST /coupons/validate` → `couponController.js`

### Payment.tsx
- `POST /orders` → `orderController.js`
- `GET /users/addresses` → `userController.js` (via AuthContext)

### Orders.tsx
- `GET /orders` → `orderController.js`
- `GET /orders/:id` → `orderController.js`
- `POST /orders/:id/cancel` → `orderController.js`

### Wishlist.tsx
- `GET /wishlist` → `wishlistController.js`
- `DELETE /wishlist/:id` → `wishlistController.js`
- `POST /wishlist/move-to-cart/:id` → `cartController.js`

### Profile.tsx
- `GET /users/profile` → `userController.js`
- `PUT /users/profile` → `userController.js`
- `GET /users/addresses` → `userController.js`
- `POST /users/addresses` → `userController.js`
- `DELETE /users/addresses/:id` → `userController.js`

### Login.tsx
- `POST /auth/login` → `authController.js`
- `POST /auth/register` → `authController.js`

### Category Pages (Men.tsx, etc.)
- `GET /products?category=X` → `productController.js`
- `GET /categories/X/filters` → `categoryController.js`
- `GET /brands?category=X` → `brandController.js`

### Layout.tsx
- `GET /categories` → `categoryController.js`
- `GET /notifications` → `notificationController.js`

### ProductCard.tsx
- `POST /wishlist` → `wishlistController.js`
- `POST /cart/items` → `cartController.js`
- `POST /products/:id/view` → `productController.js`

---

This comprehensive guide maps every frontend file to its corresponding backend APIs and responsible controller files. Use this as your integration roadmap to convert the static Obeyyo frontend into a fully dynamic e-commerce platform.
