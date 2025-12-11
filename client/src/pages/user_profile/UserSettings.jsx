import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/UserSettings.css';

const UserSettings = () => {
  const navigate = useNavigate();

  const [bookingNotif, setBookingNotif] = useState(false);
  const [promoNotif, setPromoNotif] = useState(true);

  return (
    <div className="user-settings-container">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="link" onClick={() => navigate("/profile")}>
          User Profile
        </span>
        {' / '}
        <span>User Settings</span>
      </div>

      {/* Header */}
      <div className="settings-header">
        <div>
          <h1>User Settings</h1>
          <p>Manage your preferences and app settings.</p>
        </div>

        {/* BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate("/profile")}
        >
          Back to User Profile
        </button>
      </div>

      {/* Notification Preferences */}
      <section className="settings-section">
        <h2>Notification Preferences</h2>

        <div className="toggle-item">
          <div>
            <h3>Booking Notifications</h3>
            <p>Receive notifications about your bookings, special offers, and updates.</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={bookingNotif}
              onChange={() => setBookingNotif(!bookingNotif)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-item">
          <div>
            <h3>Promotional Offers</h3>
            <p>Get notified about new promotions, discounts, and exclusive deals.</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={promoNotif}
              onChange={() => setPromoNotif(!promoNotif)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </section>

      {/* Privacy Settings */}
      <section className="settings-section">
        <h2>Privacy Settings</h2>

        <div className="privacy-item">
          <div>
            <h3>Profile Visibility</h3>
            <p>Control who can view your profile information and activity.</p>
          </div>
          <span className="privacy-value">Public</span>
        </div>

        <div className="privacy-item">
          <div>
            <h3>Data Collection</h3>
            <p>Manage the data StayWise collects and how it's used.</p>
          </div>
          <a href="#" className="manage-link">Manage</a>
        </div>
      </section>

      {/* Password Management */}
      <section className="settings-section">
        <h2>Password Management</h2>

        <div className="password-field">
          <label>Current Password</label>
          <input type="password" placeholder="Enter current password" />
        </div>

        <div className="password-field">
          <label>New Password</label>
          <input type="password" placeholder="Enter new password" />
        </div>

        <div className="password-field">
          <label>Confirm New Password</label>
          <input type="password" placeholder="Confirm new password" />
        </div>
      </section>

      {/* Language Selection */}
      <section className="settings-section language-section">
        <h2>Language Selection</h2>

        <div className="language-item">
          <div>
            <h3>Language</h3>
          </div>
          <span className="language-value">English</span>
        </div>
      </section>

      {/* Save Button */}
      <div className="save-changes">
        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default UserSettings;
