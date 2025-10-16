import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';

export const productService = {
  // Get all products with filters
  getAllProducts: async (filters = {}) => {
    try {
      const response = await API.get(API_ENDPOINTS.PRODUCTS.GET_ALL, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await API.get(`${API_ENDPOINTS.PRODUCTS.GET_BY_ID}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit = 10) => {
    try {
      const response = await API.get(API_ENDPOINTS.PRODUCTS.FEATURED, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get trending products
  getTrendingProducts: async (limit = 10) => {
    try {
      const response = await API.get(API_ENDPOINTS.PRODUCTS.TRENDING, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get new arrivals
  getNewArrivals: async (limit = 10) => {
    try {
      const response = await API.get(API_ENDPOINTS.PRODUCTS.NEW_ARRIVALS, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get related products
  getRelatedProducts: async (productId, limit = 6) => {
    try {
      const response = await API.get(`${API_ENDPOINTS.PRODUCTS.RELATED}/${productId}`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    try {
      const response = await API.get(API_ENDPOINTS.PRODUCTS.SEARCH, {
        params: { q: query, ...filters },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default productService;