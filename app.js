/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routeLogin = require('./routes/login');
const routeUsers = require('./routes/users');
const routeArticles = require('./routes/articles');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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

app.use(routeLogin);
app.use(routeUsers);
app.use(routeArticles);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
