const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/Logger');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    logger.info('Token received:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.info('Decoded token:', decoded);

    const user = await User.findOne({ where: { id: decoded.id } });
    logger.info('User found:', user);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    logger.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Silakan login terlebih dahulu' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    logger.warn('Access denied for non-admin user');
    return res.status(403).json({ message: 'Akses ditolak' });
  }
  next();
};

module.exports = { auth, adminOnly }; 