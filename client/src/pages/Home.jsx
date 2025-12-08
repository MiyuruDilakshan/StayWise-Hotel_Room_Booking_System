import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch featured rooms from API (placeholder data for now)
    setLoading(true)
    setTimeout(() => {
      setRooms([
        { id: 1, name: 'Deluxe Room', price: 120, image: '🛏️', capacity: 2, rating: 4.8 },
        { id: 2, name: 'Suite Room', price: 180, image: '👑', capacity: 4, rating: 4.9 },
        { id: 3, name: 'Standard Room', price: 80, image: '🏠', capacity: 2, rating: 4.5 },
      ])
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to StayWise Hotels</h1>
          <p>Find and book your perfect hotel stay</p>
          <div className="hero-search">
            <input type="date" placeholder="Check-in" />
            <input type="date" placeholder="Check-out" />
            <select>
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3+ Guests</option>
            </select>
            <button className="search-btn">Search Rooms</button>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="featured-rooms">
        <div className="container">
          <h2>Featured Rooms</h2>
          {loading ? (
            <p>Loading rooms...</p>
          ) : (
            <div className="rooms-grid">
              {rooms.map((room) => (
                <div key={room.id} className="room-card">
                  <div className="room-image">{room.image}</div>
                  <h3>{room.name}</h3>
                  <p className="capacity">👥 {room.capacity} Guests</p>
                  <p className="rating">⭐ {room.rating} (450 reviews)</p>
                  <p className="price">${room.price}/night</p>
                  <Link to="/rooms" className="book-btn">View Details</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <div className="container">
          <h2>Why Choose StayWise?</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="icon">✅</span>
              <h3>Best Price Guarantee</h3>
              <p>We guarantee the lowest prices for your favorite hotels</p>
            </div>
            <div className="feature">
              <span className="icon">🔒</span>
              <h3>Secure Booking</h3>
              <p>Your payment and personal data are completely secure</p>
            </div>
            <div className="feature">
              <span className="icon">📞</span>
              <h3>24/7 Support</h3>
              <p>Our customer support team is always ready to help</p>
            </div>
            <div className="feature">
              <span className="icon">💰</span>
              <h3>Easy Cancellation</h3>
              <p>Cancel your booking anytime without any hassle</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Book Your Stay?</h2>
          <p>Explore thousands of hotels and find your perfect match</p>
          <Link to="/rooms" className="cta-btn">Browse All Rooms</Link>
        </div>
      </section>
    </div>
  )
}
