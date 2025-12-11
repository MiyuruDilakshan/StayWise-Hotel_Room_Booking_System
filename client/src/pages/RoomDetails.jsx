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
        image: "/assets/room-1.png"
    },
    {
        id: 2,
        name: "Superior Double Room",
        price: 220,
        type: "Double",
        description: "Experience superior comfort in our beautifully crafted Superior Double Room, offering a warm and inviting atmosphere.",
        longDescription: "With refined interiors, cozy bedding, and a sleek ensuite bathroom, this room provides everything you need for a restful night. Perfect for short or extended stays.",
        image: "/assets/room-2.png"
    },
    {
        id: 3,
        name: "Executive Suite",
        price: 350,
        type: "Suite",
        description: "Designed for business and leisure, the Executive Suite offers a dedicated workspace and a relaxing lounge area.",
        longDescription: "Enjoy premium amenities, high-speed internet, and exclusive access to the executive lounge. The perfect blend of productivity and relaxation.",
        image: "/assets/room-3.png"
    },
    {
        id: 4,
        name: "Ocean View Suite",
        price: 400,
        type: "Suite",
        description: "Wake up to breathtaking views of the ocean in this stunning suite designed for nature lovers.",
        longDescription: "Features floor-to-ceiling windows, a private terrace, and a spa-inspired bathroom. Experience tranquility like never before.",
        image: "/assets/room-4.png"
    },
    {
        id: 5,
        name: "Standard Room",
        price: 500,
        type: "Suite",
        description: "A comfortable and stylish room perfect for solo travelers or couples.",
        longDescription: "Equipped with a queen-sized bed, modern bathroom, and all essential amenities to ensure a pleasant stay.",
        image: "/assets/room-6.png"
    },
    {
        id: 6,
        name: "Superior Double Room",
        price: 500,
        type: "Double",
        description: "Another variation of our popular Superior Double, offering different views and layout.",
        longDescription: "Includes all standard amenities with an added touch of luxury in the furnishings and decor.",
        image: "/assets/room-2.png"
    },
    {
        id: 7,
        name: "Presidential Suite",
        price: 500,
        type: "Suite",
        description: "The ultimate in luxury and exclusivity. Our Presidential Suite is designed for VIPs and special occasions.",
        longDescription: "Features a grand living room, dining area, kitchenette, and a master bedroom with a jacuzzi. Unmatched service and style.",
        image: "/assets/room-5.png"
    },
    {
        id: 8,
        name: "Wodden Pit",
        price: 400,
        type: "Double",
        description: "A unique, rustic-themed room featuring handcrafted wooden furniture and warm lighting.",
        longDescription: "Escape the ordinary in this cozy retreat. Perfect for those looking for a different kind of hotel experience.",
        image: "/assets/room-8.png"
    },
];

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function RoomDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);

    // Calendar State
    const [viewDate, setViewDate] = useState(new Date(2024, 6, 1)); // Default July 2024
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Generate years for dropdown (e.g., current year - 1 to +5)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i);

    useEffect(() => {
        window.scrollTo(0, 0);
        const foundRoom = roomsData.find(r => r.id === parseInt(id));
        setRoom(foundRoom);

        // Example Range (Optional)
        const exampleStart = new Date(2024, 6, 5); // July 5
        const exampleEnd = new Date(2024, 7, 7);   // Aug 7
        setStartDate(exampleStart);
        setEndDate(exampleEnd);
    }, [id]);

    const handleMonthChange = (direction) => {
        const newDate = new Date(viewDate);
        newDate.setMonth(viewDate.getMonth() + direction);
        setViewDate(newDate);
    };

    const handleDropdownChange = (offset, type, value) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth() + offset;
        const currentInView = new Date(year, month, 1);

        if (type === 'month') {
            currentInView.setMonth(parseInt(value));
        } else if (type === 'year') {
            currentInView.setFullYear(parseInt(value));
        }

        // We need to adjust 'viewDate' (which corresponds to offset 0)
        // If we changed the month of offset 1 (right calendar), we need to shift viewDate so that right calendar is correct.
        // The right calendar is always viewDate + 1 month.
        // So if right calendar target is T, then viewDate should be T - 1 month.

        const newViewDate = new Date(currentInView);
        newViewDate.setMonth(newViewDate.getMonth() - offset);
        setViewDate(newViewDate);
    };

    const isSameDay = (d1, d2) => {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    };

    const handleDateClick = (day, monthOffset) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth() + monthOffset;
        const clickedDate = new Date(year, month, day);

        if (!startDate || (startDate && endDate)) {
            setStartDate(clickedDate);
            setEndDate(null);
        } else if (startDate && !endDate) {
            if (clickedDate < startDate) {
                setStartDate(clickedDate);
            } else if (isSameDay(clickedDate, startDate)) {
                setStartDate(clickedDate);
                setEndDate(null);
            } else {
                setEndDate(clickedDate);
            }
        }
    };

    const getMonthData = (offset) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth() + offset;
        const date = new Date(year, month, 1);

        const monthIndex = date.getMonth();
        const displayYear = date.getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = date.getDay(); // 0 = Sun

        return { monthIndex, displayYear, daysInMonth, firstDayIndex, offset };
    };

    const renderMonth = (offset) => {
        const { monthIndex, displayYear, daysInMonth, firstDayIndex } = getMonthData(offset);

        return (
            <div className="calendar-month">
                <div className="month-header">
                    <span
                        style={{ cursor: 'pointer', visibility: offset === 0 ? 'visible' : 'hidden' }}
                        onClick={() => handleMonthChange(-1)}
                    >
                        ‹
                    </span>

                    <div className="header-selects">
                        <select
                            className="header-select"
                            value={monthIndex}
                            onChange={(e) => handleDropdownChange(offset, 'month', e.target.value)}
                        >
                            {MONTHS.map((m, i) => (
                                <option key={i} value={i}>{m}</option>
                            ))}
                        </select>
                        <select
                            className="header-select"
                            value={displayYear}
                            onChange={(e) => handleDropdownChange(offset, 'year', e.target.value)}
                        >
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <span
                        style={{ cursor: 'pointer', visibility: offset === 1 ? 'visible' : 'hidden' }}
                        onClick={() => handleMonthChange(1)}
                    >
                        ›
                    </span>
                </div>
                <div className="calendar-grid">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="cal-day-label">{d}</div>)}
                    {[...Array(firstDayIndex)].map((_, i) => <div key={`empty-${i}`} className="cal-day empty"></div>)}
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const currentYear = viewDate.getFullYear();
                        const currentMonth = viewDate.getMonth() + offset;
                        const thisDate = new Date(currentYear, currentMonth, day);

                        let className = "cal-day";

                        if (startDate && endDate) {
                            if (isSameDay(thisDate, startDate)) {
                                className += " start-range";
                            } else if (isSameDay(thisDate, endDate)) {
                                className += " end-range";
                            } else if (thisDate > startDate && thisDate < endDate) {
                                className += " in-range";
                            }
                        } else if (startDate && isSameDay(thisDate, startDate)) {
                            className += " single-selected";
                        }

                        return (
                            <div
                                key={day}
                                className={className}
                                onClick={() => handleDateClick(day, offset)}
                            >
                                <span>{day}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

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
                {renderMonth(0)}
                {renderMonth(1)}
            </div>

            <div className="book-now-container">
                <button
                    className="btn-book-large"
                    onClick={() => {
                        if (startDate && endDate) {
                            alert(`Booked from ${startDate.toDateString()} to ${endDate.toDateString()}`);
                        } else {
                            alert("Please select a check-in and check-out date.");
                        }
                    }}
                >
                    Book Now
                </button>
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

/* Icons (Unchanged) */
const IconWifi = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>);
const IconAC = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20" /><path d="M2 16h20" /><path d="M2 8h20" /><path d="M6 12v4" /><path d="M10 12v4" /><path d="M14 12v4" /><path d="M18 12v4" /></svg>);
const IconCoffee = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>);
const IconPool = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20s.33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2"></path><path d="M2 16s.33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2 .33-2 3-2 3 2 3 2"></path><path d="M15 11.5l1.5-1.5 2 2 3-3"></path><path d="M7 2v5h5"></path></svg>);
const IconGym = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16"></path><path d="M5 7v10"></path><path d="M19 7v10"></path><path d="M9 17h6"></path><path d="M12 7v10"></path></svg>);
const IconParking = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><path d="M2 10h20"></path><path d="M6 15h4"></path><path d="M6 12v3"></path></svg>);
