import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';

export const wishlistService = {
  // Get user wishlist
  getWishlist: async () => {
    try {
      const response = await API.get(API_ENDPOINTS.WISHLIST.GET);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Add item to wishlist
  addToWishlist: async (productId) => {
    try {
      const response = await API.post(API_ENDPOINTS.WISHLIST.ADD, {
        productId,
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Remove item from wishlist
  removeFromWishlist: async (productId) => {
    try {
      const response = await API.delete(`${API_ENDPOINTS.WISHLIST.REMOVE}/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Move item from wishlist to cart
  moveToCart: async (productId) => {
    try {
      const response = await API.post(`${API_ENDPOINTS.WISHLIST.REMOVE}/${productId}/move-to-cart`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Check if product is in wishlist
  checkInWishlist: async (productId) => {
    try {
      const response = await API.get(`${API_ENDPOINTS.WISHLIST.GET}/check/${productId}`);
      return response.data;
    } catch (error) {
      return { inWishlist: false };
    }
  },
};

export default wishlistService;