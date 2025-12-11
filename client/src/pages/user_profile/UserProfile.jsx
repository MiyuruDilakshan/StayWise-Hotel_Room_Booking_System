// src/components/ProfileDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/UserProfile.css";

const UserProfile = () => {
  return (
    <div className="profile-dashboard">
      <div className="profile-header">
        <div className="avatar">
          <img
            src="https://via.placeholder.com/120?text=Sophia"
            alt="Sophia Fernando"
            className="avatar-img"
          />
        </div>
        <h2 className="user-name">Sophia Fernando</h2>
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
            <Link to="/login" className="menu-item logout" aria-label="Logout">
              <span className="icon">↩</span>
              <span className="menu-text">Logout</span>
              <span className="arrow">›</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
