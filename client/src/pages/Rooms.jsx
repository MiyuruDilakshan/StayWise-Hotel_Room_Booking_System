// src/pages/Rooms.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Rooms.css';

export default function Rooms() {
    const navigate = useNavigate();
    // Mock data matching your screenshot
    const [rooms] = useState([
        { id: 1, name: "Deluxe Suite", price: 150, type: "Suite", isPopular: true },
        { id: 2, name: "Superior Double Room", price: 220, type: "Double", isPopular: true },
        { id: 3, name: "Executive Suite", price: 350, type: "Suite", isPopular: true },
        { id: 4, name: "Ocean View Suite", price: 400, type: "Suite", isPopular: false },
        { id: 5, name: "Executive Suite", price: 500, type: "Suite", isPopular: false },
        { id: 6, name: "Superior Double Room", price: 500, type: "Double", isPopular: false },
        { id: 7, name: "Presidential Suite", price: 500, type: "Suite", isPopular: false },
        { id: 8, name: "Wodden Pit", price: 400, type: "Double", isPopular: false },
    ]);

    // Price Range State
    const min = 100;
    const max = 1000;
    const [minPrice, setMinPrice] = useState(250);
    const [maxPrice, setMaxPrice] = useState(750);
    const [minPercent, setMinPercent] = useState(0);
    const [maxPercent, setMaxPercent] = useState(0);

    // Calculate percentages for the slider bar
    useEffect(() => {
        const minP = ((minPrice - min) / (max - min)) * 100;
        const maxP = ((maxPrice - min) / (max - min)) * 100;
        setMinPercent(minP);
        setMaxPercent(maxP);
    }, [minPrice, maxPrice, min, max]);

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 1);
        setMinPrice(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 1);
        setMaxPrice(value);
    };

    return (
        <div className="rooms-page-container">
            {/* LEFT SIDEBAR - FILTERS */}
            <aside className="filters-sidebar">
                <h2>Filters</h2>

                {/* Price Range */}
                <div className="filter-group">
                    <label className="filter-label">Price Range</label>
                    <div className="slider-container">
                        <div className="slider-track"></div>
                        <div
                            className="slider-range"
                            style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
                        ></div>
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={minPrice}
                            onChange={handleMinChange}
                            className="thumb thumb-left"
                        />
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={maxPrice}
                            onChange={handleMaxChange}
                            className="thumb thumb-right"
                        />
                    </div>
                    <div className="price-values">${minPrice} - ${maxPrice}</div>
                </div>

                {/* Capacity */}
                <div className="filter-group">
                    <label className="filter-label">Capacity</label>
                    <div className="custom-select-wrapper">
                        <select className="custom-select">
                            <option>Select Capacity</option>
                            <option>1 Person</option>
                            <option>2 People</option>
                            <option>3+ People</option>
                        </select>
                        {/* CSS handles the icon */}
                    </div>
                </div>

                {/* Room Type Checkboxes */}
                <div className="filter-group checkbox-group">
                    <label className="checkbox-item">
                        <input type="checkbox" /> <span className="checkmark"></span> Single
                    </label>
                    <label className="checkbox-item">
                        <input type="checkbox" /> <span className="checkmark"></span> Double
                    </label>
                    <label className="checkbox-item">
                        <input type="checkbox" /> <span className="checkmark"></span> Suite
                    </label>
                </div>

                {/* Sort By */}
                <div className="filter-group">
                    <h3>Sort By</h3>
                    <div className="sort-options">
                        <label className="radio-item">
                            <input type="radio" name="sort" defaultChecked />
                            <span className="radio-custom"></span> Low-High Price
                        </label>
                        <label className="radio-item">
                            <input type="radio" name="sort" />
                            <span className="radio-custom"></span> Popular
                        </label>
                    </div>
                </div>
            </aside>

            {/* RIGHT MAIN CONTENT - ROOMS GRID */}
            <main className="rooms-main">
                <div className="rooms-header">
                    <h1>Rooms</h1>
                    <p>Discover our luxurious rooms and suites, each designed for comfort and elegance.</p>
                </div>

                <div className="rooms-grid">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className="room-card"
                            onClick={() => navigate(`/rooms/${room.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="room-image-placeholder">
                                {room.isPopular && (
                                    <div className="popular-badge">
                                        <span className="badge-bold">Popular</span> <span className="badge-light">Choice</span>
                                    </div>
                                )}
                                {/* Image Placeholder - Replace background with real image later */}
                                <div className="img-bg"></div>
                            </div>

                            <div className="room-info">
                                <h3>{room.name}</h3>
                                <p className="room-price">${room.price} per night</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
