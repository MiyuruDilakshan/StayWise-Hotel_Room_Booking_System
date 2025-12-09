import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import '../../styles/AdminForgotPassword.css';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // For now, just simulate success
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  const handleBackToLogin = () => {
    navigate('/admin/login');
  };

  return (
    <div className="admin-forgot-password-container">
      <AdminNavbar isLoginPage={true} />
      <div className="forgot-password-content-wrapper">
        <div className="forgot-password-form-wrapper">
          {!submitted ? (
            <>
              <h1 className="forgot-password-title">Forgot Password?</h1>
              <p className="forgot-password-subtitle">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSubmit} className="forgot-password-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <div className="back-to-login">
                <button onClick={handleBackToLogin} className="back-link">
                  Back to Login
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="success-icon">✓</div>
              <h1 className="success-title">Check Your Email</h1>
              <p className="success-message">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your email and click the link to reset your password.
              </p>
              <p className="success-note">
                If you don't see the email in your inbox, please check your spam folder.
              </p>

              <button onClick={handleBackToLogin} className="back-to-login-btn">
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
