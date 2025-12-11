// src/pages/RoomDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RoomDetails.css';

// Mock Data
const roomsData = [
    {
        id: 1,
        name: "Deluxe Suite",
        price: 150,
        type: "Suite",
        description: "Experience the epitome of luxury in our Deluxe Suite. Featuring a spacious living area, a king-sized bed, and a private balcony overlooking the city skyline.",
        longDescription: "The suite is elegantly furnished with modern amenities, including a flat-screen TV, a minibar, and a luxurious bathroom with a soaking tub. Perfect for discerning travelers seeking a serene retreat.",
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Superior Double Room",
        price: 220,
        type: "Double",
        description: "Experience superior comfort in our beautifully crafted Superior Double Room, offering a warm and inviting atmosphere.",
        longDescription: "With refined interiors, cozy bedding, and a sleek ensuite bathroom, this room provides everything you need for a restful night. Perfect for short or extended stays.",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Executive Suite",
        price: 350,
        type: "Suite",
        description: "Designed for business and leisure, the Executive Suite offers a dedicated workspace and a relaxing lounge area.",
        longDescription: "Enjoy premium amenities, high-speed internet, and exclusive access to the executive lounge. The perfect blend of productivity and relaxation.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Ocean View Suite",
        price: 400,
        type: "Suite",
        description: "Wake up to breathtaking views of the ocean in this stunning suite designed for nature lovers.",
        longDescription: "Features floor-to-ceiling windows, a private terrace, and a spa-inspired bathroom. Experience tranquility like never before.",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Standard Room",
        price: 500,
        type: "Suite",
        description: "A comfortable and stylish room perfect for solo travelers or couples.",
        longDescription: "Equipped with a queen-sized bed, modern bathroom, and all essential amenities to ensure a pleasant stay.",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Superior Double Room",
        price: 500,
        type: "Double",
        description: "Another variation of our popular Superior Double, offering different views and layout.",
        longDescription: "Includes all standard amenities with an added touch of luxury in the furnishings and decor.",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Presidential Suite",
        price: 500,
        type: "Suite",
        description: "The ultimate in luxury and exclusivity. Our Presidential Suite is designed for VIPs and special occasions.",
        longDescription: "Features a grand living room, dining area, kitchenette, and a master bedroom with a jacuzzi. Unmatched service and style.",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "Wodden Pit",
        price: 400,
        type: "Double",
        description: "A unique, rustic-themed room featuring handcrafted wooden furniture and warm lighting.",
        longDescription: "Escape the ordinary in this cozy retreat. Perfect for those looking for a different kind of hotel experience.",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop"
    },
];

export default function RoomDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const foundRoom = roomsData.find(r => r.id === parseInt(id));
        setRoom(foundRoom);
    }, [id]);

    if (!room) {
        return (
            <div className="room-details-container">
                <h2>Room not found</h2>
                <button className="btn-book-large" onClick={() => navigate('/rooms')}>Back to Rooms</button>
            </div>
        );
    }

    return (
        <div className="room-details-container">
            {/* Hero Image */}
            <div className="room-details-hero">
                <div className="hero-placeholder" style={{ background: `url('${room.image}') center/cover no-repeat` }}></div>
            </div>

            <h1 className="room-title">{room.name}</h1>
            <div className="room-description">
                <p>{room.description}</p>
                <p>{room.longDescription}</p>
            </div>

            {/* Amenities */}
            <h3 className="section-title">Amenities</h3>
            <div className="amenities-grid">
                <div className="amenity-card"><IconWifi /><span className="amenity-text">High-Speed<br />Wi-Fi</span></div>
                <div className="amenity-card"><IconAC /><span className="amenity-text">Air<br />Conditioning</span></div>
                <div className="amenity-card"><IconCoffee /><span className="amenity-text">Coffee Maker</span></div>
                <div className="amenity-card"><IconPool /><span className="amenity-text">Swimming<br />Pool</span></div>
                <div className="amenity-card"><IconGym /><span className="amenity-text">Fitness<br />Center</span></div>
                <div className="amenity-card"><IconParking /><span className="amenity-text">Free Parking</span></div>
            </div>

            {/* Price & Availability */}
            <h3 className="section-title">Price & Availability</h3>
            <p className="price-tag">Price per night: ${room.price}</p>

            <div className="calendar-container">
                {/* July 2024 - Starts Monday (index 1) */}
                <div className="calendar-month">
                    <div className="month-header">
                        <span style={{ cursor: 'pointer' }}>‹</span>
                        <span>July 2024</span>
                        <span></span>
                    </div>
                    <div className="calendar-grid">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="cal-day-label">{d}</div>)}

                        {/* Empty slot for Sunday (July 1st was Monday) */}
                        <div className="cal-day empty"></div>

                        {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            let className = "cal-day";

                            // Visual Logic for July
                            if (day === 5) className += " start-range";
                            else if (day > 5) className += " in-range";

                            return (
                                <div key={i} className={className}>
                                    <span>{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* August 2024 - Starts Thursday (index 4) */}
                <div className="calendar-month">
                    <div className="month-header">
                        <span></span>
                        <span>August 2024</span>
                        <span style={{ cursor: 'pointer' }}>›</span>
                    </div>
                    <div className="calendar-grid">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="cal-day-label">{d}</div>)}

                        {/* Empty slots for Sun, Mon, Tue, Wed (Aug 1st was Thursday) */}
                        <div className="cal-day empty"></div>
                        <div className="cal-day empty"></div>
                        <div className="cal-day empty"></div>
                        <div className="cal-day empty"></div>

                        {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            let className = "cal-day";

                            // Visual Logic for August
                            if (day < 7) className += " in-range";
                            else if (day === 7) className += " end-range";

                            return (
                                <div key={i} className={className}>
                                    <span>{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="book-now-container">
                <button className="btn-book-large">Book Now</button>
            </div>

            <h3 className="section-title">Similar Rooms</h3>
            <div className="similar-rooms-grid">
                {roomsData.filter(r => r.id !== room.id).slice(0, 3).map(similar => (
                    <div key={similar.id} className="similar-room-card" onClick={() => navigate(`/rooms/${similar.id}`)}>
                        <div className="similar-room-img" style={{ background: `url('${similar.image}') center/cover no-repeat` }}></div>
                        <div className="similar-room-info">
                            <h4>{similar.name}</h4>
                            <p>${similar.price} per night</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* Icons */
const IconWifi = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>);
const IconAC = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20" /><path d="M2 16h20" /><path d="M2 8h20" /><path d="M6 12v4" /><path d="M10 12v4" /><path d="M14 12v4" /><path d="M18 12v4" /></svg>);
const IconCoffee = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>);
const IconPool = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20s.33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2"></path><path d="M2 16s.33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2"></path><path d="M15 11.5l1.5-1.5 2 2 3-3"></path><path d="M7 2v5h5"></path></svg>);
const IconGym = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16"></path><path d="M5 7v10"></path><path d="M19 7v10"></path><path d="M9 17h6"></path><path d="M12 7v10"></path></svg>);
const IconParking = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><path d="M2 10h20"></path><path d="M6 15h4"></path><path d="M6 12v3"></path></svg>);
