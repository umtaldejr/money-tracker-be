const express = require('express');
const UsersController = require('../controllers/users');
const validateBody = require('../middlewares/validate-body');
const authenticate = require('../middlewares/authenticate');
const { userSchema } = require('../validations/user');

const router = express.Router();

router.get(
  '/:id',
  authenticate,
  UsersController.get,
);

router.post(
  '/',
  validateBody(userSchema),
  UsersController.post,
);

module.exports = router;
