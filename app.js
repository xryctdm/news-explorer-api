require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const errors = require('./middlewares/request-err');

const { mongoUrl, port } = require('./config');

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');

const app = express();

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(requestLogger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());

app.use(router);

app.use(errorLogger);

app.use(errors);
app.use(error);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
