import { verifyToken } from '../services/auth.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token found',
      });
    }

    const decoded = verifyToken(token);
    // Map 'id' from token to '_id' for consistency with MongoDB
    req.user = {
      _id: decoded.id,
      id: decoded.id,
      role: decoded.role
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Authentication failed',
    });
  }
};

export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No admin token found',
      });
    }

    const decoded = verifyToken(token);

    // Check if user has admin role
    if (!['admin', 'super-admin', 'manager', 'staff'].includes(decoded.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required',
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Authentication failed',
    });
  }
};
