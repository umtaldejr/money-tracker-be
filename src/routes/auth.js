const express = require('express');
const AuthController = require('../controllers/auth');
const validateSchema = require('../middlewares/validate-schema');
const { authSchema } = require('../validations/auth');

const router = express.Router();

router.post(
  '/',
  validateSchema(authSchema),
  AuthController.post,
);

module.exports = router;
