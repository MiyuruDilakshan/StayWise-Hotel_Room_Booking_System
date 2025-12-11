import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/MyBookings.css';

const bookings = [
  {
    id: '123456',
    roomType: 'Deluxe Suite',
    checkIn: '2024-08-15',
    checkOut: '2024-08-20',
    totalPrice: 500,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '789012',
    roomType: 'Standard Room',
    checkIn: '2024-07-01',
    checkOut: '2024-07-05',
    totalPrice: 300,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d577acf54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const MyBookings = () => {
  const navigate = useNavigate();   // ← add this

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

        {/* BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate("/profile")}
        >
          Back to User Profile
        </button>
      </div>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-info">
              <h3>Booking ID: {booking.id}</h3>
              <p><strong>Room Type:</strong> {booking.roomType}</p>
              <p><strong>Check-in:</strong> {booking.checkIn}</p>
              <p><strong>Check-out:</strong> {booking.checkOut}</p>
              <p className="price"><strong>Total Price:</strong> ${booking.totalPrice}</p>
              <button className="view-details-btn">View Details</button>
            </div>
            <div className="booking-image">
              <img src={booking.image} alt={booking.roomType} />
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="no-bookings">
          <p>You have no bookings yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
