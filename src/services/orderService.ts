import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';
import { Order, ApiResponse, PaginatedResponse, Address } from '../types';

export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  shippingAddress: Address;
  paymentMethod: string;
  totalAmount: number;
}

export interface OrderResponse {
  order: Order;
}

export interface OrdersResponse {
  orders: Order[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const orderService = {
  // Create new order
  createOrder: async (orderData: CreateOrderData): Promise<ApiResponse<OrderResponse>> => {
    try {
      const response = await API.post<ApiResponse<OrderResponse>>(
        API_ENDPOINTS.ORDERS.CREATE,
        orderData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get user orders
  getOrders: async (filters: { page?: number; limit?: number; status?: string } = {}): Promise<ApiResponse<OrdersResponse>> => {
    try {
      const response = await API.get<ApiResponse<OrdersResponse>>(API_ENDPOINTS.ORDERS.GET_ALL, {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get order by ID
  getOrderById: async (orderId: string): Promise<ApiResponse<OrderResponse>> => {
    try {
      const response = await API.get<ApiResponse<OrderResponse>>(
        `${API_ENDPOINTS.ORDERS.GET_BY_ID}/${orderId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Cancel order
  cancelOrder: async (orderId: string, reason: string = ''): Promise<ApiResponse<OrderResponse>> => {
    try {
      const response = await API.post<ApiResponse<OrderResponse>>(
        `${API_ENDPOINTS.ORDERS.CANCEL}/${orderId}/cancel`,
        { reason }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Track order
  trackOrder: async (orderId: string): Promise<ApiResponse<{ status: string; trackingNumber?: string; updates: any[] }>> => {
    try {
      const response = await API.get<ApiResponse<{ status: string; trackingNumber?: string; updates: any[] }>>(
        `${API_ENDPOINTS.ORDERS.GET_BY_ID}/${orderId}/track`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Request return
  requestReturn: async (orderId: string, items: string[], reason: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await API.post<ApiResponse<{ message: string }>>(
        `${API_ENDPOINTS.ORDERS.GET_BY_ID}/${orderId}/return`,
        { items, reason }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default orderService;