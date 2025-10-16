import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';
import { Product, ApiResponse } from '../types';

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface WishlistResponse {
  wishlist: WishlistItem[];
}

export const wishlistService = {
  // Get user wishlist
  getWishlist: async (): Promise<ApiResponse<WishlistResponse>> => {
    try {
      const response = await API.get<ApiResponse<WishlistResponse>>(API_ENDPOINTS.WISHLIST.GET);
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Add item to wishlist
  addToWishlist: async (productId: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await API.post<ApiResponse<{ message: string }>>(API_ENDPOINTS.WISHLIST.ADD, {
        productId,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Remove item from wishlist
  removeFromWishlist: async (productId: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await API.delete<ApiResponse<{ message: string }>>(
        `${API_ENDPOINTS.WISHLIST.REMOVE}/${productId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Check if product is in wishlist
  checkInWishlist: async (productId: string): Promise<ApiResponse<{ inWishlist: boolean }>> => {
    try {
      const response = await API.get<ApiResponse<{ inWishlist: boolean }>>(
        `${API_ENDPOINTS.WISHLIST.GET}/check/${productId}`
      );
      return response.data;
    } catch (error: any) {
      // If endpoint doesn't exist, return false
      return { success: true, data: { inWishlist: false } };
    }
  },

  // Move item from wishlist to cart
  moveToCart: async (productId: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await API.post<ApiResponse<{ message: string }>>(
        `${API_ENDPOINTS.WISHLIST.REMOVE}/${productId}/move-to-cart`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default wishlistService;