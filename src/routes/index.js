const express = require('express');
const authRouter = require('./auth');
const usersRouter = require('./users');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
