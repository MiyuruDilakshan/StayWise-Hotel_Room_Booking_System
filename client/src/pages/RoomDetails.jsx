// src/pages/RoomDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import roomService from '../services/roomService';
import '../styles/RoomDetails.css';

// SVG Icon mapper for amenities
const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    
    if (amenityLower.includes('wifi')) {
        return <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />;
    }
    if (amenityLower.includes('tv') || amenityLower.includes('television')) {
        return <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-5-4l-4-4-4 4H5v2h14v-2z" />;
    }
    if (amenityLower.includes('shower') || amenityLower.includes('bath')) {
        return <path d="M7 8c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H7zm5 6h-4v-4h4v4z" />;
    }
    if (amenityLower.includes('bed')) {
        return <path d="M19 10H5V9h14v1zm0 2H5v9h14v-9zm1-4H4c-1.1 0-2 .9-2 2v14h2v-2h16v2h2V10c0-1.1-.9-2-2-2z" />;
    }
    if (amenityLower.includes('desk') || amenityLower.includes('work')) {
        return <path d="M20 13H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm-1 6H5v-4h14v4z" />;
    }
    if (amenityLower.includes('ac') || amenityLower.includes('air') || amenityLower.includes('conditioning')) {
        return <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 16h-4v-2h4v2zm5-4H5V7h14v8z" />;
    }
    if (amenityLower.includes('minibar') || amenityLower.includes('bar')) {
        return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />;
    }
    if (amenityLower.includes('view')) {
        return <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />;
    }
    if (amenityLower.includes('safe')) {
        return <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 7 15.5 7 14 7.67 14 8.5s.67 1.5 1.5 1.5z" />;
    }
    if (amenityLower.includes('jacuzzi') || amenityLower.includes('spa') || amenityLower.includes('tub')) {
        return <path d="M7 13c-1.66 0-3 1.34-3 3 0 1.31.84 2.41 2 2.83V19h2v-1h2v1h2v-1.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3h-2zm5-6V5c0-.55-.45-1-1-1s-1 .45-1 1v2H9V5c0-.55-.45-1-1-1s-1 .45-1 1v2H5c-1.66 0-3 1.34-3 3v2h14V10c0-1.66-1.34-3-3-3h-1z" />;
    }
    if (amenityLower.includes('lounge')) {
        return <path d="M17 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />;
    }
    if (amenityLower.includes('access') || amenityLower.includes('butler')) {
        return <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />;
    }
    if (amenityLower.includes('kitchen') || amenityLower.includes('kitchenette')) {
        return <path d="M18 2.0h-.5l-.4-1.2c-.3-.5-.9-.8-1.5-.8-.6 0-1.2.3-1.5.8l-.4 1.2H9.3l-.4-1.2C8.6.3 8 0 7.4 0c-.6 0-1.2.3-1.5.8L5.5 2.0H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 17H5V4h13v15z" />;
    }
    if (amenityLower.includes('living')) {
        return <path d="M10 10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />;
    }
    
    // Default icon for unknown amenities
    return <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />;
};

export default function RoomDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);

    // Booking state
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [specialRequests, setSpecialRequests] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    // Fetch room details
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setLoading(true);
                const response = await roomService.getRoomById(id);
                if (response.success) {
                    setRoom(response.data);
                    setSelectedImage(0);
                } else {
                    setError('Room not found');
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch room details');
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [id]);

    const calculateTotalPrice = () => {
        if (!checkInDate || !checkOutDate) return 0;
        const start = new Date(checkInDate);
        const end = new Date(checkOutDate);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (nights <= 0) return 0;
        return nights * (room?.price || 0);
    };

    const handleBookNow = async () => {
        // Check if user is logged in
        if (!isLoggedIn) {
            // Store the room info and booking details in sessionStorage before redirecting
            sessionStorage.setItem('pendingBooking', JSON.stringify({
                roomId: room._id,
                checkInDate,
                checkOutDate,
                numberOfGuests,
                specialRequests,
                roomName: room.name,
                roomPrice: room.price,
                roomImage: (room.images && room.images.length > 0) ? (room.images[0].src || room.images[0]) : room.image
            }));
            setShowAuthModal(true);
            return;
        }

        // Validate dates
        if (!checkInDate || !checkOutDate) {
            alert('Please select check-in and check-out dates');
            return;
        }

        if (new Date(checkOutDate) <= new Date(checkInDate)) {
            alert('Check-out date must be after check-in date');
            return;
        }

        if (numberOfGuests > room.capacity) {
            alert(`This room can accommodate maximum ${room.capacity} guests`);
            return;
        }

        try {
            // For logged-in users, store booking data and go to BookingInformation
            // This allows users to fill in their info before payment
            const bookingIntentData = {
                roomId: room._id,
                checkInDate,
                checkOutDate,
                numberOfGuests,
                specialRequests,
                roomName: room.name,
                roomPrice: room.price,
                roomImage: (room.images && room.images.length > 0) ? (room.images[0].src || room.images[0]) : room.image
            };
            
            // Store as pending booking
            sessionStorage.setItem('pendingBooking', JSON.stringify(bookingIntentData));
            
            // Navigate to booking information page
            navigate('/booking');
        } catch (err) {
            console.error('Booking error:', err);
            alert(err.message || 'Error creating booking. Please try again.');
        }
    };

    if (loading) {
        return <div className="room-details-container"><div className="loading">Loading room details...</div></div>;
    }

    if (error || !room) {
        return (
            <div className="room-details-container">
                <div className="error-message">{error || 'Room not found'}</div>
                <button onClick={() => navigate('/rooms')} className="back-btn">Back to Rooms</button>
            </div>
        );
    }

    return (
        <div className="room-details-page">
            {/* HEADER */}
            <header className="rddp-header">
                <button onClick={() => navigate('/rooms')} className="rddp-back-btn">
                    ← Back to Rooms
                </button>
            </header>

            {/* MAIN CONTENT */}
            <div className="rddp-main-grid">
                {/* LEFT SECTION - Room Info */}
                <div className="rddp-left-panel">
                    {/* Room Image Card */}
                    <div className="rddp-image-card">
                        <img 
                            src={(room.images && room.images.length > 0) ? (room.images[0].src || room.images[0]) : (room.image || 'https://via.placeholder.com/400x300')} 
                            alt={room.name}
                            className="rddp-room-image"
                        />
                    </div>

                    {/* Room Title & Badge */}
                    <div className="rddp-title-section">
                        <h1 className="rddp-room-title">{room.name}</h1>
                        <span className="rddp-bed-badge">{room.bedType} Bed</span>
                    </div>

                    {/* Quick Stats */}
                    <div className="rddp-stats-container">
                        <div className="rddp-stat-box">
                            <div className="rddp-stat-number">👥</div>
                            <div className="rddp-stat-info">
                                <p className="rddp-stat-label">Guests</p>
                                <p className="rddp-stat-value">{room.capacity}</p>
                            </div>
                        </div>
                        <div className="rddp-stat-box">
                            <div className="rddp-stat-number">🛏️</div>
                            <div className="rddp-stat-info">
                                <p className="rddp-stat-label">Bed Type</p>
                                <p className="rddp-stat-value">{room.bedType}</p>
                            </div>
                        </div>
                        <div className="rddp-stat-box">
                            <div className="rddp-stat-number">✨</div>
                            <div className="rddp-stat-info">
                                <p className="rddp-stat-label">Amenities</p>
                                <p className="rddp-stat-value">{room.amenities?.length || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description Card */}
                    <div className="rddp-description-card">
                        <h2 className="rddp-card-title">About This Room</h2>
                        <p className="rddp-description-text">{room.description}</p>
                    </div>

                    {/* Amenities Card */}
                    <div className="rddp-amenities-card">
                        <h2 className="rddp-card-title">What's Included</h2>
                        <div className="rddp-amenities-list">
                            {room.amenities && room.amenities.map((amenity, idx) => (
                                <div key={idx} className="rddp-amenity-chip">
                                    <svg className="rddp-amenity-icon" viewBox="0 0 24 24" fill="currentColor">
                                        {getAmenityIcon(amenity)}
                                    </svg>
                                    <span className="rddp-amenity-text">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION - Booking */}
                <div className="rddp-booking-panel">
                    {/* Price Card */}
                    <div className="rddp-price-card">
                        <div className="rddp-price-tag">
                            <span className="rddp-price-amount">${room.price}</span>
                            <span className="rddp-price-label">per night</span>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <form className="rddp-booking-form" onSubmit={(e) => { e.preventDefault(); handleBookNow(); }}>
                        <h3 className="rddp-form-title">Book Your Room</h3>

                        <div className="rddp-form-group">
                            <label className="rddp-form-label">Check-in</label>
                            <input
                                type="date"
                                className="rddp-form-input"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div className="rddp-form-group">
                            <label className="rddp-form-label">Check-out</label>
                            <input
                                type="date"
                                className="rddp-form-input"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                min={checkInDate || new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div className="rddp-form-group">
                            <label className="rddp-form-label">Guests</label>
                            <select className="rddp-form-input" value={numberOfGuests} onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}>
                                {[...Array(room.capacity)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>

                        <div className="rddp-form-group">
                            <label className="rddp-form-label">Special Requests</label>
                            <textarea
                                className="rddp-form-input"
                                value={specialRequests}
                                onChange={(e) => setSpecialRequests(e.target.value)}
                                placeholder="Tell us about your needs..."
                                rows="3"
                            />
                        </div>

                        {calculateTotalPrice() > 0 && (
                            <div className="rddp-price-breakdown">
                                <div className="rddp-breakdown-row">
                                    <span className="rddp-breakdown-label">${room.price} × {Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))} nights</span>
                                    <span className="rddp-breakdown-value">${calculateTotalPrice()}</span>
                                </div>
                                <div className="rddp-breakdown-total">
                                    <span className="rddp-breakdown-label">Total</span>
                                    <span className="rddp-breakdown-value">${calculateTotalPrice()}</span>
                                </div>
                            </div>
                        )}

                        <button type="submit" className="rddp-book-button">{isLoggedIn ? 'Reserve Room' : 'Login to Book'}</button>
                    </form>
                </div>
            </div>

            {/* Authentication Modal */}
            {showAuthModal && (
                <div className="rddp-modal-overlay" onClick={() => setShowAuthModal(false)}>
                    <div className="rddp-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="rddp-modal-close" onClick={() => setShowAuthModal(false)}>×</button>
                        <h2>Login Required</h2>
                        <p>You need to log in to book a room. We'll return you to this page after login.</p>
                        <div className="rddp-modal-buttons">
                            <button 
                                className="rddp-btn-primary"
                                onClick={() => navigate('/login')}
                            >
                                Go to Login
                            </button>
                            <button 
                                className="rddp-btn-secondary"
                                onClick={() => setShowAuthModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
