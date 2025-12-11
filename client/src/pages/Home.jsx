import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch featured rooms from API
    setLoading(true)
    setTimeout(() => {
      setRooms([
        {
          id: 1,
          name: 'Deluxe Room',
          description: 'Experience luxury in our Deluxe Rooms with stunning city views.',
          image: '/images/delux room.png'
        },
        {
          id: 2,
          name: 'Executive Suite',
          description: 'Indulge in our Executive Suites with a private balcony and premium amenities.',
          image: '/images/executive suite.png'
        },
        {
          id: 3,
          name: 'Presidential Suite',
          description: 'Our Presidential Suite offers unparalleled luxury and space for an unforgettable stay.',
          image: '/images/president suite.png'
        }
      ])
      setLoading(false)
    }, 500)
  }, [])

  const handleSearch = () => {
    // Handle search functionality
    console.log('Searching:', { checkIn, checkOut })
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-highlight">Stay</span>Wise
          </h1>
          <p className="hero-subtitle">Your Perfect Stay in Colombo</p>
          
          <div className="search-box">
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Check-in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Check-out
            </button>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="featured-rooms">
        <div className="container">
          <h2 className="section-title">Featured Rooms</h2>
          
          {loading ? (
            <p className="loading-text">Loading rooms...</p>
          ) : (
            <div className="rooms-grid">
              {rooms.map((room) => (
                <div key={room.id} className="room-card">
                  <div className="room-image">
                    <img src={room.image} alt={room.name} />
                  </div>
                  <div className="room-info">
                    <h3 className="room-name">{room.name}</h3>
                    <p className="room-description">{room.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why StayWise Section */}
      <section className="why-staywise">
        <div className="container">
          <h2 className="section-title">Why StayWise?</h2>
          <h3 className="subsection-title">Experience the Best</h3>
          <p className="section-description">
            At StayWise, we are committed to providing an exceptional experience for every guest.
            Discover why we are the preferred choice for travelers.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
                </svg>
              </div>
              <h4 className="feature-title">Relaxing Pool</h4>
              <p className="feature-description">
                Unwind by our luxurious pool, perfect for a refreshing dip or lounging in the sun.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" fill="currentColor"/>
                </svg>
              </div>
              <h4 className="feature-title">Fine Dining</h4>
              <p className="feature-description">
                Savor exquisite cuisine at our award-winning restaurants, offering a variety of culinary delights.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
                </svg>
              </div>
              <h4 className="feature-title">Personalized Service</h4>
              <p className="feature-description">
                Our dedicated staff ensures every guest receives personalized attention and care.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill="currentColor"/>
                </svg>
              </div>
              <h4 className="feature-title">Free High-Speed Wi-Fi</h4>
              <p className="feature-description">
                Stay connected with our complimentary high-speed Wi-Fi throughout the hotel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Feedback Section */}
      <section className="customer-feedback">
        <div className="container">
          <h2 className="section-title">Customer Feedback</h2>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-image">
                <img src="/images/girl2.png" alt="Amelia Harper" />
              </div>
              <h4 className="testimonial-name">Exceptional Service</h4>
              <p className="testimonial-text">
                "The service at StayWise was impeccable. The staff went above and beyond to make our stay memorable." - Amelia Harper
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-image">
                <img src="/images/man.png" alt="Ethan Bennett" />
              </div>
              <h4 className="testimonial-name">Luxurious Comfort</h4>
              <p className="testimonial-text">
                "The rooms were beautifully designed and incredibly comfortable. I felt right at home." - Ethan Bennett
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-image">
                <img src="/images/girl 1.png" alt="Sophia Carter" />
              </div>
              <h4 className="testimonial-name">Unforgettable Experience</h4>
              <p className="testimonial-text">
                "From the moment we arrived, we were treated like royalty. StayWise exceeded all our expectations." - Sophia Carter
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}