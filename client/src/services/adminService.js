import api from '../api/axios';

// Get all users
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch users' };
  }
};

// Get user statistics
export const getUserStats = async () => {
  try {
    const response = await api.get('/users/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch user stats' };
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to delete user' };
  }
};

// Get all bookings
export const getBookings = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch bookings' };
  }
};

// Get booking statistics
export const getBookingStats = async () => {
  try {
    const response = await api.get('/bookings/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch booking stats' };
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await api.put(`/bookings/${bookingId}`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update booking status' };
  }
};

// Get all bookings with filters
export const fetchBookings = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page);
    if (filters.perPage) params.append('limit', filters.perPage);
    
    const response = await api.get(`/bookings?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch bookings' };
  }
};

// Get all rooms
export const getRooms = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch rooms' };
  }
};

// Get room by ID
export const fetchRoomById = async (roomId) => {
  try {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch room' };
  }
};

// Update room
export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await api.put(`/rooms/${roomId}`, roomData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update room' };
  }
};

// Create room
export const createRoom = async (roomData) => {
  try {
    const response = await api.post('/rooms', roomData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to create room' };
  }
};

// Delete room
export const deleteRoom = async (roomId) => {
  try {
    const response = await api.delete(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to delete room' };
  }
};
