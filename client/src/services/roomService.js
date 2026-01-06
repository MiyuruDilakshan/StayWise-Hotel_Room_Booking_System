import axios from '../api/axios';

const roomService = {
  // Get all rooms
  async getAllRooms() {
    try {
      const response = await axios.get('/rooms');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single room by ID
  async getRoomById(roomId) {
    try {
      const response = await axios.get(`/rooms/${roomId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create booking
  async createBooking(bookingData) {
    try {
      const response = await axios.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user's bookings
  async getUserBookings(userId) {
    try {
      const response = await axios.get(`/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get booking details
  async getBookingDetails(bookingId) {
    try {
      const response = await axios.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cancel booking
  async cancelBooking(bookingId) {
    try {
      const response = await axios.put(`/bookings/${bookingId}`, {
        status: 'cancelled',
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default roomService;
