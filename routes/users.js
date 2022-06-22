const express = require('express');
const bcrypt = require('bcryptjs');
const validateSchema = require('../middlewares/validate-schema');
const { User } = require('../models/index');
const { userSchema } = require('../validators/user');

const router = express.Router();

router.post('/', validateSchema(userSchema), async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = await User.create({ email, password: hash });
  res.send(user);
});

module.exports = router;
