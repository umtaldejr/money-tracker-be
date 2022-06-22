const express = require('express');
const UsersController = require('../controllers/users');
const validateSchema = require('../middlewares/validate-schema');
const { userSchema } = require('../validations/user');

const router = express.Router();

router.post(
  '/',
  validateSchema(userSchema),
  UsersController.post,
);

module.exports = router;
