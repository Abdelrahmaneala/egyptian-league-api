// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { fail } = require('../utils/jsend');

module.exports = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json(fail({}, 'Unauthorized: No token provided'));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json(fail({}, 'Unauthorized: user not found'));

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json(fail({}, 'Unauthorized: Invalid or expired token'));
  }
};
