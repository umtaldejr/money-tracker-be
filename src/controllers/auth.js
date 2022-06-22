const UsersService = require('../services/users');
const { comparePasswords } = require('../helpers/password');
const { signToken } = require('../helpers/token');

const post = async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersService.findByEmail(email);
  const match = comparePasswords(password, user.password);
  if (!match) {
    return res.status(403).send();
  }
  const token = signToken({ id: user.id, email: user.email });
  return res.send({ token });
};

module.exports = { post };
