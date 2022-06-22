const UsersService = require('../services/users');
const { hashPassword } = require('../helpers/password');

const post = async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersService.findByEmail(email);
  if (user) {
    return res.status(409).send();
  }
  const hash = hashPassword(password);
  const newUser = await UsersService.create({ email, password: hash });
  return res.send(newUser);
};

module.exports = { post };
