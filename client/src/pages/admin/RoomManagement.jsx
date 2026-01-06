import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms, createRoom, deleteRoom } from '../../services/adminService';
import '../../styles/RoomManagement.css';
import '../../styles/RoomManagementModal.css';

const RoomManagement = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    price: '',
    bedType: '',
    amenities: []
  });
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const availableAmenities = ["WiFi", "Air Conditioning", "TV", "Minibar", "Balcony", "Safe", "Workspace", "Bathtub"];

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const result = await getRooms();
      if (result.success) {
        setRooms(result.data);
      }
    } catch (err) {
      console.error('Failed to load rooms:', err);
      setError('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewRoom = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      description: '',
      capacity: '',
      price: '',
      bedType: '',
      amenities: []
    });
    setImages([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setImages(prev => [...prev, ...fileArray]);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Convert images to base64
      const base64Images = await Promise.all(images.map(file => convertToBase64(file)));

      const roomData = {
        name: formData.name,
        description: formData.description,
        capacity: parseInt(formData.capacity),
        price: parseFloat(formData.price),
        bedType: formData.bedType,
        amenities: formData.amenities,
        images: base64Images
      };

      await createRoom(roomData);
      
      alert('Room added successfully!');
      handleCloseModal();
      loadRooms();
    } catch (error) {
      console.error('Error adding room:', error);
      alert('Failed to add room: ' + (error.message || 'Unknown error'));
    }
  };

  const handleEdit = (roomId) => {
    navigate(`/admin/rooms/edit/${roomId}`);
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(roomId);
        setRooms(rooms.filter(room => room._id !== roomId));
        alert('Room deleted successfully');
      } catch (error) {
        console.error('Error deleting room:', error);
        alert('Failed to delete room');
      }
    }
  };

  const getStatusClass = (isAvailable) => {
    return isAvailable ? 'status-available' : 'status-booked';
  };

  return (
    <div className="room-management-container">
      <div className="room-management-header">
        <h1>Room Management</h1>
        <button className="add-room-btn" onClick={handleAddNewRoom}>
          Add New Room
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading rooms...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="rooms-table-wrapper">
          <table className="rooms-table">
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td className="room-number">{room.name}</td>
                  <td className="room-type">{room.bedType}</td>
                  <td>{room.capacity}</td>
                  <td>${room.price}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(room.isAvailable)}`}>
                      {room.isAvailable ? 'Available' : 'Booked'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="action-link edit-link"
                      onClick={() => handleEdit(room._id)}
                    >
                      Edit
                    </button>
                    <span className="action-divider">|</span>
                    <button 
                      className="action-link delete-link"
                      onClick={() => handleDelete(room._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Room Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Room</h2>
              <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit} className="add-room-form">
                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="name">Room Name/Number</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter room name or number"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bedType">Bed Type</label>
                    <select
                      id="bedType"
                      name="bedType"
                      value={formData.bedType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select bed type</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Queen">Queen</option>
                      <option value="King">King</option>
                      <option value="Twin">Twin</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      placeholder="Enter room description"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      placeholder="Enter capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Amenities</label>
                    <div className="facilities-list">
                      {availableAmenities.map((amenity) => (
                        <label key={amenity} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => handleAmenityChange(amenity)}
                          />
                          <span className="checkbox-text">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Upload Images</label>
                    <div 
                      className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <div className="upload-content">
                        <p className="upload-title">Drag and drop images here</p>
                        <p className="upload-subtitle">Or click to browse</p>
                        <input
                          type="file"
                          id="fileInput"
                          multiple
                          accept="image/*"
                          onChange={handleFileInput}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="fileInput" className="upload-button">
                          Upload
                        </label>
                      </div>
                    </div>
                    {images.length > 0 && (
                      <div className="uploaded-files">
                        <p>{images.length} file(s) selected</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="save-room-btn">
                    Save Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <footer className="room-footer">
        © 2024 StayWise Hotels. All rights reserved.
      </footer>
    </div>
  );
};

export default RoomManagement;
