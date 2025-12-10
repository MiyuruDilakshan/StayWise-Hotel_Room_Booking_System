import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Confirmation.css';

const CheckIcon = () => <span style={{ fontSize: "22px" }}>✔</span>;

const Confirmation = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const savedBooking = localStorage.getItem('completeBooking');
    if (savedBooking) {
      setBookingDetails(JSON.parse(savedBooking));
    }
  }, []);

  const handleBackToDashboard = () => {
    localStorage.removeItem('bookingData');
    localStorage.removeItem('completeBooking');
    navigate('/');
  };

  if (!bookingDetails) {
    return (
      <div className="confirmation-loading">
        <p>Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      
      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-wrapper">
          <div className="progress-step progress-step-completed">
            <CheckIcon />
          </div>
          <div className="progress-line progress-line-active"></div>
          <div className="progress-step progress-step-completed">
            <CheckIcon />
          </div>
          <div className="progress-line progress-line-active"></div>
          <div className="progress-step progress-step-completed">
            <CheckIcon />
          </div>
        </div>
      </div>

      <div className="confirmation-container">
        <div className="confirmation-card">

          <div className="confirmation-header">
            
            <h2 className="confirmation-title">Booking Confirmed!</h2>
            <p className="confirmation-subtitle">
              Your reservation has been successfully made. Here are your booking details.
            </p>
          </div>

          {/* Booking Details Grid */}
          <div className="confirmation-grid">
            
            {/* Left Column */}
            <div className="confirmation-info">
              <div className="booking-id-section">
                <h3 className="section-title">Booking ID</h3>
                <p className="booking-id">{bookingDetails.bookingId}</p>
              </div>

              <div className="summary-section">
                <h3 className="section-title">Summary of Stay</h3>
                <div className="summary-details">
                  <div className="detail-row">
                    <span className="detail-label">Room:</span>
                    <span className="detail-value">{bookingDetails.selectedRoom}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Check-in:</span>
                    <span className="detail-value">
                      {new Date(bookingDetails.checkIn).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Check-out:</span>
                    <span className="detail-value">
                      {new Date(bookingDetails.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Total Price:</span>
                    <span className="detail-value detail-value-price">
                      ${bookingDetails.totalPrice?.toFixed(2)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Guest:</span>
                    <span className="detail-value">{bookingDetails.fullName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{bookingDetails.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{bookingDetails.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="confirmation-image">
              <img 
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop" 
                alt="Hotel Room"
                className="room-image"
              />
              <div className="info-box">
                <p className="info-text">
                  <span className="info-icon">📧</span>
                  Confirmation Email sent to {bookingDetails.email}
                </p>
                <p className="info-text">
                  <span className="info-icon">📱</span>
                  Present your Booking ID at check-in
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button onClick={handleBackToDashboard} className="btn-dashboard">
            Back to Dashboard
          </button>

          {/* Additional */}
          <div className="additional-info">
            <h4 className="additional-info-title">Important Information:</h4>
            <ul className="additional-info-list">
              <li>• Check-in time: 3:00 PM</li>
              <li>• Check-out time: 11:00 AM</li>
              <li>• Bring a valid ID at check-in</li>
              <li>• Free cancellation 24 hours before check-in</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Confirmation;