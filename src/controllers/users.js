const createError = require('http-errors');
const UsersService = require('../services/users');
const { hashPassword } = require('../helpers/password');

const get = async (req, res, next) => {
  const { authenticatedUser } = req;
  const id = parseInt(req.params.id, 10);
  if (authenticatedUser.id !== id) {
    return next(createError(404, 'User not found'));
  }
  const user = await UsersService.findByEmail(authenticatedUser.email);
  if (!user) {
    return next(createError(404, 'User not found'));
  }
  const { dataValues: { password: _, ...filteredUser } } = user;
  return res.send(filteredUser);
};

const post = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UsersService.findByEmail(email);
  if (user) {
    return next(createError(409, 'Email is already taken'));
  }
  const hash = hashPassword(password);
  const newUser = await UsersService.create({ email, password: hash });
  const { dataValues: { password: _, ...filteredUser } } = newUser;
  return res.send(filteredUser);
};

module.exports = {
  get,
  post,
};
