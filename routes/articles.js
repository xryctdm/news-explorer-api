const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createArticleSchema, idSchema } = require('../joi_schemas/joi-schemas');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const auth = require('../middlewares/auth');

router.get('/articles', auth, getArticles);
router.post('/articles', auth, celebrate({ body: createArticleSchema }), createArticle);
router.delete('/articles/:articleId', auth, celebrate({ body: idSchema }), deleteArticle);

module.exports = router;
