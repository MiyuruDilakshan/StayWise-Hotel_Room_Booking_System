import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ element }) => {
  // Check auth synchronously first
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const isAuthenticatedSync = !!(token && user);
  
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedSync);
  const [loading, setLoading] = useState(!isAuthenticatedSync); // Only load if not immediately authenticated

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const hasAuth = !!(token && user);
      setIsAuthenticated(hasAuth);
      setLoading(false);
    };

    // If sync check passed, we're done
    if (isAuthenticatedSync) {
      setLoading(false);
    } else {
      // Check async and listen for storage changes
      checkAuth();
    }
    
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [isAuthenticatedSync]);

  // While loading, show nothing (only if initially not authenticated)
  if (loading) {
    return <div style={{ display: 'none' }}></div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the component
  return element;
};

export default UserProtectedRoute;
