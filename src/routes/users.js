const express = require('express');
const UsersController = require('../controllers/users');
const validateSchema = require('../middlewares/validate-schema');
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
  validateSchema(userSchema),
  UsersController.post,
);

module.exports = router;
