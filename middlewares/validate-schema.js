const validateSchema = (schema) => (req, res, next) => {
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation);
  }
  return next();
};

module.exports = validateSchema;
