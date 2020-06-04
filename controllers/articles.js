/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
const Article = require('../models/article');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteArticle = (req, res) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        res.status(404).send({ message: 'Статья не найдена' });
      } else if (article.owner.toString() !== req.user._id.toString()) {
        res.status(403).send({ message: 'Вы не создавали эту статью' });
      } else {
        article.remove();
        res.status(200).send({ message: 'Статья удалена' });
      }
    })
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getArticles, createArticle, deleteArticle };
