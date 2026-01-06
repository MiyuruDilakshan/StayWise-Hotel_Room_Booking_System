import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../services/authService'
import Swal from 'sweetalert2'
import '../styles/login.css'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      // API call to login endpoint
      const response = await userLogin(formData.email, formData.password)
      
      await Swal.fire({
        title: 'Success!',
        text: 'You have successfully logged in.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })

      // Check if user is admin
      if (response.user && (response.user.role === 'admin' || response.user.role === 'super-admin' || response.user.role === 'manager')) {
        navigate('/admin/dashboard');
        return;
      }

      // Check if there's a pending booking that needs to redirect back to room
      const pendingBooking = sessionStorage.getItem('pendingBooking');
      if (pendingBooking) {
        const booking = JSON.parse(pendingBooking);
        sessionStorage.removeItem('pendingBooking');
        // Redirect back to the room details page with the booking info still in session
        navigate(`/rooms/${booking.roomId}`);
      } else {
        // Normal redirect to home page
        navigate('/')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Brand */}
        <div className="login-brand">
          <div className="brand-content">
            <h1 className="brand-logo">
              <span className="brand-stay">Stay</span>
              <span className="brand-wise">Wise</span>
            </h1>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h2 className="login-title">Login account</h2>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="form-input"
                  required
                />
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="terms-text">
                By signing in you agree to{' '}
                <Link to="/terms" className="terms-link">
                  terms and conditions
                </Link>{' '}
                at StayWise.
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="signup-links">
                <Link to="/signup" className="signup-link">
                  Haven't any account? Create account
                </Link>
                <Link to="/guest" className="guest-link">
                  Login as a guest
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}