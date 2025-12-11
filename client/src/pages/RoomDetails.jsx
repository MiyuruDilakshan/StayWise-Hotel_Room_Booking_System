// src/pages/RoomDetails.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RoomDetails.css';

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="room-details-container">
      {/* Hero Image */}
      <div className="room-details-hero">
        {/* Placeholder gradient matching screenshot vibe */}
        <div className="hero-placeholder" style={{
            background: `url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat`
        }}>
        </div>
      </div>

      {/* Title & Description */}
      <h1 className="room-title">Superior Double Room</h1>
      
      <div className="room-description">
        <p>
          Experience superior comfort in our beautifully crafted Superior Double Room, offering a warm and inviting atmosphere. 
          With refined interiors, cozy bedding, and a sleek ensuite bathroom, this room provides everything you need for a restful night. 
          Perfect for short or extended stays, it includes complimentary Wi-Fi, in-room entertainment, and access to all hotel facilities.
        </p>
        <p>
          Our Superior Double Room blends comfort and elegance, designed for guests who appreciate both style and practicality. 
          Featuring a plush double bed, a well-appointed workspace, and a modern bathroom with premium toiletries, this room is 
          ideal for couples or business travelers. Enjoy amenities such as a smart TV, minibar, high-speed Wi-Fi, and 24-hour room 
          service—all for a relaxing and productive stay.
        </p>
      </div>

      {/* Amenities Grid */}
      <h3 className="section-title">Amenities</h3>
      <div className="amenities-grid">
        <div className="amenity-card">
            <IconWifi />
            <span className="amenity-text">High-Speed<br/>Wi-Fi</span>
        </div>
        <div className="amenity-card">
            <IconAC />
            <span className="amenity-text">Air<br/>Conditioning</span>
        </div>
        <div className="amenity-card">
            <IconCoffee />
            <span className="amenity-text">Coffee Maker</span>
        </div>
        <div className="amenity-card">
            <IconPool />
            <span className="amenity-text">Swimming<br/>Pool</span>
        </div>
        <div className="amenity-card">
            <IconGym />
            <span className="amenity-text">Fitness<br/>Center</span>
        </div>
        <div className="amenity-card">
            <IconParking />
            <span className="amenity-text">Free Parking</span>
        </div>
      </div>

      {/* Price & Availability */}
      <h3 className="section-title">Price & Availability</h3>
      <p className="price-tag">Price per night: $220</p>

      {/* Static Calendar Visual matching Screenshot */}
      <div className="calendar-container">
        
        {/* July 2024 */}
        <div className="calendar-month">
            <div className="month-header">
                <span style={{cursor:'pointer'}}>‹</span>
                <span>July 2024</span>
                <span></span>
            </div>
            <div className="calendar-grid">
                {['S','M','T','W','T','F','S'].map(d => <div key={d} className="cal-day-label">{d}</div>)}
                
                {/* Empty days for start of July 2024 (Mon start = 1 empty slot if S=0) 
                    Actually July 1 2024 was Monday. Sunday column 1 is empty. */}
                <div className="cal-day empty"></div>
                
                {/* Days 1-31 */}
                {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    let classes = "cal-day";
                    if (day === 5) classes += " selected"; // Visual match
                    return <div key={i} className={classes}>{day}</div>;
                })}
            </div>
        </div>

        {/* August 2024 */}
        <div className="calendar-month">
            <div className="month-header">
                <span></span>
                <span>August 2024</span>
                <span style={{cursor:'pointer'}}>›</span>
            </div>
            <div className="calendar-grid">
                {['S','M','T','W','T','F','S'].map(d => <div key={d} className="cal-day-label">{d}</div>)}
                
                {/* August 1 2024 is Thursday. Empty: Sun, Mon, Tue, Wed = 4 */}
                <div className="cal-day empty"></div>
                <div className="cal-day empty"></div>
                <div className="cal-day empty"></div>
                <div className="cal-day empty"></div>

                {/* Days 1-31 */}
                {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    let classes = "cal-day";
                    if (day === 7) classes += " selected"; // Visual match
                    return <div key={i} className={classes}>{day}</div>;
                })}
            </div>
        </div>
      </div>

      <div className="book-now-container">
        <button className="btn-book-large">Book Now</button>
      </div>

      {/* Similar Rooms */}
      <h3 className="section-title">Similar Rooms</h3>
      <div className="similar-rooms-grid">
        <div className="similar-room-card" onClick={() => navigate('/rooms/3')}>
            <div className="similar-room-img" style={{background: 'linear-gradient(to bottom, #ddd, #999)'}}></div>
            <div className="similar-room-info">
                <h4>Executive Suite</h4>
                <p>Spacious suite with city view</p>
            </div>
        </div>
        <div className="similar-room-card" onClick={() => navigate('/rooms/4')}>
            <div className="similar-room-img" style={{background: 'linear-gradient(to bottom, #ddd, #999)'}}></div>
            <div className="similar-room-info">
                <h4>Family Room</h4>
                <p>Ideal for families with kids</p>
            </div>
        </div>
        <div className="similar-room-card" onClick={() => navigate('/rooms/5')}>
            <div className="similar-room-img" style={{background: 'linear-gradient(to bottom, #ddd, #999)'}}></div>
            <div className="similar-room-info">
                <h4>Standard Room</h4>
                <p>Comfortable room with basic amenities</p>
            </div>
        </div>
      </div>
    </div>
  );
}

/* --- SVG ICONS (Helper Components) --- */
const IconWifi = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
);
const IconAC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M2 16h20"/><path d="M2 8h20"/><path d="M6 12v4"/><path d="M10 12v4"/><path d="M14 12v4"/><path d="M18 12v4"/></svg>
);
const IconCoffee = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
);
const IconPool = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20s.33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2"></path><path d="M2 16s.33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2"></path><path d="M15 11.5l1.5-1.5 2 2 3-3"></path><path d="M7 2v5h5"></path></svg>
);
const IconGym = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16"></path><path d="M5 7v10"></path><path d="M19 7v10"></path><path d="M9 17h6"></path><path d="M12 7v10"></path></svg>
);
const IconParking = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><path d="M2 10h20"></path><path d="M6 15h4"></path><path d="M6 12v3"></path></svg>
);
