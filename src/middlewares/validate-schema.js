const createError = require('http-errors');

const validateSchema = (schema) => (req, res, next) => {
  const validation = schema.validate(req.body);
  if (validation.error) {
    return next(createError(400, validation.error.details[0].message));
  }
  return next();
};

module.exports = validateSchema;
