import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. Verify Token & Extract User
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB aur password field ko exclude kar do
    req.user = await User.findById(decoded.id).select('-password');
    
    // Check if user or their restaurant is suspended
    if (!req.user.isActive) {
       return res.status(403).json({ success: false, message: 'Account is suspended' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

// 2. Role-Based Access Control (RBAC)
// Example usage: router.post('/menu', protect, restrictTo('RESTAURANT_ADMIN', 'MANAGER'), createMenu)
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'You do not have permission to perform this action' 
      });
    }
    next();
  };
};