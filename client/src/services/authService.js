import api from '../api/axios';

// User authentication
export const userLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const data = response.data;
    const user = data.user;
    
    // Check if the logged in user is actually an admin
    // Check for 'admin', 'super-admin', 'manager'
    const isAdmin = user && (user.role === 'admin' || user.role === 'super-admin' || user.role === 'manager');

    if (isAdmin) {
      // Store as admin, NOT as user
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(user));
      // Ensure no user session exists
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } else if (data.token) {
      // Normal user login
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(user));
      // Ensure no admin session exists
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
    return data;
  } catch (error) {
    const errorData = error.response?.data;
    if (errorData?.message) {
      throw new Error(errorData.message);
    }
    throw new Error('Login failed');
  }
};

export const userSignup = async (name, email, password) => {
  try {
    const response = await api.post('/auth/signup', { name, email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Signup failed' };
  }
};

// Admin authentication
export const adminLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/admin-login', { email, password });
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
    }
    return response.data;
  } catch (error) {
    const errorData = error.response?.data;
    if (errorData?.message) {
      throw new Error(errorData.message);
    }
    throw new Error('Admin login failed');
  }
};

// Verify token
export const verifyToken = async () => {
  try {
    const response = await api.post('/auth/verify');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Token verification failed' };
  }
};

// Logout
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    localStorage.removeItem('adminUser');
  }
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Get current admin
export const getCurrentAdmin = () => {
  const admin = localStorage.getItem('adminUser');
  return admin ? JSON.parse(admin) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Check if admin is authenticated
export const isAdminAuthenticated = () => {
  return !!localStorage.getItem('adminToken');
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    const errorData = error.response?.data;
    if (errorData?.message) {
      throw new Error(errorData.message);
    }
    throw new Error('Failed to send password reset email');
  }
};

// Reset password
export const resetPassword = async (token, password, confirmPassword) => {
  try {
    const response = await api.post(`/auth/reset-password/${token}`, { password, confirmPassword });
    return response.data;
  } catch (error) {
    const errorData = error.response?.data;
    if (errorData?.message) {
      throw new Error(errorData.message);
    }
    throw new Error('Failed to reset password');
  }
};
