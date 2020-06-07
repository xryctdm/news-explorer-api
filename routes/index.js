const router = require('express').Router();

const routeLogin = require('./login');
const routeUsers = require('./users');
const routeArticles = require('./articles');

router.use(routeLogin);
router.use(routeUsers);
router.use(routeArticles);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
