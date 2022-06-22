const express = require('express');
const bcrypt = require('bcryptjs');
const validateSchema = require('../middlewares/validate-schema');
const { User } = require('../models/index');
const { userSchema } = require('../validators/user');

const router = express.Router();

router.post('/', validateSchema(userSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).send();
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = await User.create({ email, password: hash });
  return res.send(newUser);
});

module.exports = router;
