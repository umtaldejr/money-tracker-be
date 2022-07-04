const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePasswords = (password, userPassword) => bcrypt.compareSync(password, userPassword);

module.exports = {
  hashPassword,
  comparePasswords,
};
