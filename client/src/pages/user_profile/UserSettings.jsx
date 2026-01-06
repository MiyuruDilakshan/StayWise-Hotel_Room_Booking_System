import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateNotificationSettings, changePassword } from '../../services/userProfileService';
import '../../styles/UserSettings.css';

const UserSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [bookingNotif, setBookingNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
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
        if (user.notificationSettings) {
          setBookingNotif(user.notificationSettings.bookingNotifications !== false);
          setPromoNotif(user.notificationSettings.promoNotifications !== false);
          setEmailUpdates(user.notificationSettings.emailUpdates !== false);
        }
        setError(null);
      } catch (err) {
        console.error('Error loading settings:', err);
        setError(err.message || 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [navigate]);

  const handleNotificationChange = async (type) => {
    try {
      setSaving(true);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?._id || storedUser?.id;
      
      let newSettings;
      if (type === 'booking') {
        newSettings = {
          bookingNotifications: !bookingNotif,
          promoNotifications: promoNotif,
          emailUpdates: emailUpdates
        };
        setBookingNotif(!bookingNotif);
      } else if (type === 'promo') {
        newSettings = {
          bookingNotifications: bookingNotif,
          promoNotifications: !promoNotif,
          emailUpdates: emailUpdates
        };
        setPromoNotif(!promoNotif);
      } else if (type === 'email') {
        newSettings = {
          bookingNotifications: bookingNotif,
          promoNotifications: promoNotif,
          emailUpdates: !emailUpdates
        };
        setEmailUpdates(!emailUpdates);
      }

      await updateNotificationSettings(userId, newSettings);
      setSuccess('Settings updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error updating settings:', err);
      setError(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('All password fields are required');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    try {
      setChangingPassword(true);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?._id || storedUser?.id;
      
      await changePassword(
        userId,
        passwordForm.currentPassword,
        passwordForm.newPassword
      );

      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setPasswordSuccess(null), 3000);
    } catch (err) {
      console.error('Error changing password:', err);
      setPasswordError(err.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="user-settings-container">
        <div className="loading">Loading your settings...</div>
      </div>
    );
  }

  return (
    <div className="user-settings-container">
      <div className="breadcrumb">
        <span className="link" onClick={() => navigate("/profile")}>
          User Profile
        </span>
        {' / '}
        <span>User Settings</span>
      </div>

      <div className="settings-header">
        <div>
          <h1>User Settings</h1>
          <p>Manage your preferences and app settings.</p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/profile")}
        >
          Back to User Profile
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Notification Preferences */}
      <section className="settings-section">
        <h2>Notification Preferences</h2>

        <div className="toggle-item">
          <div>
            <h3>Booking Notifications</h3>
            <p>Receive notifications about your bookings and updates.</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={bookingNotif}
              onChange={() => handleNotificationChange('booking')}
              disabled={saving}
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
              onChange={() => handleNotificationChange('promo')}
              disabled={saving}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-item">
          <div>
            <h3>Email Updates</h3>
            <p>Receive email updates about your account and bookings.</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={() => handleNotificationChange('email')}
              disabled={saving}
            />
            <span className="slider"></span>
          </label>
        </div>
      </section>

      {/* Password Management */}
      <section className="settings-section">
        <h2>Password Management</h2>

        {passwordError && <div className="error-message">{passwordError}</div>}
        {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}

        <form onSubmit={handlePasswordSubmit} className="password-form">
          <div className="password-field">
            <label>Current Password</label>
            <input 
              type="password" 
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              disabled={changingPassword}
            />
          </div>

          <div className="password-field">
            <label>New Password</label>
            <input 
              type="password" 
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password (min 6 characters)"
              disabled={changingPassword}
            />
          </div>

          <div className="password-field">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              disabled={changingPassword}
            />
          </div>

          <button 
            type="submit" 
            className="change-password-btn"
            disabled={changingPassword}
          >
            {changingPassword ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </section>

      {/* Privacy Settings */}
      <section className="settings-section">
        <h2>Privacy Settings</h2>

        <div className="privacy-item">
          <div>
            <h3>Profile Visibility</h3>
            <p>Your profile is only visible to you and our support team.</p>
          </div>
          <span className="privacy-value">Private</span>
        </div>

        <div className="privacy-item">
          <div>
            <h3>Data Collection</h3>
            <p>We collect minimal data to improve your booking experience.</p>
          </div>
          <span className="privacy-value">Limited</span>
        </div>
      </section>
    </div>
  );
};

export default UserSettings;

