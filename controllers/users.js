/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch(err => res.status(500).send({ message: 'произошла хз ошибка' }));
};

const createUser = (req, res) => {
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
    .catch((err) => res.status(400).send(err));
};

const login = (req, res) => {
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
    .catch((err) => {
      res.status(401).send({ message: 'Произошла ошибка' });
    });
};

module.exports = { getUser, createUser, login };
