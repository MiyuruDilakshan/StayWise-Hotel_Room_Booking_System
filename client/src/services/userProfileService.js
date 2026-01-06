import api from '../api/axios';

// Get current user profile
export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch user profile' };
  }
};

// Update user profile
export const updateUserProfile = async (userId, updates) => {
  try {
    const response = await api.put(`/users/${userId}`, updates);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update user profile' };
  }
};

// Upload profile image
export const uploadProfileImage = async (userId, formData) => {
  try {
    const response = await api.post(`/users/${userId}/upload-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to upload image' };
  }
};

// Get user bookings
export const getUserBookings = async (userId) => {
  try {
    const response = await api.get(`/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch bookings' };
  }
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  try {
    const response = await api.put(`/bookings/${bookingId}`, { status: 'cancelled' });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to cancel booking' };
  }
};

// Change password
export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await api.post(`/users/${userId}/change-password`, {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to change password' };
  }
};

// Update notification settings
export const updateNotificationSettings = async (userId, settings) => {
  try {
    const response = await api.put(`/users/${userId}/notifications`, settings);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update notification settings' };
  }
};

