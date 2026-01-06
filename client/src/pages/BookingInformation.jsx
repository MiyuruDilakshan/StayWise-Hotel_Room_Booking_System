import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookingInformation.css';

const BookingInformation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedRoom: '',
    checkIn: '',
    checkOut: '',
    numberOfGuests: 1,
    specialRequests: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Load room and booking data from sessionStorage and user from localStorage
  useEffect(() => {
    try {
      const pendingBooking = sessionStorage.getItem('pendingBooking');
      
      if (!pendingBooking) {
        setError('No booking information found. Please select a room first.');
        setLoading(false);
        return;
      }

      const booking = JSON.parse(pendingBooking);
      setRoomData(booking);
      setBookingData(booking);

      // Pre-fill form with user data if logged in
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setFormData(prev => ({
          ...prev,
          fullName: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          selectedRoom: booking.roomName || 'Unknown Room',
          checkIn: booking.checkInDate || '',
          checkOut: booking.checkOutDate || '',
          numberOfGuests: booking.numberOfGuests || 1,
          specialRequests: booking.specialRequests || ''
        }));
      } else {
        // If not logged in, just set the room name and dates
        setFormData(prev => ({
          ...prev,
          selectedRoom: booking.roomName || 'Unknown Room',
          checkIn: booking.checkInDate || '',
          checkOut: booking.checkOutDate || '',
          numberOfGuests: booking.numberOfGuests || 1,
          specialRequests: booking.specialRequests || ''
        }));
      }

      // Calculate total price
      if (booking.checkInDate && booking.checkOutDate && booking.roomPrice) {
        const start = new Date(booking.checkInDate);
        const end = new Date(booking.checkOutDate);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const total = nights * booking.roomPrice;
        setTotalPrice(total);
      }

      setLoading(false);
    } catch (err) {
      setError('Error loading booking information: ' + err.message);
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Store complete booking data with room info
    const completeBookingData = {
      ...formData,
      roomData: {
        ...roomData,
        roomId: roomData.roomId  // Ensure roomId is preserved
      },
      totalPrice: totalPrice,
      checkIn: new Date(formData.checkIn),
      checkOut: new Date(formData.checkOut)
    };
    
    sessionStorage.setItem('bookingData', JSON.stringify(completeBookingData));
    navigate('/payment');
  };

  return (
    <div className="booking-page">
      {loading && <div className="booking-loading"><p>Loading booking information...</p></div>}
      
      {error && (
        <div className="booking-error">
          <p>{error}</p>
          <button onClick={() => navigate('/rooms')} className="btn-back">Back to Rooms</button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Progress Indicator */}
          <div className="binfo-progress-container">
            <div className="binfo-progress-wrapper">
              <div className="binfo-progress-step binfo-progress-active">
                <svg className="binfo-progress-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="binfo-progress-line binfo-progress-line-active"></div>

              <div className="binfo-progress-step">
                <span className="binfo-progress-number">2</span>
              </div>
              <div className="binfo-progress-line"></div>

              <div className="binfo-progress-step">
                <span className="binfo-progress-number">3</span>
              </div>
            </div>
          </div>
          
          <div className="binfo-header">
           <h2 className="binfo-title">Booking Information</h2>
           <p className="binfo-subtitle">Please fill in your details below</p>
          </div>

          {/* Main Content */}
          <div className="binfo-container">

            {/* Form Section */}
            <div className="binfo-form-section">
              <div className="binfo-card">

                <div className="binfo-form-fields">

                  <div className="binfo-form-group">
                    <label className="binfo-form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="binfo-form-input"
                      required
                    />
                  </div>

                  <div className="binfo-form-group">
                    <label className="binfo-form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="binfo-form-input"
                      required
                    />
                  </div>

                  <div className="binfo-form-group">
                    <label className="binfo-form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="binfo-form-input"
                      required
                    />
                  </div>

                  <div className="binfo-form-group">
                    <label className="binfo-form-label">Selected Room</label>
                    <div className="binfo-form-input binfo-readonly">
                      {formData.selectedRoom}
                    </div>
                  </div>

                  <div className="binfo-form-row">
                    <div className="binfo-form-group">
                      <label className="binfo-form-label">Check-in Date</label>
                      <div className="binfo-form-input binfo-readonly">
                        {formData.checkIn ? new Date(formData.checkIn).toLocaleDateString() : 'Not selected'}
                      </div>
                    </div>

                    <div className="binfo-form-group">
                      <label className="binfo-form-label">Check-out Date</label>
                      <div className="binfo-form-input binfo-readonly">
                        {formData.checkOut ? new Date(formData.checkOut).toLocaleDateString() : 'Not selected'}
                      </div>
                    </div>
                  </div>

                  <div className="binfo-form-group">
                    <label className="binfo-form-label">Number of Guests</label>
                    <div className="binfo-form-input binfo-readonly">
                      {formData.numberOfGuests}
                    </div>
                  </div>

                  <div className="binfo-form-group">
                    <label className="binfo-form-label">Special Requests (Optional)</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any special requests for your stay?"
                      className="binfo-form-input binfo-textarea"
                      rows="3"
                    />
                  </div>

                </div>

              </div>
              
              <button 
                onClick={handleSubmit} 
                className="binfo-continue-btn"
              >
                Continue to Payment
              </button>
            </div>

            {/* Booking Summary */}
            <div className="binfo-summary-section">
              <div className="binfo-summary-card">
                <h3 className="binfo-summary-title">Your Booking</h3>

                <div className="binfo-summary-image-wrapper">
                  <img
                    src={roomData?.roomImage || "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=250&fit=crop"}
                    alt={formData.selectedRoom}
                    className="binfo-summary-image"
                  />
                </div>

                <h4 className="binfo-summary-room-name">{formData.selectedRoom}</h4>
                <p className="binfo-summary-room-details">
                  {formData.numberOfGuests} guest(s) • {
                    formData.checkIn && formData.checkOut
                      ? Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))
                      : 0
                  } night(s)
                </p>

                <div className="binfo-summary-pricing">
                  <div className="binfo-price-row">
                    <span className="binfo-price-label">Price per night</span>
                    <span className="binfo-price-value">${roomData?.roomPrice || 0}</span>
                  </div>

                  <div className="binfo-price-row">
                    <span className="binfo-price-label">Number of nights</span>
                    <span className="binfo-price-value">
                      {formData.checkIn && formData.checkOut
                        ? Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))
                        : 0}
                    </span>
                  </div>

                  <div className="binfo-price-row">
                    <span className="binfo-price-label">Subtotal</span>
                    <span className="binfo-price-value">${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="binfo-price-row">
                    <span className="binfo-price-label">Taxes & Fees</span>
                    <span className="binfo-price-value">${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>

                  <div className="binfo-price-row binfo-price-total">
                    <span className="binfo-price-label-total">Total</span>
                    <span className="binfo-price-value-total">${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default BookingInformation;
