import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';
import { Cart, CartItem, ApiResponse } from '../types';

export interface AddToCartData {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface UpdateCartItemData {
  quantity: number;
}

export const cartService = {
  // Get user cart
  getCart: async (): Promise<ApiResponse<{ cart: Cart }>> => {
    try {
      const response = await API.get<ApiResponse<{ cart: Cart }>>(API_ENDPOINTS.CART.GET);
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Add item to cart
  addToCart: async (cartItem: AddToCartData): Promise<ApiResponse<{ cart: Cart }>> => {
    try {
      const response = await API.post<ApiResponse<{ cart: Cart }>>(
        API_ENDPOINTS.CART.ADD_ITEM, 
        cartItem
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId: string, quantity: number): Promise<ApiResponse<{ cart: Cart }>> => {
    try {
      const response = await API.put<ApiResponse<{ cart: Cart }>>(
        `${API_ENDPOINTS.CART.UPDATE_ITEM}/${itemId}`,
        { quantity }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId: string): Promise<ApiResponse<{ cart: Cart }>> => {
    try {
      const response = await API.delete<ApiResponse<{ cart: Cart }>>(
        `${API_ENDPOINTS.CART.REMOVE_ITEM}/${itemId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Clear entire cart
  clearCart: async (): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await API.delete<ApiResponse<{ message: string }>>(API_ENDPOINTS.CART.CLEAR);
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default cartService;