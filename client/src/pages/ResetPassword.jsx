import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { resetPassword } from '../services/authService'
import '../styles/ResetPassword.css'

export default function ResetPassword() {
  const { token } = useParams()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
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

    // Validation
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      await resetPassword(token, formData.password, formData.confirmPassword)
      setSuccess(true)
    } catch (err) {
      console.error('Reset password error:', err)
      setError(err.message || 'An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <div className="reset-password-form-container">
            <div className="reset-password-form-wrapper">
              <div className="error-message">
                <h2>Invalid Reset Link</h2>
                <p>The password reset link is invalid or has expired.</p>
                <Link to="/login" className="btn-back-to-login">Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        {/* Left Side - Brand */}
        <div className="reset-password-brand">
          <div className="brand-content">
            <h1 className="brand-logo">
              <span className="brand-stay">Stay</span>
              <span className="brand-wise">Wise</span>
            </h1>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="reset-password-form-container">
          <div className="reset-password-form-wrapper">
            {!success ? (
              <>
                <h2 className="reset-password-title">Reset Your Password</h2>
                <p className="reset-password-subtitle">
                  Enter your new password below.
                </p>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit} className="reset-password-form">
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your new password"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your new password"
                      className="form-input"
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-reset"
                    disabled={loading}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>
              </>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Password Reset Successful!</h2>
                <p>Your password has been successfully reset.</p>
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-back-to-login"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
