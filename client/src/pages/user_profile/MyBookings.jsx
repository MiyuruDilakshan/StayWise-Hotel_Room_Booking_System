import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserBookings, cancelBooking } from '../../services/userProfileService';
import '../../styles/MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const userId = storedUser?._id || storedUser?.id;
        
        if (!storedUser || !userId) {
          setError('User not found. Please log in again.');
          navigate('/login');
          return;
        }

        const response = await getUserBookings(userId);
        setBookings(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error loading bookings:', err);
        setError(err.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
        setBookings(bookings.filter(b => b._id !== bookingId));
      } catch (err) {
        alert(err.message || 'Failed to cancel booking');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoomImage = (booking) => {
    // 1. Check for stored snapshot image on the booking itself
    if (booking.roomImage) {
      return booking.roomImage;
    }

    const room = booking.room;
    if (room && room.images && room.images.length > 0) {
      // Check if it's a base64 object (from our backend conversion) or a string
      const firstImage = room.images[0];
      if (typeof firstImage === 'object' && firstImage.src) {
        return firstImage.src;
      }
      return firstImage;
    }
    // Fallback to room.image if it exists (legacy string path)
    if (room && room.image) {
      return room.image;
    }
    return 'https://via.placeholder.com/200';
  };

  if (loading) {
    return (
      <div className="my-bookings-container">
        <div className="loading">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="my-bookings-container">
      <div className="breadcrumbs">
        <span onClick={() => navigate("/profile")} className="link">
          User Profile
        </span>
        {' / '}
        <span className="current">My Bookings</span>
      </div>

      <div className="page-header">
        <h1>My Bookings</h1>
        <button
          className="back-btn"
          onClick={() => navigate("/profile")}
        >
          Back to User Profile
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="bookings-list">
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <p>You have no bookings yet.</p>
            <button onClick={() => navigate('/rooms')} className="browse-rooms-btn">
              Browse Rooms
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-info">
                <h3>Booking ID: {booking._id}</h3>
                <p><strong>Room:</strong> {booking.room?.name || 'Unknown'}</p>
                <p><strong>Check-in:</strong> {formatDate(booking.checkIn)}</p>
                <p><strong>Check-out:</strong> {formatDate(booking.checkOut)}</p>
                <p><strong>Guests:</strong> {booking.guests}</p>
                <p className="price"><strong>Total Price:</strong> ${booking.totalPrice}</p>
                <p><strong>Status:</strong> <span className={`status-badge status-${booking.status}`}>{booking.status}</span></p>
                {booking.specialRequests && (
                  <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                )}
                <div className="booking-actions">
                  {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <button 
                      className="cancel-btn"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
              <div className="booking-image">
                <img src={getRoomImage(booking)} alt={booking.room?.name || 'Room'} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
