import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';
import { LoginData, RegisterData, ApiResponse, User } from '../types';

export interface LoginResponse {
  user: User;
  token: string;
}

export const authService = {
  // Login user
  login: async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await API.post<ApiResponse<LoginResponse>>(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Register user
  register: async (userData: RegisterData): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await API.post<ApiResponse<LoginResponse>>(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await API.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error: any) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
};

export default authService;