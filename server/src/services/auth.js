import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

// Generate JWT Token
export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '7d',
  });
};

// User Signup
export const signupUser = async (data) => {
  const { name, email, password, phone, address } = data;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Email already registered');
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
    role: 'customer',
  });

  // Generate token
  const token = generateToken(user._id, user.role);

  return {
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// User Login
export const loginUser = async (email, password) => {
  // Check if email and password are provided
  if (!email || !password) {
    throw new Error('Please provide email and password');
  }

  // First check if it's an admin trying to login
  const admin = await Admin.findOne({ email }).select('+password');
  if (admin) {
    const isPasswordValid = await admin.comparePassword(password);
    if (isPasswordValid) {
      if (!admin.isActive) {
        throw new Error('Admin account is inactive');
      }
      // Use the admin's actual role, or default to 'admin' if not set
      const role = admin.role || 'admin';
      const token = generateToken(admin._id, role);
      return {
        success: true,
        token,
        user: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: role,
        },
      };
    }
  }

  // Validate email format
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken(user._id, user.role);

  return {
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    },
  };
};

// Admin Login
export const loginAdmin = async (email, password) => {
  if (!email || !password) {
    throw new Error('Please provide email and password');
  }

  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    throw new Error('Invalid email or password');
  }

  if (!admin.isActive) {
    throw new Error('Admin account is inactive');
  }

  const isPasswordValid = await admin.comparePassword(password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Update last login
  admin.lastLogin = new Date();
  await admin.save();

  // Generate token
  const token = generateToken(admin._id, admin.role);

  return {
    success: true,
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
    },
  };
};

// Verify Token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Get User by ID
export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Get Admin by ID
export const getAdminById = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error('Admin not found');
  }
  return admin;
};
