const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequestError, AuthorizationError } = require('../errors/index');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch(() => next(new BadRequestError('Данные введены непраильно')));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secretKey', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(() => next(new AuthorizationError('Неправильные почта или пароль')));
};

module.exports = { getUser, createUser, login };
