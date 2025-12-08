import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar() {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏨</span>
          <span className="logo-text">
            <span className="logo-stay">Stay</span>
            <span className="logo-wise">Wise</span>
          </span>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/rooms" className="nav-item">Rooms</Link>
          <Link to="/about" className="nav-item">About Us</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/bookings" className="nav-item">My Bookings</Link>
              <Link to="/profile" className="nav-item">Profile</Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="btn-book-now">Book Now</button>
              <button onClick={() => navigate('/login')} className="btn-sign-in">Sign In</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}