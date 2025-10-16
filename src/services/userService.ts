import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';

export const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await API.get(API_ENDPOINTS.USER.PROFILE);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await API.put(API_ENDPOINTS.USER.UPDATE_PROFILE, profileData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get user addresses
  getAddresses: async () => {
    try {
      const response = await API.get(API_ENDPOINTS.USER.ADDRESSES);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Add new address
  addAddress: async (addressData) => {
    try {
      const response = await API.post(API_ENDPOINTS.USER.ADDRESSES, addressData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Update address
  updateAddress: async (addressId, addressData) => {
    try {
      const response = await API.put(`${API_ENDPOINTS.USER.ADDRESSES}/${addressId}`, addressData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Delete address
  deleteAddress: async (addressId) => {
    try {
      const response = await API.delete(`${API_ENDPOINTS.USER.ADDRESSES}/${addressId}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Set default address
  setDefaultAddress: async (addressId) => {
    try {
      const response = await API.patch(`${API_ENDPOINTS.USER.ADDRESSES}/${addressId}/default`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default userService;