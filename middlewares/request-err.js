module.exports = (err, req, res, next) => {
  const { joi } = err;
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (joi) {
    const result = {
      statusCode: 400,
      error: {
        message: joi.message,
      },
    };
    return res.status(400).send(result);
  }
  next(err);
};
