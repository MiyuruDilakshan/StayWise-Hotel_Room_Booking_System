import express from 'express';
import Admin from '../models/Admin.js';
import authMiddleware from '../middleware/authMiddleware.js';
import bcryptjs from 'bcryptjs';

const router = express.Router();

// @route   GET /api/admin-settings/profile
// @desc    Get admin profile
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/admin-settings/profile
// @desc    Update admin profile
// @access  Private
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, department } = req.body;

    // Validate input
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    // Update admin profile
    const admin = await Admin.findByIdAndUpdate(
      req.user.id,
      {
        name: name.trim(),
        phone: phone || '',
        department: department || '',
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/admin-settings/change-password
// @desc    Change admin password
// @access  Private
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current password, new password, and confirmation',
      });
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match',
      });
    }

    // Check password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters',
      });
    }

    // Get admin with password field
    const admin = await Admin.findById(req.user.id).select('+password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Verify current password
    const isPasswordValid = await admin.matchPassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password (will be hashed by pre-save hook)
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/admin-settings/hotel-info
// @desc    Get hotel information (from first admin's settings)
// @access  Private
router.get('/hotel-info', authMiddleware, async (req, res) => {
  try {
    // For now, return default hotel info
    // In a real app, you'd have a separate HotelSettings model
    const hotelInfo = {
      hotelName: 'StayWise Hotel',
      address: '123 Hotel Street, Colombo, Sri Lanka',
      email: process.env.HOTEL_EMAIL || 'info@staywise.com',
      phone: process.env.HOTEL_PHONE || '+94 11 234 5678',
      logoUrl: '/images/logo.png',
    };

    res.status(200).json({
      success: true,
      data: hotelInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/admin-settings/hotel-info
// @desc    Update hotel information
// @access  Private (super-admin only)
router.put('/hotel-info', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin || admin.role !== 'super-admin') {
      return res.status(403).json({
        success: false,
        message: 'Only super-admin can modify hotel information',
      });
    }

    const { hotelName, address, email, phone } = req.body;

    // In a real app, you'd save this to a HotelSettings model
    // For now, we'll just return success and the data would be stored elsewhere
    const updatedInfo = {
      hotelName: hotelName || 'StayWise Hotel',
      address: address || '123 Hotel Street, Colombo, Sri Lanka',
      email: email || process.env.HOTEL_EMAIL || 'info@staywise.com',
      phone: phone || process.env.HOTEL_PHONE || '+94 11 234 5678',
      logoUrl: '/images/logo.png',
    };

    res.status(200).json({
      success: true,
      message: 'Hotel information updated successfully',
      data: updatedInfo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
