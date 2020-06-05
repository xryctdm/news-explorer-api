const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const errors = require('./middlewares/request-err');

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/news-explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());

app.use(router);

app.use(errorLogger);

app.use(errors);
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
