// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
};

module.exports = handleError;
