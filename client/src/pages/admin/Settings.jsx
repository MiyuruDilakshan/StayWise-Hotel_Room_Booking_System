// client/src/pages/admin/Settings.jsx
import React, { useEffect, useState, useRef } from "react";
import adminSettingsService from "../../services/adminSettingsService";
import "../../styles/Settings.css";

export default function Settings() {
  // Profile settings state
  const [adminProfile, setAdminProfile] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
  });

  // Hotel settings state
  const [hotelSettings, setHotelSettings] = useState({
    hotelName: "StayWise Hotel",
    address: "123 Hotel Street, Colombo, Sri Lanka",
    email: "info@staywise.com",
    phone: "+94 11 234 5678",
    logoUrl: "/images/logo.png",
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // UI state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // profile, hotel, password
  const [message, setMessage] = useState({ type: "", text: "" });

  // Load admin profile on mount
  useEffect(() => {
    loadAdminProfile();
    loadHotelInfo();
  }, []);

  const loadAdminProfile = async () => {
    try {
      setLoading(true);
      const response = await adminSettingsService.getProfile();
      if (response.success) {
        setAdminProfile(response.data);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to load profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadHotelInfo = async () => {
    try {
      const response = await adminSettingsService.getHotelInfo();
      if (response.success) {
        setHotelSettings(response.data);
      }
    } catch (error) {
      console.error("Failed to load hotel info:", error);
    }
  };

  // Profile handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAdminProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      const response = await adminSettingsService.updateProfile({
        name: adminProfile.name,
        phone: adminProfile.phone,
        department: adminProfile.department,
      });

      if (response.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setSaving(false);
    }
  };

  // Hotel settings handlers
  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveHotel = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      const response = await adminSettingsService.updateHotelInfo(hotelSettings);

      if (response.success) {
        setMessage({ type: "success", text: "Hotel settings updated successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update hotel settings",
      });
    } finally {
      setSaving(false);
    }
  };

  // Password change handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      // Validation
      if (
        !passwordData.currentPassword ||
        !passwordData.newPassword ||
        !passwordData.confirmPassword
      ) {
        throw new Error("Please fill all password fields");
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New passwords do not match");
      }

      if (passwordData.newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters");
      }

      const response = await adminSettingsService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmPassword
      );

      if (response.success) {
        setMessage({ type: "success", text: "Password changed successfully!" });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to change password",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="admin-settings-page">
        <h1 className="page-title">Settings</h1>
        <div className="loading">Loading settings...</div>
      </main>
    );
  }

  return (
    <main className="admin-settings-page">
      <h1 className="page-title">Settings</h1>

      {/* Message Display */}
      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="settings-tabs">
        <button
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Admin Profile
        </button>
        <button
          className={`tab-btn ${activeTab === "hotel" ? "active" : ""}`}
          onClick={() => setActiveTab("hotel")}
        >
          Hotel Information
        </button>
        <button
          className={`tab-btn ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <form className="settings-form" onSubmit={handleSaveProfile}>
          <section className="card">
            <h2 className="section-title">Admin Profile</h2>

            <label className="label">Full Name *</label>
            <input
              className="input"
              name="name"
              type="text"
              value={adminProfile.name || ""}
              onChange={handleProfileChange}
              placeholder="Enter your full name"
              required
            />

            <label className="label">Email</label>
            <input
              className="input"
              name="email"
              type="email"
              value={adminProfile.email || ""}
              disabled
              placeholder="Email (cannot be changed)"
            />

            <label className="label">Role</label>
            <input
              className="input"
              name="role"
              type="text"
              value={adminProfile.role || ""}
              disabled
              placeholder="Your role"
            />

            <label className="label">Phone</label>
            <input
              className="input"
              name="phone"
              type="tel"
              value={adminProfile.phone || ""}
              onChange={handleProfileChange}
              placeholder="Enter your phone number"
            />

            <label className="label">Department</label>
            <input
              className="input"
              name="department"
              type="text"
              value={adminProfile.department || ""}
              onChange={handleProfileChange}
              placeholder="Enter your department"
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </section>
        </form>
      )}

      {/* Hotel Settings Tab */}
      {activeTab === "hotel" && (
        <form className="settings-form" onSubmit={handleSaveHotel}>
          <section className="card">
            <h2 className="section-title">Hotel Information</h2>

            <label className="label">Hotel Name</label>
            <input
              className="input"
              name="hotelName"
              type="text"
              value={hotelSettings.hotelName || ""}
              onChange={handleHotelChange}
              placeholder="Enter hotel name"
            />

            <label className="label">Address</label>
            <textarea
              className="textarea"
              name="address"
              value={hotelSettings.address || ""}
              onChange={handleHotelChange}
              rows={4}
              placeholder="Enter hotel address"
            />

            <label className="label">Hotel Email</label>
            <input
              className="input"
              name="email"
              type="email"
              value={hotelSettings.email || ""}
              onChange={handleHotelChange}
              placeholder="Enter hotel email"
            />

            <label className="label">Hotel Phone</label>
            <input
              className="input"
              name="phone"
              type="tel"
              value={hotelSettings.phone || ""}
              onChange={handleHotelChange}
              placeholder="Enter hotel phone number"
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Hotel Settings"}
            </button>
          </section>
        </form>
      )}

      {/* Password Change Tab */}
      {activeTab === "password" && (
        <form className="settings-form" onSubmit={handleChangePassword}>
          <section className="card">
            <h2 className="section-title">Change Password</h2>

            <label className="label">Current Password *</label>
            <input
              className="input"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword || ""}
              onChange={handlePasswordChange}
              placeholder="Enter your current password"
              required
            />

            <label className="label">New Password *</label>
            <input
              className="input"
              name="newPassword"
              type="password"
              value={passwordData.newPassword || ""}
              onChange={handlePasswordChange}
              placeholder="Enter new password (min. 6 characters)"
              required
            />

            <label className="label">Confirm New Password *</label>
            <input
              className="input"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword || ""}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              required
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Password"}
            </button>
          </section>
        </form>
      )}
    </main>
  );
}
