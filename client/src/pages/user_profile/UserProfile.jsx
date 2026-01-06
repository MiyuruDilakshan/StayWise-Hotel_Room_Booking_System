import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/userProfileService";
import "../../styles/UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
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
        setUser(response.data);
        setError(null);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="profile-dashboard">
        <div className="loading">Loading your profile...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="profile-dashboard">
        <div className="error">{error || 'Profile not found'}</div>
      </div>
    );
  }

  return (
    <div className="profile-dashboard">
      <div className="profile-header">
        <div className="avatar">
          {user.profileImage ? (
            <img src={user.profileImage} alt={user.name} className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">
              {user.name && user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h2 className="user-name">{user.name}</h2>
        <p className="user-email">{user.email}</p>
      </div>

      <div className="dropdown-menu">
        <ul>
          <li>
            <Link to="/mybookings" className="menu-item" aria-label="My Bookings">
              <span className="icon">📅</span>
              <span className="menu-text">My Bookings</span>
              <span className="arrow">›</span>
            </Link>
          </li>

          <li>
            <Link to="/settings" className="menu-item" aria-label="User Settings">
              <span className="icon">⚙️</span>
              <span className="menu-text">User Settings</span>
              <span className="arrow">›</span>
            </Link>
          </li>

          <li>
            <Link to="/editprofile" className="menu-item" aria-label="Edit Profile">
              <span className="icon">✏️</span>
              <span className="menu-text">Edit Profile</span>
              <span className="arrow">›</span>
            </Link>
          </li>

          <li>
            <button onClick={handleLogout} className="menu-item logout" aria-label="Logout">
              <span className="icon">↩</span>
              <span className="menu-text">Logout</span>
              <span className="arrow">›</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
