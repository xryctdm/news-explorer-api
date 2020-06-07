const { Joi } = require('celebrate');

const signupSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  name: Joi.string().required().min(2).max(30),
});

const signinSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const createArticleSchema = Joi.object().keys({
  keyword: Joi.string().required().min(2),
  title: Joi.string().required().min(2).max(30),
  text: Joi.string().required().min(2),
  date: Joi.string().required().min(2),
  source: Joi.string().required().min(2).max(30),
  link: Joi.string().required().regex(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i),
  image: Joi.string().required().regex(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i),
});

const idSchema = Joi.object().keys({
  id: Joi.string().alphanum().length(24),
});

module.exports = {
  signupSchema,
  signinSchema,
  idSchema,
  createArticleSchema,
};
