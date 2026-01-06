import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Payment.css';

const CheckIcon = () => (
  <svg className="payment-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Payment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: '',
    paymentMethod: 'credit'
  });

  const [bookingInfo, setBookingInfo] = useState(null);
  const [totalWithTax, setTotalWithTax] = useState(0);

  useEffect(() => {
    try {
      const savedData = sessionStorage.getItem('bookingData');
      if (!savedData) {
        setError('No booking information found. Please go back and fill in the booking details.');
        setLoading(false);
        return;
      }

      const booking = JSON.parse(savedData);
      setBookingInfo(booking);
      
      // Calculate total with tax
      const taxAmount = booking.totalPrice * 0.1;
      setTotalWithTax(booking.totalPrice + taxAmount);
      
      setLoading(false);
    } catch (err) {
      setError('Error loading booking data: ' + err.message);
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = async () => {
    if (paymentData.paymentMethod !== 'other') {
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvc || !paymentData.cardholderName) {
        alert('Please fill in all payment details');
        return;
      }

      // Validate card number (basic check - just length)
      if (paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return;
      }
    }

    const bookingId = `BK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    const completeBooking = {
      ...bookingInfo,
      ...paymentData,
      bookingId,
      totalPrice: totalWithTax,
      paymentDate: new Date().toISOString(),
      status: 'confirmed',
      paymentStatus: paymentData.paymentMethod === 'other' ? 'pending_at_hotel' : 'paid'
    };

    // Try to save booking and send email immediately
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        
        // Determine the room ID
        let roomId = null;
        if (bookingInfo.roomData?.roomId) {
          roomId = bookingInfo.roomData.roomId;
        } else if (bookingInfo.room?._id) {
          roomId = bookingInfo.room._id;
        }

        if (roomId) {
          const bookingPayload = {
            roomId: roomId,
            checkIn: new Date(bookingInfo.checkIn || bookingInfo.checkInDate),
            checkOut: new Date(bookingInfo.checkOut || bookingInfo.checkOutDate),
            guests: bookingInfo.numberOfGuests || bookingInfo.guests,
            totalPrice: completeBooking.totalPrice,
            specialRequests: bookingInfo.specialRequests || '',
            status: 'confirmed'
          };

          console.log('📤 Creating booking and sending email...');
          const response = await fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookingPayload)
          });

          const result = await response.json();
          
          if (result.success && result.data) {
            console.log('✅ Booking created, email should be sent');
            completeBooking.bookingId = result.data._id;
            completeBooking.dbBookingId = result.data._id;
          }
        }
      } catch (err) {
        console.error('❌ Error creating booking:', err);
        // Continue to confirmation even if API fails
      }
    }

    sessionStorage.setItem('completeBooking', JSON.stringify(completeBooking));
    navigate('/confirmation');
  };

  return (
    <div className="payment-page">
      {loading && <div className="payment-loading"><p>Loading payment details...</p></div>}

      {error && (
        <div className="payment-error">
          <p>{error}</p>
          <button onClick={() => navigate('/booking')} className="payment-btn-back">Back to Booking</button>
        </div>
      )}

      {!loading && !error && bookingInfo && (
        <>
          {/* Progress Indicator */}
          <div className="payment-progress-container">
            <div className="payment-progress-wrapper">
              <div className="payment-progress-step payment-progress-step-completed">
                <CheckIcon />
              </div>
              <div className="payment-progress-line payment-progress-line-active"></div>
              <div className="payment-progress-step payment-progress-step-active">
                <CheckIcon />
              </div>
              <div className="payment-progress-line payment-progress-line-inactive"></div>
              <div className="payment-progress-step payment-progress-step-inactive">
                <span>3</span>
              </div>
            </div>
          </div>

          <div className="payment-header">
            <h2 className="payment-title">Payment</h2>
            <p className="payment-subtitle">Kindly follow the instructions below</p>
          </div>
          
          {/* Main Content */}
          <div className="payment-container">
            {/* Payment Form Section */}
            <div className="payment-form-section">
              <div className="payment-card">
                <div className="payment-form-fields">
                  <div className="payment-form-group">
                    <label className="payment-form-label">Payment Method</label>
                    <div className="payment-method-options">
                      <label className="payment-method-item">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit"
                          checked={paymentData.paymentMethod === 'credit'}
                          onChange={() => handlePaymentMethodChange('credit')}
                          className="payment-method-radio"
                        />
                        <span className="payment-method-label">Credit Card</span>
                      </label>
                      <label className="payment-method-item">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="debit"
                          checked={paymentData.paymentMethod === 'debit'}
                          onChange={() => handlePaymentMethodChange('debit')}
                          className="payment-method-radio"
                        />
                        <span className="payment-method-label">Debit Card</span>
                      </label>
                      <label className="payment-method-item">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="other"
                          checked={paymentData.paymentMethod === 'other'}
                          onChange={() => handlePaymentMethodChange('other')}
                          className="payment-method-radio"
                        />
                        <span className="payment-method-label">Other</span>
                      </label>
                    </div>
                  </div>

                  {paymentData.paymentMethod !== 'other' ? (
                    <>
                      <div className="payment-form-group">
                        <label className="payment-form-label">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="Enter card number (16 digits)"
                          maxLength="19"
                          className="payment-form-input"
                        />
                      </div>

                      <div className="payment-form-row">
                        <div className="payment-form-group">
                          <label className="payment-form-label">Expiry Date</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={paymentData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className="payment-form-input"
                          />
                        </div>
                        <div className="payment-form-group">
                          <label className="payment-form-label">CVC</label>
                          <input
                            type="text"
                            name="cvc"
                            value={paymentData.cvc}
                            onChange={handleInputChange}
                            placeholder="CVC"
                            maxLength="3"
                            className="payment-form-input"
                          />
                        </div>
                      </div>

                      <div className="payment-form-group">
                        <label className="payment-form-label">Cardholder Name</label>
                        <input
                          type="text"
                          name="cardholderName"
                          value={paymentData.cardholderName}
                          onChange={handleInputChange}
                          placeholder="Enter cardholder name"
                          className="payment-form-input"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="payment-info-box">
                      <h4 className="payment-info-title">Pay at Hotel</h4>
                      <p className="payment-info-text">
                        You can pay for your booking when you check in at the hotel. 
                        Please note that a valid ID will be required upon arrival.
                      </p>
                    </div>
                  )}
                </div>

                <button onClick={handleSubmit} className="payment-submit-btn">
                  {paymentData.paymentMethod === 'other' ? 'Make Payment at Check-in' : 'Confirm Payment & Complete Booking'}
                </button>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="payment-summary-section">
              <div className="payment-summary-card">
                <h3 className="payment-summary-title">Your Booking</h3>
                <div className="payment-summary-image-wrapper">
                  <img 
                    src={bookingInfo.roomData?.roomImage || "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=250&fit=crop"}
                    alt={bookingInfo.selectedRoom}
                    className="payment-summary-image"
                  />
                </div>
                <h4 className="payment-summary-room-name">{bookingInfo.selectedRoom}</h4>
                <p className="payment-summary-room-details">
                  {bookingInfo.numberOfGuests} guest(s), {bookingInfo.roomData?.checkInDate && bookingInfo.roomData?.checkOutDate ? Math.ceil((new Date(bookingInfo.roomData.checkOutDate) - new Date(bookingInfo.roomData.checkInDate)) / (1000 * 60 * 60 * 24)) : 0} night(s)
                </p>
                <button className="payment-summary-view-details">View Details</button>
                
                <div className="payment-summary-pricing">
                  <div className="payment-price-row">
                    <span className="payment-price-label">Guest Name</span>
                    <span className="payment-price-value">{bookingInfo.fullName}</span>
                  </div>
                  <div className="payment-price-row">
                    <span className="payment-price-label">Check-in</span>
                    <span className="payment-price-value">{bookingInfo.checkIn ? new Date(bookingInfo.checkIn).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="payment-price-row">
                    <span className="payment-price-label">Check-out</span>
                    <span className="payment-price-value">{bookingInfo.checkOut ? new Date(bookingInfo.checkOut).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="payment-price-row">
                    <span className="payment-price-label">Subtotal</span>
                    <span className="payment-price-value">${bookingInfo.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="payment-price-row">
                    <span className="payment-price-label">Taxes & Fees (10%)</span>
                    <span className="payment-price-value">${(bookingInfo.totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="payment-price-row payment-price-row-total">
                    <span className="payment-price-label-total">Total</span>
                    <span className="payment-price-value-total">${totalWithTax.toFixed(2)}</span>
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

export default Payment;
