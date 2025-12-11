import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookingInformation.css';

const BookingInformation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedRoom: 'Deluxe Room',
    checkIn: '',
    checkOut: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    localStorage.setItem('bookingData', JSON.stringify(formData));
    navigate('/payment');
  };

  return (
    <div className="booking-page">
      
      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-wrapper">
          <div className="progress-step progress-step-active">
            {/* Replaced lucide-react icon with emoji */}
            <span className="progress-icon">✓</span>
          </div>
          <div className="progress-line"></div>

          <div className="progress-step">
            <span className="progress-number">2</span>
          </div>
          <div className="progress-line"></div>

          <div className="progress-step">
            <span className="progress-number">3</span>
          </div>
        </div>
      </div>
      
      <div className="booking-header">
       <h2 className="booking-title">Booking Information</h2>
       <p className="booking-subtitle">Please fill up the blank fields below</p>
      </div>

      {/* Main Content */}
      <div className="booking-container">

        {/* Form Section */}
        <div className="booking-form-section">
          <div className="booking-card">

            <div className="form-fields">

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Selected Room</label>
                <select
                  name="selectedRoom"
                  value={formData.selectedRoom}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option>Deluxe Room</option>
                  <option>Standard Room</option>
                  <option>Suite Room</option>
                  <option>Presidential Suite</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label form-label-highlight">Check-in Date</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label form-label-highlight">Check-out Date</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

            </div>

            <button onClick={handleSubmit} className="btn-submit">
              Submit Booking
            </button>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="booking-summary-section">
          <div className="summary-card">
            <h3 className="summary-title">Your Booking</h3>

            <div className="summary-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=250&fit=crop"
                alt="Deluxe Room"
                className="summary-image"
              />
            </div>

            <h4 className="summary-room-name">{formData.selectedRoom}</h4>
            <p className="summary-room-details">2 nights, 1 adult</p>

            <button className="summary-view-details">View Details</button>

            <div className="summary-pricing">
              <div className="price-row">
                <span className="price-label">Subtotal</span>
                <span className="price-value">$350.00</span>
              </div>

              <div className="price-row">
                <span className="price-label">Taxes & Fees</span>
                <span className="price-value">$35.00</span>
              </div>

              <div className="price-row price-row-total">
                <span className="price-label-total">Total</span>
                <span className="price-value-total">$385.00</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingInformation;
