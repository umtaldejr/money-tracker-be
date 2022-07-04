const { User } = require('../db/models');

const findByEmail = (email) => User.findOne({ where: { email } });

const create = ({ email, password }) => User.create({ email, password });

module.exports = {
  findByEmail,
  create,
};
