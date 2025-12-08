import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar() {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setMobileMenuOpen(false)
    navigate('/')
  }

  const handleNavClick = (path) => {
    navigate(path)
    setMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
          <span className="logo-icon">🏨</span>
          <span className="logo-text">
            <span className="logo-stay">Stay</span>
            <span className="logo-wise">Wise</span>
          </span>
        </Link>

        <button 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-right ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="navbar-menu">
            <Link to="/" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/rooms" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Rooms</Link>
            <Link to="/about" className="nav-item" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            {user && (
              <>
                <Link to="/bookings" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Bookings</Link>
                <Link to="/profile" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              </>
            )}
          </div>

          <div className="navbar-actions">
            {user ? (
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            ) : (
              <>
                <button onClick={() => handleNavClick('/login')} className="btn-book-now">Book Now</button>
                <button onClick={() => handleNavClick('/login')} className="btn-sign-in">Sign In</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}