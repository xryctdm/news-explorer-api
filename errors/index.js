const BadRequestError = require('./bad-request-err');
const NotFoundError = require('./not-found-err');
const ForbiddenError = require('./forbidden-err');
const AuthorizationError = require('./authorization-err');

module.exports = {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  AuthorizationError,
};
