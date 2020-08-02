module.exports = (err, req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { statusCode = 500, message } = err;

  res
    .status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
};
