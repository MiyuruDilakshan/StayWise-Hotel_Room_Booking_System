// client/src/services/adminSettingsService.js
import axios from '../api/axios';

const API_URL = '/admin-settings';

const adminSettingsService = {
  // Get admin profile
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/profile`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update admin profile
  updateProfile: async (profileData) => {
    try {
      const response = await axios.put(`${API_URL}/profile`, profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await axios.post(`${API_URL}/change-password`, {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get hotel info
  getHotelInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/hotel-info`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update hotel info
  updateHotelInfo: async (hotelData) => {
    try {
      const response = await axios.put(`${API_URL}/hotel-info`, hotelData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default adminSettingsService;
