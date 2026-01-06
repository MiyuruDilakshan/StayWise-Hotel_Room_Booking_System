import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../styles/Navbar.css'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Function to load user from localStorage
  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    // Load user from localStorage on mount
    loadUserFromStorage()

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      loadUserFromStorage()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Load user whenever location changes (e.g., after redirect from login)
  useEffect(() => {
    loadUserFromStorage()
  }, [location.pathname])

  const handleLogout = () => {
    Swal.fire({
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      setMobileMenuOpen(false)
      navigate('/')
    })
  }

  const handleNavClick = (path) => {
    navigate(path)
    setMobileMenuOpen(false)
  }

  const isLoginPage = location.pathname === '/login'
  const isSignupPage = location.pathname === '/signup'

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
          </div>

          <div className="navbar-actions">
            {user ? (
              <div className="user-section-simple">
                <Link to="/mybookings" className="nav-btn-bookings" onClick={() => setMobileMenuOpen(false)}>
                  My Bookings
                </Link>
                <Link to="/profile" className="user-avatar-link" onClick={() => setMobileMenuOpen(false)}>
                  <div className="user-avatar-simple">
                    {user.name && user.name.charAt(0).toUpperCase()}
                  </div>
                </Link>
                <button onClick={handleLogout} className="btn-logout-simple">Logout</button>
              </div>
            ) : (
              <>
                {!isLoginPage && !isSignupPage && (
                  <button onClick={() => handleNavClick('/login')} className="btn-book-now">Book Now</button>
                )}
                
                {isLoginPage && (
                  <button onClick={() => handleNavClick('/signup')} className="btn-create-account">
                    Create an Account
                  </button>
                )}
                
                {isSignupPage ? (
                  <button onClick={() => handleNavClick('/login')} className="btn-sign-in">Sign In</button>
                ) : !isLoginPage && (
                  <button onClick={() => handleNavClick('/login')} className="btn-sign-in">Sign In</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}