/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
const Article = require('../models/article');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors/index');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(() => next(new BadRequestError('Данные введены непраильно')));
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Статья не найдена');
      } else if (article.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Вы не создавали эту статью');
      } else {
        article.remove();
        res.status(200).send({ message: 'Статья удалена' });
      }
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
