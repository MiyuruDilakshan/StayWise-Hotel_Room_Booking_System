// src/pages/Rooms.jsx
import React, { useState } from 'react';
import '../styles/Rooms.css';

export default function Rooms() {
  // Data matching the specific text and prices in your screenshot
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

  return (
    <div className="rooms-page-container">
      {/* LEFT SIDEBAR - FILTERS */}
      <aside className="filters-sidebar">
        <h2>Filters</h2>

        {/* Price Range */}
        <div className="filter-group">
          <label className="filter-label">Price Range</label>
          <input type="range" min="100" max="1000" className="price-slider" />
          <div className="price-range-line"></div>
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
            <span className="select-arrow">⌄</span>
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
            <div key={room.id} className="room-card">
              <div className="room-image-placeholder">
                {room.isPopular && (
                  <span className="popular-badge">
                    <span className="badge-highlight">Popular</span> Choice
                  </span>
                )}
                {/* Placeholder for future images */}
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
