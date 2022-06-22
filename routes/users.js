const express = require('express');
const { User } = require('../models/index');

const router = express.Router();

/* GET users listing. */
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  res.send(user);
});

module.exports = router;
