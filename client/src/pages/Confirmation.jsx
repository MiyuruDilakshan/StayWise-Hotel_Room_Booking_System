import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import roomService from '../services/roomService';
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/Confirmation.css';

const CheckIcon = () => (
  <svg className="confirm-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Confirmation = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const saveAttempted = React.useRef(false);

  useEffect(() => {
    try {
      // Check for both lastBooking (direct from RoomDetails) and completeBooking (from Payment flow)
      const lastBooking = sessionStorage.getItem('lastBooking');
      const completeBooking = sessionStorage.getItem('completeBooking');
      
      let bookingData = null;
      let storageKey = '';
      
      if (completeBooking) {
        // Guest flow - user went through payment
        bookingData = JSON.parse(completeBooking);
        storageKey = 'completeBooking';
      } else if (lastBooking) {
        // Logged-in user booked directly from RoomDetails
        bookingData = JSON.parse(lastBooking);
        storageKey = 'lastBooking';
      } else {
        setError('No booking confirmation found. Please complete the booking process.');
        setLoading(false);
        return;
      }

      setBookingDetails(bookingData);

      // Try to save booking to database if user is logged in
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        // User is logged in - save booking to database if not already saved
        if (!bookingData.dbBookingId && !saveAttempted.current) {
          saveAttempted.current = true;
          saveBookingToDatabase(bookingData, storageKey);
        } else {
          setLoading(false);
        }
      } else {
        // Guest booking - just show the confirmation
        setLoading(false);
      }
    } catch (err) {
      console.error('Error loading confirmation:', err);
      setError('Error loading confirmation: ' + err.message);
      setLoading(false);
    }
  }, []);

  const saveBookingToDatabase = async (bookingData, storageKey) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        throw new Error('User not authenticated');
      }
      
      // Parse user to get actual user ID
      const userData = JSON.parse(user);
      const userId = userData?._id || userData?.id;
      
      // Determine the room ID from different possible sources
      let roomId = null;
      if (bookingData.roomData?.roomId) {
        roomId = bookingData.roomData.roomId;
      } else if (bookingData.room?._id) {
        roomId = bookingData.room._id;
      }

      if (!roomId) {
        throw new Error('Room ID not found in booking data');
      }
      
      // Parse dates correctly
      const checkInDate = new Date(bookingData.checkIn || bookingData.checkInDate);
      const checkOutDate = new Date(bookingData.checkOut || bookingData.checkOutDate);
      
      const bookingPayload = {
        roomId: roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: bookingData.numberOfGuests || bookingData.guests,
        totalPrice: bookingData.totalPrice,
        specialRequests: bookingData.specialRequests || '',
        status: 'confirmed'
      };

      const response = await roomService.createBooking(bookingPayload);
      
      if (response.success && response.data) {
        // Update confirmation with booking ID from database
        const newBookingDetails = {
          ...bookingData,
          bookingId: response.data._id || bookingData.bookingId,
          dbBookingId: response.data._id
        };
        
        setBookingDetails(newBookingDetails);
        
        // Update session storage to prevent duplicate saves on refresh
        if (storageKey) {
          sessionStorage.setItem(storageKey, JSON.stringify(newBookingDetails));
        }
      }
      setLoading(false);
    } catch (err) {
      console.error('Error saving booking to database:', err);
      // Still show confirmation even if DB save fails - user can manually reference the booking ID
      setLoading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDashboard = () => {
    // Clear session storage
    sessionStorage.removeItem('bookingData');
    sessionStorage.removeItem('completeBooking');
    sessionStorage.removeItem('pendingBooking');
    
    // Navigate based on user login status
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/mybookings');
    } else {
      navigate('/');
    }
  };

  const handleDownloadReceipt = () => {
    if (!bookingDetails) {
      alert('Booking details not available');
      return;
    }

    try {
      // Create a professional receipt layout for PDF
      const receiptHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white;">
          <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 15px;">
            <h1 style="margin: 0; font-size: 24px; color: #333;">STAYWISE HOTEL</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Booking Confirmation Receipt</p>
          </div>

          <div style="background: #f5f5f5; padding: 10px; margin-bottom: 15px; border-radius: 5px;">
            <p style="margin: 0; font-size: 11px; color: #666;">Booking Reference</p>
            <p style="margin: 3px 0 0 0; font-size: 16px; font-weight: bold; color: #667eea;">${bookingDetails.bookingId}</p>
          </div>

          <div style="margin-bottom: 15px;">
            <h3 style="font-size: 14px; margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Guest Information</h3>
            <table style="width: 100%; font-size: 11px;">
              <tr>
                <td style="padding: 3px 0; color: #666;">Name:</td>
                <td style="padding: 3px 0; text-align: right; font-weight: 600;">${bookingDetails.fullName || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0; color: #666;">Email:</td>
                <td style="padding: 3px 0; text-align: right; font-weight: 600;">${bookingDetails.email || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0; color: #666;">Phone:</td>
                <td style="padding: 3px 0; text-align: right; font-weight: 600;">${bookingDetails.phone || 'N/A'}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 15px;">
            <h3 style="font-size: 14px; margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Booking Details</h3>
            <table style="width: 100%; font-size: 11px;">
              <tr>
                <td style="padding: 3px 0; color: #666;">Room:</td>
                <td style="padding: 3px 0; text-align: right; font-weight: 600;">${bookingDetails.selectedRoom || bookingDetails.room?.name || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0; color: #666;">Check-in:</td>
                <td style="padding: 3px 0; text-align: right; font-weight: 600;">${(bookingDetails.checkIn || bookingDetails.checkInDate) ? new Date(bookingDetails.checkIn || bookingDetails.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0; color: #666;">Check-out:</td>
                <td style="padding: 3px 0; text-align: right; font-weight: 600;">${(bookingDetails.checkOut || bookingDetails.checkOutDate) ? new Date(bookingDetails.checkOut || bookingDetails.checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0; color: #666;">Number of Nights:</td>
                <td style="padding: 3px 0; text-align: right; font-weight: 600;">${(bookingDetails.checkIn || bookingDetails.checkInDate) && (bookingDetails.checkOut || bookingDetails.checkOutDate) ? Math.ceil((new Date(bookingDetails.checkOut || bookingDetails.checkOutDate) - new Date(bookingDetails.checkIn || bookingDetails.checkInDate)) / (1000 * 60 * 60 * 24)) : 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0; color: #666;">Guests:</td>
                <td style="padding: 3px 0; text-align: right; font-weight: 600;">${bookingDetails.numberOfGuests || bookingDetails.guests || 'N/A'}</td>
              </tr>
            </table>
          </div>

          ${bookingDetails.specialRequests ? `
          <div style="margin-bottom: 15px;">
            <h3 style="font-size: 14px; margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Special Requests</h3>
            <p style="font-size: 11px; margin: 0; color: #555; line-height: 1.4;">${bookingDetails.specialRequests}</p>
          </div>
          ` : ''}

          <div style="margin-bottom: 15px; background: #f9f9f9; padding: 10px; border-radius: 5px;">
            <h3 style="font-size: 14px; margin: 0 0 8px 0; color: #333;">Payment Summary</h3>
            <table style="width: 100%; font-size: 11px;">
              <tr>
                <td style="padding: 3px 0; color: #666;">Subtotal:</td>
                <td style="padding: 3px 0; text-align: right;">$${parseFloat(bookingDetails.totalPrice || 0).toFixed(2)}</td>
              </tr>
              <tr style="border-top: 1px solid #ddd;">
                <td style="padding: 8px 0 3px 0; font-weight: bold; font-size: 13px;">Total Amount:</td>
                <td style="padding: 8px 0 3px 0; text-align: right; font-weight: bold; font-size: 13px; color: #10b981;">$${parseFloat(bookingDetails.totalPrice || 0).toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 15px; border: 1px solid #fcd34d; background: #fef3c7; padding: 10px; border-radius: 5px;">
            <h4 style="font-size: 12px; margin: 0 0 6px 0; color: #92400e;">Important Information:</h4>
            <ul style="margin: 0; padding-left: 18px; font-size: 10px; color: #78350f; line-height: 1.5;">
              <li>Check-in time: 3:00 PM</li>
              <li>Check-out time: 11:00 AM</li>
              <li>Valid ID required at check-in</li>
              <li>Free cancellation 24 hours before check-in</li>
            </ul>
          </div>

          <div style="text-align: center; padding-top: 15px; border-top: 2px solid #333; margin-top: 15px;">
            <p style="margin: 0; font-size: 10px; color: #666;">Thank you for choosing StayWise Hotel</p>
            <p style="margin: 3px 0 0 0; font-size: 9px; color: #999;">For assistance, contact us at support@staywise.com</p>
            <p style="margin: 3px 0 0 0; font-size: 9px; color: #999;">Issued: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      `;

      // Create a wrapper element
      const wrapper = document.createElement('div');
      wrapper.style.position = 'fixed';
      wrapper.style.left = '0';
      wrapper.style.top = '0';
      wrapper.style.width = '210mm';
      wrapper.style.height = 'auto';
      wrapper.style.zIndex = '-9999';
      wrapper.style.background = 'white';
      wrapper.innerHTML = receiptHTML;
      document.body.appendChild(wrapper);

      // Give time for rendering
      setTimeout(() => {
        const element = wrapper.firstElementChild;
        
        const opt = {
          margin: 10,
          filename: `StayWise-Receipt-${bookingDetails.bookingId}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
          }
        };

        html2pdf()
          .set(opt)
          .from(element)
          .save()
          .then(() => {
            if (document.body.contains(wrapper)) {
              document.body.removeChild(wrapper);
            }
          })
          .catch((error) => {
            console.error('PDF generation error:', error);
            if (document.body.contains(wrapper)) {
              document.body.removeChild(wrapper);
            }
            alert('Failed to generate PDF. Please try again.');
          });
      }, 300);
    } catch (error) {
      console.error('Error in handleDownloadReceipt:', error);
      alert('An error occurred while generating the receipt. Please try again.');
    }
  };

  // Email is now sent automatically by the server upon booking creation


  const generateReceiptText = () => {
    if (!bookingDetails) return '';
    
    return `
HOTEL BOOKING CONFIRMATION
==========================

Booking ID: ${bookingDetails.bookingId}
Guest Name: ${bookingDetails.fullName}
Email: ${bookingDetails.email}
Phone: ${bookingDetails.phone}

Room: ${bookingDetails.selectedRoom}
Check-in: ${bookingDetails.checkIn ? new Date(bookingDetails.checkIn).toLocaleDateString() : 'N/A'}
Check-out: ${bookingDetails.checkOut ? new Date(bookingDetails.checkOut).toLocaleDateString() : 'N/A'}
Number of Guests: ${bookingDetails.numberOfGuests}

Total Amount: $${bookingDetails.totalPrice.toFixed(2)}

Special Requests: ${bookingDetails.specialRequests || 'None'}

Confirmation Date: ${new Date().toLocaleDateString()}

Important Information:
- Check-in time: 3:00 PM
- Check-out time: 11:00 AM
- Bring a valid ID at check-in
- Free cancellation 24 hours before check-in

Thank you for your booking!
    `.trim();
  };

  return (
    <div className="confirm-page">
      {loading && <div className="confirm-loading"><p>Loading confirmation...</p></div>}

      {error && (
        <div className="confirm-error">
          <p>{error}</p>
          <button onClick={() => navigate('/rooms')} className="confirm-btn-back">Back to Rooms</button>
        </div>
      )}

      {!loading && !error && bookingDetails && (
        <>
          {/* Progress Indicator */}
          <div className="confirm-progress-container">
            <div className="confirm-progress-wrapper">
              <div className="confirm-progress-step confirm-progress-step-completed">
                <CheckIcon />
              </div>
              <div className="confirm-progress-line confirm-progress-line-active"></div>
              <div className="confirm-progress-step confirm-progress-step-completed">
                <CheckIcon />
              </div>
              <div className="confirm-progress-line confirm-progress-line-active"></div>
              <div className="confirm-progress-step confirm-progress-step-completed">
                <CheckIcon />
              </div>
            </div>
          </div>

          <div className="confirm-container">
            <div className="confirm-card">

              <div className="confirm-header">
                
                <h2 className="confirm-title">Booking Confirmed!</h2>
                <p className="confirm-subtitle">
                  Your reservation has been successfully made. A confirmation email has been sent to {bookingDetails.email}
                </p>
              </div>

              {/* Booking Details Grid */}
              <div className="confirm-grid">
                
                {/* Left Column */}
                <div className="confirm-info">
                  <div className="confirm-booking-id-section">
                    <h3 className="confirm-section-title">Booking ID</h3>
                    <p className="confirm-booking-id">{bookingDetails.bookingId}</p>
                  </div>

                  <div className="confirm-summary-section">
                    <h3 className="confirm-section-title">Summary of Stay</h3>
                    <div className="confirm-summary-details">
                      <div className="confirm-detail-row">
                        <span className="confirm-detail-label">Room:</span>
                        <span className="confirm-detail-value">{bookingDetails.selectedRoom || bookingDetails.room?.name || 'N/A'}</span>
                      </div>
                      <div className="confirm-detail-row">
                        <span className="confirm-detail-label">Check-in:</span>
                        <span className="confirm-detail-value">
                          {(bookingDetails.checkIn || bookingDetails.checkInDate) ? new Date(bookingDetails.checkIn || bookingDetails.checkInDate).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="confirm-detail-row">
                        <span className="confirm-detail-label">Check-out:</span>
                        <span className="confirm-detail-value">
                          {(bookingDetails.checkOut || bookingDetails.checkOutDate) ? new Date(bookingDetails.checkOut || bookingDetails.checkOutDate).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="confirm-detail-row">
                        <span className="confirm-detail-label">Number of Nights:</span>
                        <span className="confirm-detail-value">
                          {(bookingDetails.checkIn || bookingDetails.checkInDate) && (bookingDetails.checkOut || bookingDetails.checkOutDate)
                            ? Math.ceil((new Date(bookingDetails.checkOut || bookingDetails.checkOutDate) - new Date(bookingDetails.checkIn || bookingDetails.checkInDate)) / (1000 * 60 * 60 * 24))
                            : 'N/A'}
                        </span>
                      </div>
                      <div className="confirm-detail-row">
                        <span className="confirm-detail-label">Number of Guests:</span>
                        <span className="confirm-detail-value">{bookingDetails.numberOfGuests || bookingDetails.guests || 'N/A'}</span>
                      </div>
                      <div className="confirm-detail-row">
                        <span className="confirm-detail-label">Total Price:</span>
                        <span className="confirm-detail-value confirm-detail-value-price">
                          ${parseFloat(bookingDetails.totalPrice || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="confirm-guest-section">
                    <h3 className="confirm-section-title">Guest Information</h3>
                    <div className="confirm-summary-details">
                      <div className="confirm-detail-row">
                        <span className="confirm-detail-label">Name:</span>
                        <span className="confirm-detail-value">{bookingDetails.fullName}</span>
                      </div>
                      <div className="confirm-detail-row">
                        <span className="confirm-detail-label">Email:</span>
                        <span className="confirm-detail-value">{bookingDetails.email}</span>
                      </div>
                      <div className="confirm-detail-row">
                        <span className="confirm-detail-label">Phone:</span>
                        <span className="confirm-detail-value">{bookingDetails.phone}</span>
                      </div>
                    </div>
                  </div>

                  {bookingDetails.specialRequests && (
                    <div className="confirm-requests-section">
                      <h3 className="confirm-section-title">Special Requests</h3>
                      <p className="confirm-requests-text">{bookingDetails.specialRequests}</p>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="confirm-image-section">
                  <img 
                    src={bookingDetails.roomData?.roomImage || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop"}
                    alt={bookingDetails.selectedRoom}
                    className="confirm-room-image"
                  />
                  <div className="confirm-info-box">
                    <p className="confirm-info-text">
                      Confirmation sent to {bookingDetails.email}
                    </p>
                    <p className="confirm-info-text">
                      Booking ID: {bookingDetails.bookingId}
                    </p>
                    <p className="confirm-info-text">
                      {isSubmitting ? 'Saving to system...' : 'Booking confirmed'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="confirm-action-buttons">
                <button onClick={handleDownloadReceipt} className="confirm-btn-download">
                  Download Receipt (PDF)
                </button>
                <button onClick={handleBackToDashboard} className="confirm-btn-dashboard">
                  {localStorage.getItem('user') ? 'View My Bookings' : 'Back to Home'}
                </button>
              </div>

              {/* Additional */}
              <div className="confirm-additional-info">
                <h4 className="confirm-additional-info-title">Important Information:</h4>
                <ul className="confirm-additional-info-list">
                  <li>Check-in time: 3:00 PM</li>
                  <li>Check-out time: 11:00 AM</li>
                  <li>Bring a valid ID at check-in</li>
                  <li>Free cancellation 24 hours before check-in</li>
                  <li>Contact us at support@staywise.com for any changes</li>
                </ul>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Confirmation;