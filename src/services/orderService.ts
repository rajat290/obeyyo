import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await API.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get user orders
  getOrders: async (filters = {}) => {
    try {
      const response = await API.get(API_ENDPOINTS.ORDERS.GET_ALL, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await API.get(`${API_ENDPOINTS.ORDERS.GET_BY_ID}/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Cancel order
  cancelOrder: async (orderId, reason = '') => {
    try {
      const response = await API.post(`${API_ENDPOINTS.ORDERS.CANCEL}/${orderId}/cancel`, {
        reason,
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Track order
  trackOrder: async (orderId) => {
    try {
      const response = await API.get(`${API_ENDPOINTS.ORDERS.GET_BY_ID}/${orderId}/track`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default orderService;