const { verifyToken } = require('../helpers/token');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send();
  }
  const user = verifyToken(token);
  req.authenticatedUser = user;
  return next();
};

module.exports = authenticate;
