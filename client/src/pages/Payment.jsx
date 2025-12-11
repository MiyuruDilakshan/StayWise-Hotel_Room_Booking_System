import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Payment.css';

const Payment = () => {
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: ''
  });

  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('bookingData');
    if (savedData) {
      setBookingInfo(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvc || !paymentData.cardholderName) {
      alert('Please fill in all payment details');
      return;
    }

    const bookingId = `SW-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    const completeBooking = {
      ...bookingInfo,
      ...paymentData,
      bookingId,
      totalPrice: 385.00
    };

    localStorage.setItem('completeBooking', JSON.stringify(completeBooking));
    navigate('/confirmation');
  };

  return (
    <div className="payment-page">
      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-wrapper">
          <div className="progress-step progress-step-completed">
            <span className="progress-icon">✓</span>
          </div>
          <div className="progress-line progress-line-active"></div>
          <div className="progress-step progress-step-active">
            <span className="progress-icon">✓</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="progress-number">3</span>
          </div>
        </div>
      </div>
      <div className="booking-header">
       <h2 className="payment-title">Payment</h2>
            <p className="payment-subtitle">Kindly follow the instructions below</p>
      </div>
      
      {/* Main Content */}
      <div className="payment-container">

        {/* Payment Form Section */}
        <div className="payment-form-section">
          <div className="payment-card">

            <div className="form-fields">
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="Enter card number"
                  maxLength="19"
                  className="form-input form-input-gray"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="form-input form-input-gray"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    value={paymentData.cvc}
                    onChange={handleInputChange}
                    placeholder="CVC"
                    maxLength="3"
                    className="form-input form-input-gray"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={paymentData.cardholderName}
                  onChange={handleInputChange}
                  placeholder="Enter cardholder name"
                  className="form-input form-input-gray"
                />
              </div>
            </div>

            <button onClick={handleSubmit} className="btn-submit">
              Confirm Payment
            </button>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="payment-summary-section">
          <div className="summary-card">
            <h3 className="summary-title">Your Booking</h3>
            <div className="summary-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=250&fit=crop" 
                alt="Deluxe Room"
                className="summary-image"
              />
            </div>
            <h4 className="summary-room-name">Deluxe Room</h4>
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

export default Payment;
