import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';

export const cartService = {
  // Get user cart
  getCart: async () => {
    try {
      const response = await API.get(API_ENDPOINTS.CART.GET);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Add item to cart
  addToCart: async (cartItem) => {
    try {
      const response = await API.post(API_ENDPOINTS.CART.ADD_ITEM, cartItem);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await API.put(`${API_ENDPOINTS.CART.UPDATE_ITEM}/${itemId}`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      const response = await API.delete(`${API_ENDPOINTS.CART.REMOVE_ITEM}/${itemId}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await API.delete(API_ENDPOINTS.CART.CLEAR);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Apply coupon code
  applyCoupon: async (couponCode) => {
    try {
      const response = await API.post(API_ENDPOINTS.COUPONS.VALIDATE, {
        code: couponCode,
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default cartService;