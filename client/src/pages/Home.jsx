import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import roomService from '../services/roomService'
import '../styles/Home.css'

export default function Home() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [featuredRooms, setFeaturedRooms] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      try {
        const response = await roomService.getAllRooms();
        if (response.success && response.data) {
          // Get 3 random rooms or just the first 3
          setFeaturedRooms(response.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch featured rooms', error);
      }
    };
    fetchFeaturedRooms();
  }, []);

  const handleSearch = () => {
    if (checkIn && checkOut) {
      navigate(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)
    } else {
      alert('Please select check-in and check-out dates')
    }
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <img 
          src="/images/hero-bg.png" 
          alt="Luxury hotel" 
          className="hero-image"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-highlight">Stay</span>Wise
          </h1>
          <p className="hero-subtitle">Your Perfect Stay in Colombo</p>
          
          <div className="search-box">
            <div className="search-input-group">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input 
                type="date" 
                placeholder="Check-in" 
                className="search-input"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <input 
              type="date"
              placeholder="Check-out"
              className="search-input"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
            <select 
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="search-input"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
            <button className="checkout-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="home-about-section">
        <div className="home-about-container">
          <h2 className="home-about-heading">About StayWise Hotels</h2>
          <p className="home-about-subtitle">Welcome to StayWise Hotels, where luxury meets comfort in the heart of Colombo</p>
          <p className="home-about-description">
            Since 2010, StayWise Hotels has been redefining hospitality excellence in Sri Lanka. Our commitment to 
            providing world-class amenities, personalized service, and elegant accommodations has made us the preferred 
            choice for discerning travelers. Whether you're here for business or leisure, we ensure every moment of your 
            stay is truly special. Experience the perfect blend of modern convenience and authentic Sri Lankan hospitality 
            that defines the StayWise experience.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-header">
          <h2 className="gallery-heading">Explore Our Hotel</h2>
          <p className="gallery-subtitle">A Visual Journey Through Luxury & Comfort</p>
        </div>
        
        <div className="gallery-masonry">
          <div className="gallery-card gallery-large">
            <img 
              src="https://www.ahotellife.com/wp-content/uploads/2017/06/11.jpg" 
              alt="Presidential Suite" 
              className="gallery-img"
            />
            <div className="gallery-info">
              <span className="gallery-tag">Amenities</span>
              <h3 className="gallery-title">Rooftop Pool</h3>
              <p className="gallery-desc">Stunning city views await</p>
            </div>
          </div>

          <div className="gallery-card">
            <img 
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687298.jpg?k=95558a4f06c02cf922911301c846d382eafe1a091b088918d798e7cd5ecf3bad&o=" 
              alt="Hotel Lobby" 
              className="gallery-img"
            />
            <div className="gallery-info">
              <span className="gallery-tag">Interiors</span>
              <h3 className="gallery-title">Grand Lobby</h3>
              <p className="gallery-desc">Modern elegance welcomes you</p>
            </div>
          </div>

          <div className="gallery-card">
            <img 
              src="https://storage.kempinski.com/cdn-cgi/image/w=1920,f=auto,fit=scale-down,g=auto/ki-cms-prod/images/8/4/1/9/119148-1-eng-GB/535c0e7fcdd6-70118457_4K.jpg" 
              alt="Infinity Pool" 
              className="gallery-img"
            />
            <div className="gallery-info">
              <span className="gallery-tag">Amenities</span>
              <h3 className="gallery-title">Presidential Suite</h3>
              <p className="gallery-desc">Experience ultimate luxury in our flagship suite</p>
            </div>
          </div>

          <div className="gallery-card gallery-wide">
            <img 
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/67/26/f6/welcome-to-tenku-the.jpg" 
              alt="Hotel Restaurant" 
              className="gallery-img"
            />
            <div className="gallery-info">
              <span className="gallery-tag">Dining</span>
              <h3 className="gallery-title">Gourmet Restaurant</h3>
              <p className="gallery-desc">Award-winning culinary excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="featured-rooms-section">
        <h2 className="section-heading">Featured Rooms</h2>
        
        <div className="rooms-container">
          {featuredRooms.length > 0 ? (
            featuredRooms.map((room) => (
              <div key={room._id} className="home-room-card" onClick={() => navigate(`/rooms/${room._id}`)} style={{cursor: 'pointer'}}>
                <div className="room-image-wrapper">
                  <img 
                    src={(() => {
                        if (room.images && room.images.length > 0) return room.images[0].src || room.images[0];
                        if (room.image) return room.image;
                        return '/images/room-default.jpg';
                    })()}
                    alt={room.name} 
                    className="room-image"
                  />
                </div>
                <div className="room-details">
                  <h3 className="room-name">{room.name}</h3>
                  <p className="room-desc">
                    {room.description ? room.description.substring(0, 100) + '...' : 'Experience luxury in our rooms.'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading featured rooms...</p>
          )}
        </div>
      </section>

      {/* Why StayWise Section */}
      <section className="why-staywise-section">
        <h2 className="why-heading">Why StayWise?</h2>
        
        <div className="experience-header">
          <h3 className="experience-title">Experience the Best</h3>
          <p className="experience-text">
            At StayWise, we are committed to providing an exceptional experience for every guest. 
            Discover why we are the preferred choice for travelers.
          </p>
        </div>

        <div className="home-amenities-grid">
          <div className="home-amenity-item">
            <div className="home-amenity-icon-box">
              <img src="/icons/Vector - 0.png" alt="Pool" className="home-amenity-icon" />
            </div>
            <div className="home-amenity-content">
              <span className="home-amenity-label">Pool</span>
              <h4 className="home-amenity-name">Relaxing Pool</h4>
              <p className="home-amenity-description">
                Unwind by our luxurious pool, perfect for a refreshing dip or lounging in the sun.
              </p>
            </div>
          </div>

          <div className="home-amenity-item">
            <div className="home-amenity-icon-box">
              <img src="/icons/Vector - 1.png" alt="Dining" className="home-amenity-icon" />
            </div>
            <div className="home-amenity-content">
              <span className="home-amenity-label">Dining</span>
              <h4 className="home-amenity-name">Fine Dining</h4>
              <p className="home-amenity-description">
                Savor exquisite cuisine at our award-winning restaurants, offering a variety of culinary delights.
              </p>
            </div>
          </div>

          <div className="home-amenity-item">
            <div className="home-amenity-icon-box">
              <img src="/icons/Vector - 2.png" alt="Service" className="home-amenity-icon" />
            </div>
            <div className="home-amenity-content">
              <span className="home-amenity-label">Service</span>
              <h4 className="home-amenity-name">Personalized Service</h4>
              <p className="home-amenity-description">
                Our dedicated staff ensures every guest receives personalized attention and care.
              </p>
            </div>
          </div>

          <div className="home-amenity-item">
            <div className="home-amenity-icon-box">
              <img src="/icons/Vector - 3.png" alt="WiFi" className="home-amenity-icon" />
            </div>
            <div className="home-amenity-content">
              <span className="home-amenity-label">WiFi</span>
              <h4 className="home-amenity-name">Free High-Speed Wi-Fi</h4>
              <p className="home-amenity-description">
                Stay connected with our complimentary high-speed Wi-Fi throughout the hotel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-header">
          <h2 className="reviews-heading">What Our Guests Say</h2>
          <p className="reviews-subtitle">Real experiences from real travelers</p>
        </div>
        
        <div className="reviews-container">
          <div className="review-card">
            <div className="review-header">
              <img 
                src="/images/customer1.jpeg" 
                alt="Amelia Harper" 
                className="review-avatar"
              />
              <div className="review-info">
                <h4 className="review-name">Amelia Harper</h4>
                <div className="review-stars">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <p className="review-text">
              "The service at StayWise was impeccable. The staff went above and beyond to make our stay memorable. 
              The attention to detail and warm hospitality truly set this hotel apart."
            </p>
          </div>

          <div className="review-card">
            <div className="review-header">
              <img 
                src="/images/customer2.png" 
                alt="Ethan Bennett" 
                className="review-avatar"
              />
              <div className="review-info">
                <h4 className="review-name">Ethan Bennett</h4>
                <div className="review-stars">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <p className="review-text">
              "The rooms were beautifully designed and incredibly comfortable. I felt right at home from the moment I stepped in. 
              The modern amenities and elegant decor exceeded all my expectations."
            </p>
          </div>

          <div className="review-card">
            <div className="review-header">
              <img 
                src="/images/customer3.jpg" 
                alt="Sophia Carter" 
                className="review-avatar"
              />
              <div className="review-info">
                <h4 className="review-name">Sophia Carter</h4>
                <div className="review-stars">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <p className="review-text">
              "From the moment we arrived, we were treated like royalty. StayWise exceeded all our expectations with its 
              exceptional service, stunning views, and unforgettable dining experiences."
            </p>
          </div>
        </div>
        
        <div className="reviews-cta">
          <button className="reviews-book-btn" onClick={() => navigate('/rooms')}>
            Book Now
          </button>
        </div>
      </section>
    </div>
  )
}