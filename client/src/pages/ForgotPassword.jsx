import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword } from '../services/authService'
import '../styles/ForgotPassword.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resetLink, setResetLink] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      const response = await forgotPassword(email)
      setSuccess(true)
      setResetLink(response.resetLink)
    } catch (err) {
      console.error('Forgot password error:', err)
      setError(err.message || 'An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        {/* Left Side - Brand */}
        <div className="forgot-password-brand">
          <div className="brand-content">
            <h1 className="brand-logo">
              <span className="brand-stay">Stay</span>
              <span className="brand-wise">Wise</span>
            </h1>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="forgot-password-form-container">
          <div className="forgot-password-form-wrapper">
            {!success ? (
              <>
                <h2 className="forgot-password-title">Forgot Password?</h2>
                <p className="forgot-password-subtitle">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit} className="forgot-password-form">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="form-input"
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-send-link"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>

                <p className="back-to-login">
                  Remember your password? <Link to="/login">Back to Login</Link>
                </p>
              </>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Check Your Email</h2>
                <p>We've sent a password reset link to <strong>{email}</strong></p>
                <div className="reset-link-section">
                  <p className="reset-link-label">Reset Link (for testing):</p>
                  <div className="reset-link-box">
                    <a href={resetLink} target="_blank" rel="noopener noreferrer" className="reset-link">
                      {resetLink}
                    </a>
                  </div>
                </div>
                <p className="email-instruction">Check your email for the password reset link. The link will expire in 1 hour.</p>
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-back-to-login"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
