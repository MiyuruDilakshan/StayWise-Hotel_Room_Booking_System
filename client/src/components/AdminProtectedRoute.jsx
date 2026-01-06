import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../services/authService';

const AdminProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        
        if (!adminToken) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Verify token is still valid
        const result = await verifyToken();
        
        if (result.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log('Token verification failed:', error.message);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show nothing while loading to prevent flash
  if (loading) {
    return <div style={{ display: 'none' }}></div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the component
  return element;
};

export default AdminProtectedRoute;
