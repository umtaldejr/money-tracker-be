const createError = require('http-errors');
const UsersService = require('../services/users');
const { comparePasswords } = require('../helpers/password');
const { signToken } = require('../helpers/token');

const post = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UsersService.findByEmail(email);
  const match = comparePasswords(password, user.password);
  if (!match) {
    return next(createError(404, 'Invalid credentials'));
  }
  const token = signToken({ id: user.id, email: user.email });
  return res.send({ token });
};

module.exports = { post };
