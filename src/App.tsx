import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/userCart';
import { WishlistProvider } from './hooks/useWishlist';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import UserReviews from './pages/UserReviews';
import { analyticsService } from './services/analyticsService';
import './App.css';

// Analytics component to track page views
const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    analyticsService.trackPageView(location.pathname);
  }, [location]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize analytics
    analyticsService.initialize();
  }, []);

  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
            >
              Reload Application
            </button>
          </div>
        </div>
      }
      onError={(error, errorInfo) => {
        // Send error to error reporting service
        console.error('Application Error:', error, errorInfo);
      }}
    >
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <AnalyticsTracker />
              <div className="App">
                <Header />
                <main className="min-h-screen">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:orderId" element={<OrderDetails />} />
                    <Route path="/reviews" element={<UserReviews />} />
                    
                    {/* Category Routes */}
                    <Route path="/men" element={<CategoryPage />} />
                    <Route path="/women" element={<CategoryPage />} />
                    <Route path="/kids" element={<CategoryPage />} />
                    <Route path="/category/:category" element={<CategoryPage />} />
                    
                    {/* Products Route */}
                    <Route path="/products" element={<CategoryPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;