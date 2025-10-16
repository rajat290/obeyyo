import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';
import { Product, ProductFilters, ApiResponse, PaginatedResponse } from '../types';

export const productService = {
  // Get all products with filters
  getAllProducts: async (filters: ProductFilters = {}): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    try {
      const response = await API.get<ApiResponse<PaginatedResponse<Product>>>(API_ENDPOINTS.PRODUCTS.GET_ALL, {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit: number = 10): Promise<ApiResponse<{ products: Product[] }>> => {
    try {
      const response = await API.get<ApiResponse<{ products: Product[] }>>(API_ENDPOINTS.PRODUCTS.FEATURED, {
        params: { limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
   // Get product by ID
  getProductById: async (id: string): Promise<ApiResponse<{ product: Product }>> => {
    try {
      const response = await API.get<ApiResponse<{ product: Product }>>(
        `${API_ENDPOINTS.PRODUCTS.GET_BY_ID}/${id}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get related products
  getRelatedProducts: async (productId: string, limit: number = 4): Promise<ApiResponse<{ products: Product[] }>> => {
    try {
      const response = await API.get<ApiResponse<{ products: Product[] }>>(
        `${API_ENDPOINTS.PRODUCTS.RELATED}/${productId}`,
        { params: { limit } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
  // Search products
  searchProducts: async (query: string, filters: ProductFilters = {}): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    try {
      const response = await API.get<ApiResponse<PaginatedResponse<Product>>>(API_ENDPOINTS.PRODUCTS.SEARCH, {
        params: { q: query, ...filters },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
  // Get trending products
  getTrendingProducts: async (limit: number = 10): Promise<ApiResponse<{ products: Product[] }>> => {
    try {
      const response = await API.get<ApiResponse<{ products: Product[] }>>(API_ENDPOINTS.PRODUCTS.TRENDING, {
        params: { limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get new arrivals
  getNewArrivals: async (limit: number = 10): Promise<ApiResponse<{ products: Product[] }>> => {
    try {
      const response = await API.get<ApiResponse<{ products: Product[] }>>(API_ENDPOINTS.PRODUCTS.NEW_ARRIVALS, {
        params: { limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get flash sale products
  getFlashSaleProducts: async (): Promise<ApiResponse<{ products: Product[]; saleEndsAt: string }>> => {
    try {
      const response = await API.get<ApiResponse<{ products: Product[]; saleEndsAt: string }>>('/flash-sales/active');
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default productService;