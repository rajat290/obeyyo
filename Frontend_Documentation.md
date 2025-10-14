# Frontend Documentation & API Integration Guide

## Table of Contents
1. [Frontend Architecture Overview](#frontend-architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure Breakdown](#project-structure-breakdown)
4. [Pages Explanation](#pages-explanation)
5. [Components Explanation](#components-explanation)
6. [API Integration Strategy](#api-integration-strategy)
7. [Converting Static to Dynamic Data](#converting-static-to-dynamic-data)
8. [File-by-File API Integration Guide](#file-by-file-api-integration-guide)

---

## Frontend Architecture Overview

The Obeyyo e-commerce frontend is built using:
- **React 18** with TypeScript for type safety
- **React Router v6** for client-side routing
- **Tailwind CSS** for styling with custom design system
- **Vite** for fast development and optimized builds
- **Component-based architecture** for reusability

### Current State
- All data is **static** (hardcoded arrays and objects)
- No API calls or backend integration
- No state management library (using React's built-in state)

### Target State (After Backend Integration)
- Data fetched from **Express/Node.js REST APIs**
- Global state management using **Context API** or **Redux Toolkit**
- Authenticated requests with **JWT tokens**
- Real-time updates and data persistence

---

## Technology Stack

### Core Technologies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "typescript": "TypeScript for type safety",
  "vite": "Build tool and dev server"
}
```

### UI & Styling
```json
{
  "tailwindcss": "Utility-first CSS framework",
  "tailwindcss-animate": "Animation utilities",
  "@radix-ui/*": "Accessible UI components",
  "lucide-react": "Icon library",
  "shadcn/ui": "Pre-built component library"
}
```

### Forms & Validation
```json
{
  "react-hook-form": "Form handling",
  "zod": "Schema validation",
  "@hookform/resolvers": "Form validation resolver"
}
```

### Data Fetching (Recommended to Add)
```bash
# Install these for API integration
npm install axios react-query
# OR
npm install @tanstack/react-query axios
```

---

## Project Structure Breakdown

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base Shadcn UI components
│   ├── home/           # Homepage-specific sections
│   ├── admin/          # Admin panel components
│   └── *.tsx           # Shared components (ProductCard, Layout, etc.)
├── pages/              # Route pages/views
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # External service integrations (Supabase)
├── App.tsx             # Root application component
├── main.tsx            # Application entry point
└── index.css           # Global styles & design tokens
```

---

## Pages Explanation

### 1. **Index.tsx** (Homepage)
**Location:** `src/pages/Index.tsx`

**Functionality:**
- Main landing page of the application
- Displays multiple sections: Hero carousel, categories, featured products, deals
- Combines 15+ different homepage sections
- Currently uses **static data** arrays for products, categories, and banners

**Static Data Used:**
- `carouselImages` - Hero banner images
- `categories` - Main category navigation
- Product arrays in various sections

**API Integration Needed:**
```typescript
// Current (Static)
const carouselImages = [
  { id: "1", url: "/banner1.jpg", title: "Sale" }
];

// After API Integration
const { data: carouselImages, isLoading } = useQuery({
  queryKey: ['banners', 'hero'],
  queryFn: () => axios.get('/api/banners/hero').then(res => res.data)
});
```

### 2. **ProductDetail.tsx**
**Location:** `src/pages/ProductDetail.tsx`

**Functionality:**
- Shows detailed product information
- Image gallery, price, descriptions, reviews
- Add to cart, add to wishlist functionality
- Size selection, color variants

**Static Data Used:**
- Hardcoded product object
- Static related products array
- Mock reviews data

**APIs Needed:**
- `GET /api/products/:id` - Fetch single product details
- `GET /api/products/:id/reviews` - Fetch product reviews
- `GET /api/products/related/:id` - Get related products
- `POST /api/cart/add` - Add item to cart
- `POST /api/wishlist/add` - Add to wishlist

### 3. **Cart.tsx**
**Location:** `src/pages/Cart.tsx`

**Functionality:**
- Display cart items with images, prices, quantities
- Update quantity, remove items
- Calculate subtotal, tax, shipping, total
- Apply coupon codes
- Proceed to checkout

**Static Data Used:**
- Hardcoded cart items array

**APIs Needed:**
- `GET /api/cart` - Fetch user's cart
- `PUT /api/cart/item/:id` - Update item quantity
- `DELETE /api/cart/item/:id` - Remove cart item
- `POST /api/cart/coupon` - Apply coupon code
- `POST /api/cart/clear` - Clear entire cart

### 4. **Payment.tsx**
**Location:** `src/pages/Payment.tsx`

**Functionality:**
- Checkout form with shipping address
- Payment method selection
- Order summary with pricing
- Place order functionality

**APIs Needed:**
- `GET /api/cart/summary` - Get cart totals
- `POST /api/orders/create` - Create new order
- `POST /api/payment/process` - Process payment
- `GET /api/user/addresses` - Get saved addresses
- `POST /api/user/addresses` - Save new address

### 5. **Orders.tsx**
**Location:** `src/pages/Orders.tsx`

**Functionality:**
- Display user's order history
- Order status tracking
- View order details
- Reorder functionality
- Cancel/return order options

**Static Data Used:**
- Mock orders array

**APIs Needed:**
- `GET /api/orders` - Fetch user's orders
- `GET /api/orders/:id` - Get specific order details
- `PUT /api/orders/:id/cancel` - Cancel an order
- `POST /api/orders/:id/return` - Initiate return

### 6. **Wishlist.tsx**
**Location:** `src/pages/Wishlist.tsx`

**Functionality:**
- Display saved/favorite products
- Remove from wishlist
- Move to cart
- Share wishlist

**Static Data Used:**
- Hardcoded wishlist items

**APIs Needed:**
- `GET /api/wishlist` - Fetch user's wishlist
- `POST /api/wishlist/add` - Add product to wishlist
- `DELETE /api/wishlist/item/:id` - Remove from wishlist
- `POST /api/wishlist/move-to-cart/:id` - Move item to cart

### 7. **Profile.tsx**
**Location:** `src/pages/Profile.tsx`

**Functionality:**
- Display user information
- Edit profile details
- Manage addresses
- Change password
- Order history link

**APIs Needed:**
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/addresses` - Get addresses
- `POST /api/user/addresses` - Add address
- `PUT /api/user/addresses/:id` - Update address
- `DELETE /api/user/addresses/:id` - Delete address
- `PUT /api/user/change-password` - Change password

### 8. **Login.tsx**
**Location:** `src/pages/Login.tsx`

**Functionality:**
- User login form
- Registration form
- Social login buttons
- Forgot password link

**APIs Needed:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Send reset email
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/facebook` - Facebook OAuth

### 9. **Men.tsx, Women.tsx, Kids.tsx, Footwear.tsx, Beauty.tsx, Accessories.tsx**
**Location:** `src/pages/[Category].tsx`

**Functionality:**
- Category-specific product listings
- Filters (price, brand, size, color)
- Sort options (price, popularity, new arrivals)
- Pagination
- Promotional banners

**Static Data Used:**
- Hardcoded category products
- Static filter options

**APIs Needed:**
- `GET /api/products?category=men&page=1&limit=20` - Fetch products by category
- `GET /api/categories/:slug/filters` - Get available filters
- `GET /api/brands?category=men` - Get brands for category
- `GET /api/products/search?q=keyword&category=men` - Search within category

### 10. **Admin.tsx**
**Location:** `src/pages/Admin.tsx`

**Functionality:**
- Admin dashboard overview
- Manage products, orders, users
- Banner/carousel management
- Analytics and reports

**APIs Needed:**
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - List all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/users` - List users
- `POST /api/admin/banners` - Create banner
- `PUT /api/admin/banners/:id` - Update banner

---

## Components Explanation

### Core Components

#### 1. **Layout.tsx**
**Location:** `src/components/Layout.tsx`

**Functionality:**
- Wrapper component for all pages
- Contains Header (logo, search, cart, user menu)
- Navigation menu
- Footer
- Handles mobile/desktop layouts

**APIs Needed:**
- `GET /api/cart/count` - Display cart item count
- `GET /api/notifications` - User notifications
- `GET /api/categories` - Dynamic menu categories

**Integration Points:**
```typescript
// Header cart count
const { data: cartCount } = useQuery('cartCount', 
  () => axios.get('/api/cart/count')
);

// User info (if logged in)
const { data: user } = useQuery('currentUser',
  () => axios.get('/api/user/me'),
  { enabled: !!token }
);
```

#### 2. **ProductCard.tsx**
**Location:** `src/components/ProductCard.tsx`

**Functionality:**
- Reusable product card component
- Display product image, name, price, rating
- Quick add to cart button
- Wishlist toggle
- Used across all product listing pages

**Props:**
```typescript
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    brand: string;
    isNew?: boolean;
    isTrending?: boolean;
  };
  compact?: boolean;
}
```

**APIs Needed:**
- `POST /api/cart/add` - Add to cart
- `POST /api/wishlist/toggle` - Toggle wishlist
- `POST /api/products/:id/view` - Track product views

#### 3. **ImageCarousel.tsx**
**Location:** `src/components/ImageCarousel.tsx`

**Functionality:**
- Auto-playing image carousel
- Used for hero banners and promotional slides
- Touch/swipe support for mobile

**Current Data:**
```typescript
// Static images array
const images = [
  { id: "1", url: "/banner1.jpg", title: "Sale" }
];
```

**After API Integration:**
```typescript
// Fetch from backend
const { data: banners } = useQuery('heroBanners',
  () => axios.get('/api/banners/hero')
);
```

#### 4. **ProductSlider.tsx**
**Location:** `src/components/ProductSlider.tsx`

**Functionality:**
- Horizontal scrollable product list
- Used in sections like "Trending", "Top Picks", "New Arrivals"
- Displays multiple ProductCard components

**Integration:**
```typescript
// Replace static products with API data
const { data: trendingProducts, isLoading } = useQuery(
  ['products', 'trending'],
  () => axios.get('/api/products/trending?limit=10')
);
```

### Homepage Section Components

#### 5. **home/HeroSection.tsx**
**Location:** `src/components/home/HeroSection.tsx`

**Functionality:**
- Top horizontal category navigation bar
- Main hero carousel below

**APIs Needed:**
- `GET /api/categories` - Main categories
- `GET /api/banners/hero` - Hero carousel images

#### 6. **home/FlashSaleSection.tsx**
**Location:** `src/components/home/FlashSaleSection.tsx`

**Functionality:**
- Time-limited deals
- Countdown timer
- Flash sale products

**APIs Needed:**
- `GET /api/flash-sales/active` - Current flash sale
- `GET /api/flash-sales/:id/products` - Flash sale products

#### 7. **home/NewArrivalsSection.tsx**
**Location:** `src/components/home/NewArrivalsSection.tsx`

**Functionality:**
- Display recently added products
- "NEW" badge on products

**APIs Needed:**
- `GET /api/products/new-arrivals?limit=10` - Latest products

#### 8. **home/TrendingSection.tsx**
**Location:** `src/components/home/TrendingSection.tsx`

**Functionality:**
- Popular/trending products
- Based on views, sales, or algorithm

**APIs Needed:**
- `GET /api/products/trending?limit=10` - Trending products

#### 9. **home/TopPicksSection.tsx**
**Location:** `src/components/home/TopPicksSection.tsx`

**Functionality:**
- Curated "top rated" or "editor's choice" products

**APIs Needed:**
- `GET /api/products/top-picks?limit=10` - Top picks

#### 10. **home/RecommendedSection.tsx**
**Location:** `src/components/home/RecommendedSection.tsx`

**Functionality:**
- Personalized product recommendations
- Based on user's browsing/purchase history

**APIs Needed:**
- `GET /api/recommendations` - Personalized recommendations (requires auth)
- `GET /api/products/popular?limit=10` - Fallback for non-logged users

### Admin Components

#### 11. **admin/ProductManagement.tsx**
**Location:** `src/components/admin/ProductManagement.tsx`

**Functionality:**
- CRUD operations for products
- Product list with search/filter
- Add/Edit product form
- Image upload
- Bulk actions

**APIs Needed:**
- `GET /api/admin/products?page=1&limit=20` - List products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `POST /api/admin/products/bulk-delete` - Bulk delete
- `POST /api/admin/upload` - Image upload

#### 12. **admin/OrderManagement.tsx**
**Location:** `src/components/admin/OrderManagement.tsx`

**Functionality:**
- View all orders
- Update order status
- Filter by status, date
- Export orders

**APIs Needed:**
- `GET /api/admin/orders?status=pending&page=1` - List orders
- `PUT /api/admin/orders/:id/status` - Update status
- `GET /api/admin/orders/:id` - Order details
- `GET /api/admin/orders/export?format=csv` - Export data

---

## API Integration Strategy

### Recommended Approach

1. **Install Required Packages**
```bash
npm install axios @tanstack/react-query
```

2. **Create API Client**
Create `src/lib/api.ts`:
```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

3. **Setup React Query Provider**
Update `src/main.tsx`:
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

4. **Create Custom Hooks for API Calls**
Create `src/hooks/useProducts.ts`:
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  brand: string;
  // ... other fields
}

export const useProducts = (filters?: {
  category?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const { data } = await apiClient.get('/products', { params: filters });
      return data;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useTrendingProducts = (limit = 10) => {
  return useQuery({
    queryKey: ['products', 'trending', limit],
    queryFn: async () => {
      const { data } = await apiClient.get('/products/trending', {
        params: { limit },
      });
      return data;
    },
  });
};
```

5. **Create Auth Context**
Create `src/contexts/AuthContext.tsx`:
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await apiClient.get('/auth/me');
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('authToken', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const register = async (userData: any) => {
    const { data } = await apiClient.post('/auth/register', userData);
    localStorage.setItem('authToken', data.token);
    setUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

6. **Create Cart Context**
Create `src/contexts/CartContext.tsx`:
```typescript
import React, { createContext, useContext, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  addItem: (productId: string, quantity: number, options?: any) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: cartData, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await apiClient.get('/cart');
      return data;
    },
    enabled: !!user,
  });

  const addItemMutation = useMutation({
    mutationFn: async ({ productId, quantity, options }: any) => {
      const { data } = await apiClient.post('/cart/add', {
        productId,
        quantity,
        ...options,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await apiClient.delete(`/cart/item/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: any) => {
      const { data } = await apiClient.put(`/cart/item/${itemId}`, { quantity });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post('/cart/clear');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const items = cartData?.items || [];
  const totalItems = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        isLoading,
        addItem: (productId, quantity, options) =>
          addItemMutation.mutate({ productId, quantity, options }),
        removeItem: (itemId) => removeItemMutation.mutate(itemId),
        updateQuantity: (itemId, quantity) =>
          updateQuantityMutation.mutate({ itemId, quantity }),
        clearCart: () => clearCartMutation.mutate(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

---

## Converting Static to Dynamic Data

### General Pattern

**Before (Static):**
```typescript
const TrendingSection = () => {
  const trendingProducts = [
    { id: "1", name: "Product 1", price: 1299 },
    { id: "2", name: "Product 2", price: 1599 },
  ];

  return (
    <div>
      {trendingProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

**After (Dynamic):**
```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

const TrendingSection = () => {
  const { data: trendingProducts = [], isLoading, error } = useQuery({
    queryKey: ['products', 'trending'],
    queryFn: async () => {
      const { data } = await apiClient.get('/products/trending?limit=10');
      return data.products;
    },
  });

  if (isLoading) return <SkeletonLoader />;
  if (error) return <div>Failed to load trending products</div>;

  return (
    <div>
      {trendingProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

---

## File-by-File API Integration Guide

### 1. **src/pages/Index.tsx** (Homepage)

**Current State:**
- Multiple hardcoded arrays for different sections
- Static carousel images
- Static categories

**Changes Required:**

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

const Index = () => {
  // Fetch hero carousel banners
  const { data: carouselImages = [], isLoading: loadingBanners } = useQuery({
    queryKey: ['banners', 'hero'],
    queryFn: async () => {
      const { data } = await apiClient.get('/banners/hero');
      return data.banners;
    },
  });

  // Fetch categories for navigation
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await apiClient.get('/categories');
      return data.categories;
    },
  });

  // Fetch flash sale products
  const { data: flashSale, isLoading: loadingFlashSale } = useQuery({
    queryKey: ['flash-sale'],
    queryFn: async () => {
      const { data } = await apiClient.get('/flash-sales/active');
      return data;
    },
  });

  // Fetch trending products
  const { data: trendingProducts = [] } = useQuery({
    queryKey: ['products', 'trending'],
    queryFn: async () => {
      const { data } = await apiClient.get('/products/trending?limit=10');
      return data.products;
    },
  });

  // Fetch new arrivals
  const { data: newArrivals = [] } = useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: async () => {
      const { data } = await apiClient.get('/products/new-arrivals?limit=10');
      return data.products;
    },
  });

  // Fetch top picks
  const { data: topPicks = [] } = useQuery({
    queryKey: ['products', 'top-picks'],
    queryFn: async () => {
      const { data } = await apiClient.get('/products/top-picks?limit=10');
      return data.products;
    },
  });

  // Fetch recommended products (personalized if logged in)
  const { data: recommended = [] } = useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const { data } = await apiClient.get('/recommendations');
      return data.products;
    },
  });

  const isLoading = loadingBanners || loadingCategories;

  return (
    <div>
      <HeroSection 
        carouselImages={carouselImages} 
        categories={categories}
        isLoading={isLoading} 
      />
      
      {flashSale && <FlashSaleSection sale={flashSale} />}
      
      <TrendingSection products={trendingProducts} isLoading={false} />
      <NewArrivalsSection products={newArrivals} isLoading={false} />
      <TopPicksSection products={topPicks} isLoading={false} />
      <RecommendedSection products={recommended} isLoading={false} />
      
      {/* More sections... */}
    </div>
  );
};
```

**APIs Used:**
- `GET /api/banners/hero` - Hero carousel images
- `GET /api/categories` - Main categories
- `GET /api/flash-sales/active` - Active flash sale
- `GET /api/products/trending` - Trending products
- `GET /api/products/new-arrivals` - New products
- `GET /api/products/top-picks` - Top rated products
- `GET /api/recommendations` - Personalized recommendations

---

### 2. **src/pages/ProductDetail.tsx**

**Current State:**
- Hardcoded product data
- Static reviews
- Mock related products

**Changes Required:**

```typescript
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch product details
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/products/${id}`);
      return data.product;
    },
    enabled: !!id,
  });

  // Fetch product reviews
  const { data: reviewsData } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/products/${id}/reviews`);
      return data;
    },
    enabled: !!id,
  });

  // Fetch related products
  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['products', 'related', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/products/related/${id}`);
      return data.products;
    },
    enabled: !!id,
  });

  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post('/wishlist/add', {
        productId: id,
      });
      return data;
    },
    onSuccess: () => {
      toast.success('Added to wishlist');
    },
  });

  // Submit review mutation
  const submitReviewMutation = useMutation({
    mutationFn: async (reviewData: any) => {
      const { data } = await apiClient.post(`/products/${id}/reviews`, reviewData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
      toast.success('Review submitted');
    },
  });

  const handleAddToCart = (selectedSize: string, selectedColor: string, quantity: number) => {
    addItem(id!, quantity, { size: selectedSize, color: selectedColor });
    toast.success('Added to cart');
  };

  if (isLoading) return <SkeletonLoader type="product-detail" />;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      {/* Product images */}
      <ImageGallery images={product.images} />
      
      {/* Product info */}
      <div>
        <h1>{product.name}</h1>
        <p>{product.brand}</p>
        <p>₹{product.price}</p>
        <p>{product.description}</p>
        
        {/* Size and color selectors */}
        <SizeSelector sizes={product.sizes} />
        <ColorSelector colors={product.colors} />
        
        <button onClick={() => handleAddToCart(selectedSize, selectedColor, 1)}>
          Add to Cart
        </button>
        
        <button onClick={() => addToWishlistMutation.mutate()}>
          Add to Wishlist
        </button>
      </div>
      
      {/* Reviews section */}
      <ReviewsList 
        reviews={reviewsData?.reviews || []} 
        onSubmit={(data) => submitReviewMutation.mutate(data)}
      />
      
      {/* Related products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};
```

**APIs Used:**
- `GET /api/products/:id` - Product details
- `GET /api/products/:id/reviews` - Product reviews
- `GET /api/products/related/:id` - Related products
- `POST /api/wishlist/add` - Add to wishlist
- `POST /api/products/:id/reviews` - Submit review

---

### 3. **src/pages/Cart.tsx**

**Current State:**
- Hardcoded cart items array

**Changes Required:**

```typescript
import { useCart } from '@/contexts/CartContext';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const { items, totalPrice, isLoading, removeItem, updateQuantity, clearCart } = useCart();

  // Apply coupon mutation
  const applyCouponMutation = useMutation({
    mutationFn: async (couponCode: string) => {
      const { data } = await apiClient.post('/cart/coupon', { code: couponCode });
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Coupon applied! Discount: ₹${data.discount}`);
    },
    onError: () => {
      toast.error('Invalid coupon code');
    },
  });

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  if (isLoading) return <SkeletonLoader />;

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Shopping Cart ({items.length} items)</h1>
      
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>Size: {item.size}, Color: {item.color}</p>
            <p>₹{item.price}</p>
          </div>
          <div>
            <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
          </div>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      
      {/* Coupon section */}
      <div>
        <input 
          type="text" 
          placeholder="Enter coupon code"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              applyCouponMutation.mutate(e.currentTarget.value);
            }
          }}
        />
      </div>
      
      {/* Cart summary */}
      <div>
        <p>Subtotal: ₹{totalPrice}</p>
        <p>Tax: ₹{(totalPrice * 0.18).toFixed(2)}</p>
        <p>Shipping: ₹{totalPrice > 500 ? 0 : 50}</p>
        <h3>Total: ₹{(totalPrice * 1.18 + (totalPrice > 500 ? 0 : 50)).toFixed(2)}</h3>
        
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};
```

**APIs Used:**
- `GET /api/cart` - Fetch cart (via CartContext)
- `PUT /api/cart/item/:id` - Update quantity (via CartContext)
- `DELETE /api/cart/item/:id` - Remove item (via CartContext)
- `POST /api/cart/coupon` - Apply coupon

---

### 4. **src/pages/Payment.tsx**

**Current State:**
- Static checkout form
- No actual payment processing

**Changes Required:**

```typescript
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'card' | 'upi';
}

const Payment = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>();

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const { data } = await apiClient.post('/orders/create', orderData);
      return data;
    },
    onSuccess: (data) => {
      if (data.order.paymentMethod === 'cod') {
        clearCart();
        navigate(`/payment-success?orderId=${data.order.id}`);
      } else {
        // Redirect to payment gateway
        window.location.href = data.paymentUrl;
      }
    },
    onError: () => {
      toast.error('Failed to create order');
    },
  });

  const onSubmit = (formData: CheckoutForm) => {
    const orderData = {
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.price,
      })),
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      paymentMethod: formData.paymentMethod,
      totalAmount: totalPrice * 1.18 + (totalPrice > 500 ? 0 : 50),
    };

    createOrderMutation.mutate(orderData);
  };

  return (
    <div>
      <h1>Checkout</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Shipping address form */}
        <div>
          <h2>Shipping Address</h2>
          <input {...register('fullName', { required: true })} placeholder="Full Name" />
          <input {...register('email', { required: true })} type="email" placeholder="Email" />
          <input {...register('phone', { required: true })} placeholder="Phone" />
          <textarea {...register('address', { required: true })} placeholder="Address" />
          <input {...register('city', { required: true })} placeholder="City" />
          <input {...register('state', { required: true })} placeholder="State" />
          <input {...register('pincode', { required: true })} placeholder="Pincode" />
        </div>
        
        {/* Payment method selection */}
        <div>
          <h2>Payment Method</h2>
          <label>
            <input type="radio" {...register('paymentMethod')} value="cod" />
            Cash on Delivery
          </label>
          <label>
            <input type="radio" {...register('paymentMethod')} value="card" />
            Credit/Debit Card
          </label>
          <label>
            <input type="radio" {...register('paymentMethod')} value="upi" />
            UPI
          </label>
        </div>
        
        {/* Order summary */}
        <div>
          <h2>Order Summary</h2>
          {items.map(item => (
            <div key={item.id}>
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <p>Total: ₹{(totalPrice * 1.18 + (totalPrice > 500 ? 0 : 50)).toFixed(2)}</p>
        </div>
        
        <button type="submit" disabled={createOrderMutation.isLoading}>
          {createOrderMutation.isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};
```

**APIs Used:**
- `POST /api/orders/create` - Create order
- `POST /api/payment/process` - Process payment (if not COD)

---

### 5. **src/pages/Orders.tsx**

**Current State:**
- Hardcoded orders array

**Changes Required:**

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Orders = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch user's orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await apiClient.get('/orders');
      return data.orders;
    },
  });

  // Cancel order mutation
  const cancelOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const { data } = await apiClient.put(`/orders/${orderId}/cancel`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order cancelled successfully');
    },
  });

  // Return order mutation
  const returnOrderMutation = useMutation({
    mutationFn: async ({ orderId, reason }: any) => {
      const { data } = await apiClient.post(`/orders/${orderId}/return`, { reason });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Return request submitted');
    },
  });

  if (isLoading) return <SkeletonLoader />;

  return (
    <div>
      <h1>My Orders</h1>
      
      {orders.length === 0 ? (
        <div>No orders yet</div>
      ) : (
        orders.map((order: any) => (
          <div key={order.id} className="order-card">
            <div>
              <h3>Order #{order.orderNumber}</h3>
              <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <p>Total: ₹{order.totalAmount}</p>
            </div>
            
            <div>
              {order.items.map((item: any) => (
                <div key={item.id}>
                  <img src={item.product.image} alt={item.product.name} />
                  <div>
                    <p>{item.product.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              {order.status === 'pending' && (
                <button onClick={() => cancelOrderMutation.mutate(order.id)}>
                  Cancel Order
                </button>
              )}
              {order.status === 'delivered' && (
                <button onClick={() => returnOrderMutation.mutate({ 
                  orderId: order.id, 
                  reason: 'Not satisfied' 
                })}>
                  Return Order
                </button>
              )}
              <button onClick={() => navigate(`/orders/${order.id}`)}>
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
```

**APIs Used:**
- `GET /api/orders` - Fetch user's orders
- `GET /api/orders/:id` - Order details
- `PUT /api/orders/:id/cancel` - Cancel order
- `POST /api/orders/:id/return` - Return order

---

### 6. **src/pages/Wishlist.tsx**

**Current State:**
- Hardcoded wishlist items

**Changes Required:**

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const queryClient = useQueryClient();
  const { addItem } = useCart();

  // Fetch wishlist
  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const { data } = await apiClient.get('/wishlist');
      return data.items;
    },
  });

  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await apiClient.delete(`/wishlist/item/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Removed from wishlist');
    },
  });

  // Move to cart mutation
  const moveToCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const { data } = await apiClient.post(`/wishlist/move-to-cart/${itemId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Moved to cart');
    },
  });

  if (isLoading) return <SkeletonLoader />;

  return (
    <div>
      <h1>My Wishlist ({wishlistItems.length})</h1>
      
      {wishlistItems.length === 0 ? (
        <div>Your wishlist is empty</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlistItems.map((item: any) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.product.image} alt={item.product.name} />
              <h3>{item.product.name}</h3>
              <p>₹{item.product.price}</p>
              
              <button onClick={() => moveToCartMutation.mutate(item.id)}>
                Move to Cart
              </button>
              <button onClick={() => removeFromWishlistMutation.mutate(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

**APIs Used:**
- `GET /api/wishlist` - Fetch wishlist
- `DELETE /api/wishlist/item/:id` - Remove from wishlist
- `POST /api/wishlist/move-to-cart/:id` - Move to cart

---

### 7. **src/pages/Profile.tsx**

**Current State:**
- Static user data display

**Changes Required:**

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch full profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await apiClient.get('/user/profile');
      return data.profile;
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      const { data } = await apiClient.put('/user/profile', profileData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully');
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async (passwordData: any) => {
      const { data } = await apiClient.put('/user/change-password', passwordData);
      return data;
    },
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
  });

  // Fetch addresses
  const { data: addresses = [] } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const { data } = await apiClient.get('/user/addresses');
      return data.addresses;
    },
  });

  // Add address mutation
  const addAddressMutation = useMutation({
    mutationFn: async (addressData: any) => {
      const { data } = await apiClient.post('/user/addresses', addressData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Address added');
    },
  });

  // Delete address mutation
  const deleteAddressMutation = useMutation({
    mutationFn: async (addressId: string) => {
      await apiClient.delete(`/user/addresses/${addressId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Address deleted');
    },
  });

  if (isLoading) return <SkeletonLoader />;

  return (
    <div>
      <h1>My Profile</h1>
      
      {/* Profile info section */}
      <section>
        <h2>Personal Information</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          // Handle profile update
        }}>
          <input name="name" defaultValue={profile?.name} />
          <input name="email" defaultValue={profile?.email} />
          <input name="phone" defaultValue={profile?.phone} />
          <button type="submit">Save Changes</button>
        </form>
      </section>
      
      {/* Change password section */}
      <section>
        <h2>Change Password</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          // Handle password change
        }}>
          <input type="password" placeholder="Current Password" />
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm New Password" />
          <button type="submit">Change Password</button>
        </form>
      </section>
      
      {/* Addresses section */}
      <section>
        <h2>Saved Addresses</h2>
        {addresses.map((address: any) => (
          <div key={address.id}>
            <p>{address.fullName}</p>
            <p>{address.address}, {address.city}, {address.state} - {address.pincode}</p>
            <button onClick={() => deleteAddressMutation.mutate(address.id)}>
              Delete
            </button>
          </div>
        ))}
        <button>Add New Address</button>
      </section>
    </div>
  );
};
```

**APIs Used:**
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/change-password` - Change password
- `GET /api/user/addresses` - Get addresses
- `POST /api/user/addresses` - Add address
- `DELETE /api/user/addresses/:id` - Delete address

---

### 8. **src/pages/Login.tsx**

**Current State:**
- Mock login form

**Changes Required:**

```typescript
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login, register: registerUser } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onLoginSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  const onRegisterSubmit = async (data: any) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      toast.success('Registration successful');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div>
      {isLoginMode ? (
        <form onSubmit={handleSubmit(onLoginSubmit)}>
          <h2>Login</h2>
          <input 
            {...register('email', { required: true })} 
            type="email" 
            placeholder="Email" 
          />
          <input 
            {...register('password', { required: true })} 
            type="password" 
            placeholder="Password" 
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account? 
            <button type="button" onClick={() => setIsLoginMode(false)}>
              Register
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onRegisterSubmit)}>
          <h2>Register</h2>
          <input {...register('name', { required: true })} placeholder="Name" />
          <input {...register('email', { required: true })} type="email" placeholder="Email" />
          <input {...register('phone', { required: true })} placeholder="Phone" />
          <input {...register('password', { required: true })} type="password" placeholder="Password" />
          <button type="submit">Register</button>
          <p>
            Already have an account? 
            <button type="button" onClick={() => setIsLoginMode(true)}>
              Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
};
```

**APIs Used:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Forgot password

---

### 9. **src/pages/Men.tsx** (and Women, Kids, etc.)

**Current State:**
- Static product arrays
- Hardcoded filters

**Changes Required:**

```typescript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useSearchParams } from 'react-router-dom';

const Men = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    priceRange: searchParams.get('priceRange') || '',
    brand: searchParams.get('brand') || '',
    size: searchParams.get('size') || '',
    color: searchParams.get('color') || '',
    sortBy: searchParams.get('sortBy') || 'popular',
  });

  // Fetch products with filters
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', 'men', filters, searchParams.get('page')],
    queryFn: async () => {
      const { data } = await apiClient.get('/products', {
        params: {
          category: 'men',
          page: searchParams.get('page') || 1,
          limit: 24,
          ...filters,
        },
      });
      return data;
    },
  });

  // Fetch available filters for men's category
  const { data: availableFilters } = useQuery({
    queryKey: ['filters', 'men'],
    queryFn: async () => {
      const { data } = await apiClient.get('/categories/men/filters');
      return data;
    },
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({ ...filters, [filterName]: value });
    searchParams.set(filterName, value);
    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  if (isLoading) return <SkeletonLoader />;

  return (
    <div>
      <h1>Men's Fashion</h1>
      
      {/* Filters sidebar */}
      <aside>
        <h3>Filters</h3>
        
        {/* Price filter */}
        <div>
          <h4>Price</h4>
          {availableFilters?.priceRanges.map((range: any) => (
            <label key={range.value}>
              <input 
                type="radio" 
                name="price"
                value={range.value}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              />
              {range.label}
            </label>
          ))}
        </div>
        
        {/* Brand filter */}
        <div>
          <h4>Brand</h4>
          {availableFilters?.brands.map((brand: any) => (
            <label key={brand.id}>
              <input 
                type="checkbox"
                value={brand.name}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              />
              {brand.name}
            </label>
          ))}
        </div>
        
        {/* Size filter */}
        <div>
          <h4>Size</h4>
          {availableFilters?.sizes.map((size: string) => (
            <button 
              key={size}
              onClick={() => handleFilterChange('size', size)}
            >
              {size}
            </button>
          ))}
        </div>
      </aside>
      
      {/* Products grid */}
      <main>
        {/* Sort options */}
        <div>
          <select onChange={(e) => handleFilterChange('sortBy', e.target.value)}>
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productsData?.products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Pagination */}
        <div>
          {Array.from({ length: productsData?.totalPages }, (_, i) => (
            <button 
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
```

**APIs Used:**
- `GET /api/products?category=men&page=1&limit=24` - Fetch men's products
- `GET /api/categories/men/filters` - Get available filters
- `GET /api/brands?category=men` - Get brands

---

### 10. **src/components/Layout.tsx**

**Current State:**
- Static header with hardcoded cart count

**Changes Required:**

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Bell } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Fetch categories for menu
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await apiClient.get('/categories');
      return data.categories;
    },
  });

  // Fetch notifications (if logged in)
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await apiClient.get('/notifications');
      return data.notifications;
    },
    enabled: !!user,
  });

  return (
    <div>
      <header>
        <div className="logo">Obeyyo</div>
        
        {/* Search bar */}
        <div>
          <input 
            type="search" 
            placeholder="Search products..." 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate(`/search?q=${e.currentTarget.value}`);
              }
            }}
          />
        </div>
        
        {/* Navigation */}
        <nav>
          {categories.map((cat: any) => (
            <Link key={cat.id} to={`/${cat.slug}`}>
              {cat.name}
            </Link>
          ))}
        </nav>
        
        {/* User section */}
        <div>
          {user ? (
            <>
              <Link to="/wishlist">
                <Heart />
              </Link>
              <Link to="/cart">
                <ShoppingCart />
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>
              <Link to="/notifications">
                <Bell />
                {notifications.length > 0 && <span>{notifications.length}</span>}
              </Link>
              <div>
                <img src={user.avatar} alt={user.name} />
                <div>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <button onClick={logout}>Logout</button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header>
      
      <main>{children}</main>
      
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};
```

**APIs Used:**
- `GET /api/categories` - Menu categories
- `GET /api/cart/count` - Cart count (via CartContext)
- `GET /api/notifications` - User notifications

---

### 11. **src/components/ProductCard.tsx**

**Current State:**
- Static component with no API interactionss

**Changes Required:**

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    brand: string;
    isNew?: boolean;
    isTrending?: boolean;
    isWishlisted?: boolean;
  };
  compact?: boolean;
}

const ProductCard = ({ product, compact }: ProductCardProps) => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false);

  // Toggle wishlist mutation
  const toggleWishlistMutation = useMutation({
    mutationFn: async () => {
      if (isWishlisted) {
        await apiClient.delete(`/wishlist/product/${product.id}`);
      } else {
        await apiClient.post('/wishlist/add', { productId: product.id });
      }
    },
    onSuccess: () => {
      setIsWishlisted(!isWishlisted);
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    },
  });

  // Track product view
  const trackViewMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post(`/products/${product.id}/view`);
    },
  });

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    addItem(product.id, 1);
    toast.success('Added to cart');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    toggleWishlistMutation.mutate();
  };

  const handleCardClick = () => {
    trackViewMutation.mutate();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="image-container">
        <img src={product.image} alt={product.name} />
        {product.isNew && <span className="badge">NEW</span>}
        {product.isTrending && <span className="badge">🔥</span>}
        <button 
          className="wishlist-btn"
          onClick={handleWishlistToggle}
        >
          <Heart fill={isWishlisted ? 'red' : 'none'} />
        </button>
      </div>
      
      <div className="product-info">
        <p className="brand">{product.brand}</p>
        <h3 className="name">{product.name}</h3>
        <div className="rating">
          <Star /> {product.rating} ({product.reviews})
        </div>
        <div className="price">
          <span className="current">₹{product.price}</span>
          {product.originalPrice && (
            <span className="original">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
      
      {!compact && (
        <button className="quick-add" onClick={handleQuickAdd}>
          Quick Add
        </button>
      )}
    </div>
  );
};
```

**APIs Used:**
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/product/:id` - Remove from wishlist
- `POST /api/products/:id/view` - Track product view
- `POST /api/cart/add` - Add to cart (via CartContext)

---

## Environment Variables Setup

Create `.env` file in root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Obeyyo
```

For production:
```env
VITE_API_BASE_URL=https://api.obeyyo.com/api
VITE_APP_NAME=Obeyyo
```

---

## Summary Checklist

### Installation Steps
1. ✅ Install axios and react-query
2. ✅ Create API client (`src/lib/api.ts`)
3. ✅ Setup React Query provider in `main.tsx`
4. ✅ Create Auth Context
5. ✅ Create Cart Context
6. ✅ Create custom hooks for each API resource

### Pages to Update
1. ✅ Index.tsx - Replace all static data with API calls
2. ✅ ProductDetail.tsx - Fetch product, reviews, related products
3. ✅ Cart.tsx - Use CartContext, add coupon functionality
4. ✅ Payment.tsx - Integrate order creation and payment
5. ✅ Orders.tsx - Fetch and display user orders
6. ✅ Wishlist.tsx - Fetch and manage wishlist
7. ✅ Profile.tsx - Fetch/update profile, addresses
8. ✅ Login.tsx - Integrate auth APIs
9. ✅ Men/Women/Kids/etc. - Dynamic filtering and pagination
10. ✅ Admin.tsx - All admin CRUD operations

### Components to Update
1. ✅ Layout.tsx - Dynamic categories, cart count, notifications
2. ✅ ProductCard.tsx - Wishlist toggle, view tracking
3. ✅ ImageCarousel.tsx - Dynamic banner data
4. ✅ All home sections - Replace static with API data

### Testing
1. Test each page individually
2. Test authentication flow
3. Test cart operations
4. Test order placement
5. Test admin operations
6. Test error handling and loading states

---

## Best Practices

1. **Always show loading states** - Use SkeletonLoader components
2. **Handle errors gracefully** - Show toast messages for errors
3. **Invalidate queries** - After mutations, invalidate related queries
4. **Optimize API calls** - Use React Query's caching effectively
5. **Protect routes** - Redirect to login for authenticated pages
6. **Type everything** - Use TypeScript interfaces for all API responses
7. **Environment variables** - Never hardcode API URLs

---

This completes the comprehensive frontend documentation and API integration guide. Follow these steps systematically to convert your static Obeyyo e-commerce frontend into a fully dynamic application connected to your Express/Node.js backend.
