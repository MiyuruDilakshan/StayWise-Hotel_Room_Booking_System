import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect on login/signup endpoints - let them handle their own errors
      const isAuthEndpoint = error.config?.url?.includes('/auth/login') || 
                             error.config?.url?.includes('/auth/admin-login') ||
                             error.config?.url?.includes('/auth/signup');
      
      if (!isAuthEndpoint) {
        // Token expired or invalid - redirect to login
        // Only redirect if we are not already on the login page
        if (!window.location.pathname.includes('/login')) {
          // Do NOT clear localStorage here immediately, as it might be a temporary glitch
          // or the component might handle it.
          // But if it's a 401 on a protected route, we probably should.
          
          // Let's be safer: only redirect if it's definitely an auth failure on a protected resource
          console.warn('401 Unauthorized received. Redirecting to login.');
          localStorage.removeItem('token');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('user');
          localStorage.removeItem('adminUser');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
