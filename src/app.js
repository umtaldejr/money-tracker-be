require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const handleError = require('./middlewares/handle-error');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(handleError);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
