const express = require('express');
const validateSchema = require('../middlewares/validate-schema');
const { User } = require('../models/index');
const { userSchema } = require('../validators/user');

const router = express.Router();

router.post('/', validateSchema(userSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  res.send(user);
});

module.exports = router;
