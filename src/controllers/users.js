const UsersService = require('../services/users');
const { hashPassword } = require('../helpers/password');

const get = async (req, res) => {
  const { authenticatedUser } = req;
  const id = parseInt(req.params.id, 10);
  if (authenticatedUser.id !== id) {
    return res.status(403).send();
  }
  const user = await UsersService.findByEmail(authenticatedUser.email);
  if (!user) {
    return res.status(404).send();
  }
  const { dataValues: { password: _, ...filteredUser } } = user;
  return res.send(filteredUser);
};

const post = async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersService.findByEmail(email);
  if (user) {
    return res.status(409).send();
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
