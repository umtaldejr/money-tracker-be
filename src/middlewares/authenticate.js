const createError = require('http-errors');
const { verifyToken } = require('../helpers/token');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(createError(401, 'Unauthenticated user'));
  }
  try {
    const user = verifyToken(token);
    req.authenticatedUser = user;
    return next();
  } catch (error) {
    return next(createError(401, 'Invalid JWT token'));
  }
};

module.exports = authenticate;
