import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/RoomManagement.css';
import '../../styles/RoomManagementModal.css';

const RoomManagement = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([
    { id: 101, type: 'Deluxe', capacity: 2, price: 200, status: 'Available' },
    { id: 102, type: 'Standard', capacity: 1, price: 100, status: 'Booked' },
    { id: 103, type: 'Suite', capacity: 4, price: 400, status: 'Maintenance' },
    { id: 104, type: 'Deluxe', capacity: 2, price: 200, status: 'Available' },
    { id: 105, type: 'Standard', capacity: 1, price: 100, status: 'Booked' },
    { id: 106, type: 'Suite', capacity: 4, price: 400, status: 'Available' },
    { id: 107, type: 'Deluxe', capacity: 2, price: 200, status: 'Maintenance' },
    { id: 108, type: 'Standard', capacity: 1, price: 100, status: 'Available' },
    { id: 109, type: 'Suite', capacity: 4, price: 400, status: 'Booked' },
    { id: 110, type: 'Deluxe', capacity: 2, price: 200, status: 'Available' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: '',
    description: '',
    capacity: '',
    price: '',
    facilities: {
      wifi: false,
      ac: false,
      balcony: false
    }
  });
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleAddNewRoom = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      roomNumber: '',
      roomType: '',
      description: '',
      capacity: '',
      price: '',
      facilities: {
        wifi: false,
        ac: false,
        balcony: false
      }
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

  const handleFacilityChange = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility]
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('roomNumber', formData.roomNumber);
      submitData.append('roomType', formData.roomType);
      submitData.append('description', formData.description);
      submitData.append('capacity', formData.capacity);
      submitData.append('price', formData.price);
      submitData.append('facilities', JSON.stringify(formData.facilities));
      
      images.forEach((image, index) => {
        submitData.append('images', image);
      });

      // API call would go here
      // await addRoom(submitData);
      
      alert('Room added successfully!');
      handleCloseModal();
      // Optionally refresh the rooms list
    } catch (error) {
      console.error('Error adding room:', error);
      alert('Failed to add room');
    }
  };

  const handleEdit = (roomId) => {
    navigate(`/admin/rooms/edit/${roomId}`);
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        // API call would go here
        // await deleteRoom(roomId);
        setRooms(rooms.filter(room => room.id !== roomId));
        alert('Room deleted successfully');
      } catch (error) {
        console.error('Error deleting room:', error);
        alert('Failed to delete room');
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'status-available';
      case 'booked':
        return 'status-booked';
      case 'maintenance':
        return 'status-maintenance';
      default:
        return '';
    }
  };

  return (
    <div className="room-management-container">
      <div className="room-management-header">
        <h1>Room Management</h1>
        <button className="add-room-btn" onClick={handleAddNewRoom}>
          Add New Room
        </button>
      </div>

      <div className="rooms-table-wrapper">
        <table className="rooms-table">
          <thead>
            <tr>
              <th>Room No</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="room-number">{room.id}</td>
                <td className="room-type">{room.type}</td>
                <td>{room.capacity}</td>
                <td>${room.price}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(room.status)}`}>
                    {room.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-link edit-link"
                    onClick={() => handleEdit(room.id)}
                  >
                    Edit
                  </button>
                  <span className="action-divider">|</span>
                  <button 
                    className="action-link delete-link"
                    onClick={() => handleDelete(room.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                    <label htmlFor="roomNumber">Room Number</label>
                    <input
                      type="text"
                      id="roomNumber"
                      name="roomNumber"
                      placeholder="Enter room number"
                      value={formData.roomNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="roomType">Room Type</label>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select room type</option>
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                      <option value="Executive">Executive</option>
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
                    <label>Facilities Checklist</label>
                    <div className="facilities-list">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.facilities.wifi}
                          onChange={() => handleFacilityChange('wifi')}
                        />
                        <span className="checkbox-text">Wi-Fi</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.facilities.ac}
                          onChange={() => handleFacilityChange('ac')}
                        />
                        <span className="checkbox-text">AC</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.facilities.balcony}
                          onChange={() => handleFacilityChange('balcony')}
                        />
                        <span className="checkbox-text">Balcony</span>
                      </label>
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