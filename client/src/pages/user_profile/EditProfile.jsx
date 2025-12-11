import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="edit-profile-container">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="link" onClick={() => navigate("/profile")}>
          User Profile
        </span>
        {' / '}
        <span>Edit Profile</span>
      </div>

      {/* Header */}
      <div className="edit-header">
        <h1>Edit Profile</h1>

        {/* BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate("/profile")}
        >
          Back to User Profile
        </button>
      </div>

      {/* Form Fields */}
      <div className="form-group">
        <label>Name</label>
        <input type="text" placeholder="Sophia Fernando" />
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input type="email" placeholder="sophia.fernando@example.com" />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input type="tel" placeholder="+1 234 567 8900" />
      </div>

      <div className="form-group">
        <label>Physical Address</label>
        <input type="text" placeholder="123 Main St, New York, NY 10001" />
      </div>

      <div className="form-group">
        <label>Profile Picture</label>
        <div className="upload-container">
          <label htmlFor="file-upload" className="upload-btn">
            Upload Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          
          {profilePic && (
            <div className="preview-image">
              <img src={profilePic} alt="Preview" />
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="save-btn">Save Changes</button>
        <button
          className="cancel-btn"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
