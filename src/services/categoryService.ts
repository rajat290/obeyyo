import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';
import { ApiResponse } from '../types';

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  parentId?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  productCount?: number;
}

export const categoryService = {
  // Get all categories
  getCategories: async (): Promise<ApiResponse<{ categories: Category[] }>> => {
    try {
      const response = await API.get<ApiResponse<{ categories: Category[] }>>(API_ENDPOINTS.CATEGORIES.GET_ALL);
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get brands
  getBrands: async (category?: string): Promise<ApiResponse<{ brands: Brand[] }>> => {
    try {
      const response = await API.get<ApiResponse<{ brands: Brand[] }>>('/brands', {
        params: { category },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get category filters
  getCategoryFilters: async (categorySlug: string): Promise<ApiResponse<any>> => {
    try {
      const response = await API.get<ApiResponse<any>>(`/categories/${categorySlug}/filters`);
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default categoryService;