import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../../services/userProfileService';
import '../../styles/EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const userId = storedUser?._id || storedUser?.id;
        
        if (!storedUser || !userId) {
          setError('User not found. Please log in again.');
          navigate('/login');
          return;
        }

        const response = await getUserProfile(userId);
        const user = response.data;
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          city: user.city || '',
          country: user.country || ''
        });
        if (user.profileImage) {
          setProfilePic(user.profileImage);
        }
        setError(null);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?._id || storedUser?.id;
      
      const updatePayload = {
        ...formData,
        profileImage: profilePic
      };

      const response = await updateUserProfile(userId, updatePayload);
      
      // Update localStorage with minimal user data only to avoid quota issues
      const updatedUser = {
        ...storedUser,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        address: response.data.address,
        profileImage: response.data.profileImage
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-container">
        <div className="loading">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="breadcrumb">
        <span className="link" onClick={() => navigate("/profile")}>
          User Profile
        </span>
        {' / '}
        <span>Edit Profile</span>
      </div>

      <div className="edit-header">
        <h1>Edit Profile</h1>
        <button
          className="back-btn"
          onClick={() => navigate("/profile")}
        >
          Back to User Profile
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
          />
        </div>

        <div className="form-group">
          <label>Physical Address</label>
          <input 
            type="text" 
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, Apartment 4B"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New York"
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input 
              type="text" 
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="United States"
            />
          </div>
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

        <div className="action-buttons">
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/profile")}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
