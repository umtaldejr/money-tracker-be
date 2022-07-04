const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi
    .string()
    .required()
    .email(),
  password: Joi
    .string()
    .required()
    .min(6)
    .max(30),
});

module.exports = { userSchema };
