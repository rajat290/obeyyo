import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    brand: string;
  };
  variant?: {
    size?: string;
    color?: string;
  };
  quantity: number;
  price: number;
  total: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
  addToCart: (productId: string, quantity: number, variant?: any) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  coupon: any;
  discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<any>(null);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.total, 0);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
      setCoupon(null);
      setDiscount(0);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/cart');
      setCart(response.data.data.items || []);
      setCoupon(response.data.data.coupon || null);
      setDiscount(response.data.data.discount || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number, variant?: any) => {
    try {
      setIsLoading(true);
      await api.post('/cart/add', { productId, quantity, variant });
      await fetchCart(); // Refresh cart
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      setIsLoading(true);
      await api.put('/cart/update', { itemId, quantity });
      await fetchCart(); // Refresh cart
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setIsLoading(true);
      await api.delete(`/cart/${itemId}`);
      await fetchCart(); // Refresh cart
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      await api.post('/cart/clear');
      setCart([]);
      setCoupon(null);
      setDiscount(0);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const applyCoupon = async (code: string) => {
    try {
      setIsLoading(true);
      const response = await api.post('/cart/coupon', { code });
      setCoupon(response.data.data.coupon);
      setDiscount(response.data.data.discount);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeCoupon = async () => {
    try {
      setIsLoading(true);
      await api.delete('/cart/coupon');
      setCoupon(null);
      setDiscount(0);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: CartContextType = {
    cart,
    cartCount,
    cartTotal,
    isLoading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    coupon,
    discount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
