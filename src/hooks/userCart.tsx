import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import cartService, { AddToCartData } from '../services/cartService';
import { Cart, CartItem } from '../types';
import { getErrorMessage } from '../utils/helpers';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CART'; payload: Cart }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_ITEM_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string };

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  getCart: () => Promise<void>;
  addToCart: (item: AddToCartData) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload, error: null };
    case 'CLEAR_CART':
      return { ...state, cart: null, error: null };
    case 'UPDATE_ITEM_QUANTITY':
      if (!state.cart) return state;
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map(item =>
            item.id === action.payload.itemId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        },
      };
    case 'REMOVE_ITEM':
      if (!state.cart) return state;
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter(item => item.id !== action.payload),
        },
      };
    default:
      return state;
  }
};

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const setLoading = (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading });
  const setError = (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error });

  const getCart = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartService.getCart();
      dispatch({ type: 'SET_CART', payload: response.data?.cart! });
    } catch (error: any) {
      setError(getErrorMessage(error));
      // If unauthorized, clear cart
      if (error.response?.status === 401) {
        dispatch({ type: 'CLEAR_CART' });
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item: AddToCartData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartService.addToCart(item);
      dispatch({ type: 'SET_CART', payload: response.data?.cart! });
    } catch (error: any) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number): Promise<void> => {
    try {
      if (quantity < 1) {
        await removeFromCart(itemId);
        return;
      }

      setLoading(true);
      setError(null);
      
      // Optimistic update
      dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { itemId, quantity } });
      
      const response = await cartService.updateCartItem(itemId, quantity);
      dispatch({ type: 'SET_CART', payload: response.data?.cart! });
    } catch (error: any) {
      setError(getErrorMessage(error));
      // Revert optimistic update on error
      await getCart();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Optimistic update
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
      
      await cartService.removeFromCart(itemId);
      // Refresh cart to get updated totals
      await getCart();
    } catch (error: any) {
      setError(getErrorMessage(error));
      // Revert optimistic update on error
      await getCart();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await cartService.clearCart();
      dispatch({ type: 'CLEAR_CART' });
    } catch (error: any) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cartCount = state.cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  const value: CartContextType = {
    cart: state.cart,
    loading: state.loading,
    error: state.error,
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};