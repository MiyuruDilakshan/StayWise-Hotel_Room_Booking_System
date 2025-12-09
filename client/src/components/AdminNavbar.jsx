import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/AdminNavbar.css';

const AdminNavbar = ({ isLoginPage = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminUser = JSON.parse(localStorage.getItem('adminUser'));

  // Determine if we're on login page
  const onLoginPage = isLoginPage || location.pathname === '/admin/login';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Login page navbar (simplified)
  if (onLoginPage) {
    return (
      <nav className="admin-navbar">
        <div className="admin-nav-container">
          <Link to="/" className="admin-nav-logo">
            <span className="logo-icon">■</span>
            <span className="logo-text">
              Stay<span className="logo-wise">Wise</span>
            </span>
          </Link>
          <button className="back-home-btn" onClick={handleBackToHome}>
            Back To Home
          </button>
        </div>
      </nav>
    );
  }

  // Dashboard navbar (full featured)
  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="admin-nav-left">
          <Link to="/admin/dashboard" className="admin-nav-logo">
            <span className="logo-icon">■</span>
            <span className="logo-text">
              Stay<span className="logo-wise">Wise</span>
            </span>
            <span className="admin-badge">Admin</span>
          </Link>

          <div className="admin-nav-links">
            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/admin/rooms" className="nav-link">Rooms</Link>
            <Link to="/admin/bookings" className="nav-link">Bookings</Link>
            <Link to="/admin/users" className="nav-link">Users</Link>
            <Link to="/admin/settings" className="nav-link">Settings</Link>
          </div>
        </div>

        <div className="admin-nav-right">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;