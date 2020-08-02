const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { AuthorizationError } = require('../errors/index');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
