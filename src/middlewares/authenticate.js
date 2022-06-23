const createError = require('http-errors');
const { verifyToken } = require('../helpers/token');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(createError(400, 'Unauthenticated user'));
  }
  const user = verifyToken(token);
  req.authenticatedUser = user;
  return next();
};

module.exports = authenticate;
