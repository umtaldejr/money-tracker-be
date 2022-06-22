const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSchema = require('../middlewares/validate-schema');
const { User } = require('../models/index');
const { authSchema } = require('../validators/auth');

const router = express.Router();

router.post('/', validateSchema(authSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.status(403).send();
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
  return res.send({ token });
});

module.exports = router;
