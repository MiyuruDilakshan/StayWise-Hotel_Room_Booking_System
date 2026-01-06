// src/pages/Rooms.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import roomService from '../services/roomService';
import '../styles/BrowseRooms.css';

export default function Rooms() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Price Range State
    const [min, setMin] = useState(50);
    const [max, setMax] = useState(600);
    const [minPrice, setMinPrice] = useState(50);
    const [maxPrice, setMaxPrice] = useState(600);
    const [minPercent, setMinPercent] = useState(0);
    const [maxPercent, setMaxPercent] = useState(100);
    const [selectedCapacity, setSelectedCapacity] = useState('');
    const [selectedBedType, setSelectedBedType] = useState('');
    const [sortBy, setSortBy] = useState('price-low');

    // Fetch rooms from database
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const response = await roomService.getAllRooms();
                if (response.success) {
                    const fetchedRooms = response.data;
                    setRooms(fetchedRooms);
                    setFilteredRooms(fetchedRooms);

                    // Calculate dynamic price range
                    if (fetchedRooms.length > 0) {
                        const prices = fetchedRooms.map(r => r.price);
                        const minP = Math.min(...prices);
                        const maxP = Math.max(...prices);
                        // Add some buffer
                        const newMin = Math.floor(minP * 0.9);
                        const newMax = Math.ceil(maxP * 1.1);
                        
                        setMin(newMin);
                        setMax(newMax);
                        setMinPrice(newMin);
                        setMaxPrice(newMax);
                    }
                } else {
                    setError('Failed to fetch rooms');
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch rooms');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    // Calculate percentages for the slider bar
    useEffect(() => {
        const minP = ((minPrice - min) / (max - min)) * 100;
        const maxP = ((maxPrice - min) / (max - min)) * 100;
        setMinPercent(minP);
        setMaxPercent(maxP);
    }, [minPrice, maxPrice, min, max]);

    // Apply filters when any filter changes
    useEffect(() => {
        filterRooms();
    }, [minPrice, maxPrice, selectedCapacity, selectedBedType, sortBy, rooms]);

    const filterRooms = () => {
        let filtered = rooms.filter(room => {
            // Price filter
            if (room.price < minPrice || room.price > maxPrice) return false;

            // Capacity filter
            if (selectedCapacity && room.capacity !== parseInt(selectedCapacity)) return false;

            // Bed type filter
            if (selectedBedType && room.bedType !== selectedBedType) return false;

            return true;
        });

        // Apply sorting
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredRooms(filtered);
    };

    const handleMinChange = (e) => {
        const newMin = Number(e.target.value);
        setMinPrice(newMin);
    };

    const handleMaxChange = (e) => {
        const newMax = Number(e.target.value);
        setMaxPrice(newMax);
    };

    const handleClearFilters = () => {
        setMinPrice(min);
        setMaxPrice(max);
        setSelectedCapacity('');
        setSelectedBedType('');
        setSortBy('price-low');
    };

    if (loading) {
        return (
            <div className="rooms-page-container">
                <div className="loading-spinner" style={{ gridColumn: '1 / -1' }}>
                    <p>Loading rooms...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rooms-page-container">
                <div className="error-message" style={{ gridColumn: '1 / -1' }}>
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="browse-rooms-container">
            {/* LEFT SIDEBAR - FILTERS */}
            <aside className="browse-rooms-sidebar">
                <div className="browse-rooms-filter-header">
                    <h2>Filters</h2>
                    <button 
                        className="browse-rooms-clear-btn"
                        onClick={handleClearFilters}
                    >
                        Clear
                    </button>
                </div>

                {/* Price Range */}
                <div className="browse-rooms-filter-group">
                    <label className="browse-rooms-filter-label">Price Range</label>
                    <div className="browse-rooms-range-slider">
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={minPrice}
                            onChange={handleMinChange}
                            className="browse-rooms-range-input browse-rooms-range-input-min"
                        />
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={maxPrice}
                            onChange={handleMaxChange}
                            className="browse-rooms-range-input browse-rooms-range-input-max"
                        />
                        <div className="browse-rooms-range-track"></div>
                        <div
                            className="browse-rooms-range-fill"
                            style={{
                                left: `${((minPrice - min) / (max - min)) * 100}%`,
                                right: `${100 - ((maxPrice - min) / (max - min)) * 100}%`
                            }}
                        ></div>
                    </div>
                    <div className="browse-rooms-price-values">${minPrice} - ${maxPrice}</div>
                </div>

                {/* Capacity */}
                <div className="browse-rooms-filter-group">
                    <label className="browse-rooms-filter-label">Capacity</label>
                    <div className="browse-rooms-select-wrapper">
                        <select 
                            className="browse-rooms-select"
                            value={selectedCapacity}
                            onChange={(e) => setSelectedCapacity(e.target.value)}
                        >
                            <option value="">Select Capacity</option>
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="4">4 People</option>
                        </select>
                    </div>
                </div>

                {/* Bed Type Checkboxes */}
                <div className="browse-rooms-filter-group browse-rooms-checkbox-group">
                    <label className="browse-rooms-checkbox-item">
                        <input 
                            type="radio" 
                            name="bedType"
                            value=""
                            checked={selectedBedType === ''}
                            onChange={(e) => setSelectedBedType(e.target.value)}
                        />
                        All Types
                    </label>
                    <label className="browse-rooms-checkbox-item">
                        <input 
                            type="radio"
                            name="bedType"
                            value="Single"
                            checked={selectedBedType === 'Single'}
                            onChange={(e) => setSelectedBedType(e.target.value)}
                        />
                        Single
                    </label>
                    <label className="browse-rooms-checkbox-item">
                        <input 
                            type="radio"
                            name="bedType"
                            value="Double"
                            checked={selectedBedType === 'Double'}
                            onChange={(e) => setSelectedBedType(e.target.value)}
                        />
                        Double
                    </label>
                    <label className="browse-rooms-checkbox-item">
                        <input 
                            type="radio"
                            name="bedType"
                            value="Twin"
                            checked={selectedBedType === 'Twin'}
                            onChange={(e) => setSelectedBedType(e.target.value)}
                        />
                        Twin
                    </label>
                    <label className="browse-rooms-checkbox-item">
                        <input 
                            type="radio"
                            name="bedType"
                            value="Family"
                            checked={selectedBedType === 'Family'}
                            onChange={(e) => setSelectedBedType(e.target.value)}
                        />
                    Family
                    </label>
                </div>

                {/* Sort By */}
                <div className="browse-rooms-filter-group">
                    <h3>Sort By</h3>
                    <div className="browse-rooms-sort-options">
                        <label className="browse-rooms-radio-item">
                            <input 
                                type="radio" 
                                name="sort" 
                                value="price-low"
                                checked={sortBy === 'price-low'}
                                onChange={(e) => setSortBy(e.target.value)}
                            />
                            Low-High Price
                        </label>
                        <label className="browse-rooms-radio-item">
                            <input 
                                type="radio" 
                                name="sort"
                                value="price-high"
                                checked={sortBy === 'price-high'}
                                onChange={(e) => setSortBy(e.target.value)}
                            />
                            High-Low Price
                        </label>
                        <label className="browse-rooms-radio-item">
                            <input 
                                type="radio" 
                                name="sort"
                                value="name"
                                checked={sortBy === 'name'}
                                onChange={(e) => setSortBy(e.target.value)}
                            />
                            Name
                        </label>
                    </div>
                </div>
            </aside>

            {/* RIGHT MAIN CONTENT - ROOMS GRID */}
            <main className="browse-rooms-main">
                <div className="browse-rooms-header">
                    <h1>Our Rooms</h1>
                    <p>Discover our luxurious rooms and suites, each designed for comfort and elegance.</p>
                </div>

                <div className="browse-rooms-count">
                    <p>Showing {filteredRooms.length} of {rooms.length} rooms</p>
                </div>

                <div className="browse-rooms-grid">
                    {filteredRooms.length > 0 ? (
                        filteredRooms.map((room) => {
                            // Helper to determine image source
                            const getImageSource = (r) => {
                                if (r.images && r.images.length > 0) {
                                    return r.images[0].src || r.images[0];
                                }
                                if (r.image) {
                                    return r.image;
                                }
                                
                            };
                            const bgImage = getImageSource(room);

                            return (
                                <div
                                    key={room._id}
                                    className="browse-room-card"
                                    onClick={() => navigate(`/rooms/${room._id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="browse-room-image">
                                        <img 
                                            src={bgImage} 
                                            alt={room.name}
                                            style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'cover',
                                                display: 'block'
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                
                                            }}
                                        />
                                        <div className="browse-room-overlay">
                                            <button className="browse-room-view-btn">View Details</button>
                                        </div>
                                    </div>

                                    <div className="browse-room-info">
                                    <div className="browse-room-header-info">
                                        <h3>{room.name}</h3>
                                        <span className="browse-room-bed-badge">{room.bedType}</span>
                                    </div>
                                    <p className="browse-room-description">{room.description}</p>
                                    <div className="browse-room-features">
                                        <span className="browse-room-feature">
                                            👥 Up to {room.capacity} guests
                                        </span>
                                    </div>
                                    <div className="browse-room-amenities-preview">
                                        {room.amenities && room.amenities.slice(0, 2).map((amenity, idx) => (
                                            <span key={idx} className="browse-room-amenity-tag">{amenity}</span>
                                        ))}
                                        {room.amenities && room.amenities.length > 2 && (
                                            <span className="browse-room-amenity-tag">+{room.amenities.length - 2} more</span>
                                        )}
                                    </div>
                                    <div className="browse-room-footer">
                                        <p className="browse-room-price">${room.price}<span>/night</span></p>
                                    </div>
                                </div>
                            </div>
                            );
                        })
                    ) : (
                        <div className="browse-rooms-no-message" style={{ gridColumn: '1 / -1' }}>
                            <p>No rooms match your filters. Please adjust your search.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
