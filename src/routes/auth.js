const express = require('express');
const AuthController = require('../controllers/auth');
const validateBody = require('../middlewares/validate-body');
const { authSchema } = require('../validations/auth');

const router = express.Router();

router.post(
  '/',
  validateBody(authSchema),
  AuthController.post,
);

module.exports = router;
