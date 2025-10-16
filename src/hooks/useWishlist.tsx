import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import wishlistService, { WishlistItem } from '../services/wishlistService';
import { getErrorMessage } from '../utils/helpers';

interface WishlistState {
  wishlist: WishlistItem[];
  loading: boolean;
  error: string | null;
}

type WishlistAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_WISHLIST'; payload: WishlistItem[] }
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' };

interface WishlistContextType {
  wishlist: WishlistItem[];
  loading: boolean;
  error: string | null;
  getWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  checkInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.payload, error: null };
    case 'ADD_TO_WISHLIST':
      // Check if item already exists
      const exists = state.wishlist.find(item => item.productId === action.payload.productId);
      if (exists) {
        return state;
      }
      return {
        ...state,
        wishlist: [action.payload, ...state.wishlist],
        error: null,
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.productId !== action.payload),
        error: null,
      };
    case 'CLEAR_WISHLIST':
      return { ...state, wishlist: [], error: null };
    default:
      return state;
  }
};

const initialState: WishlistState = {
  wishlist: [],
  loading: false,
  error: null,
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const setLoading = (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading });
  const setError = (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error });

  const getWishlist = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await wishlistService.getWishlist();
      dispatch({ type: 'SET_WISHLIST', payload: response.data?.wishlist || [] });
    } catch (error: any) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Optimistic update
      const optimisticItem: WishlistItem = {
        id: `temp-${productId}`,
        productId,
        product: {} as any, // Will be updated when we refetch
        addedAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_TO_WISHLIST', payload: optimisticItem });
      
      await wishlistService.addToWishlist(productId);
      
      // Refetch to get complete product data
      await getWishlist();
    } catch (error: any) {
      setError(getErrorMessage(error));
      // Revert optimistic update on error
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Optimistic update
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
      
      await wishlistService.removeFromWishlist(productId);
    } catch (error: any) {
      setError(getErrorMessage(error));
      // Revert optimistic update on error
      await getWishlist();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkInWishlist = (productId: string): boolean => {
    return state.wishlist.some(item => item.productId === productId);
  };

  const clearWishlist = (): void => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const wishlistCount = state.wishlist.length;

  const value: WishlistContextType = {
    wishlist: state.wishlist,
    loading: state.loading,
    error: state.error,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    checkInWishlist,
    clearWishlist,
    wishlistCount,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default useWishlist;