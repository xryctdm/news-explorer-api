const router = require('express').Router();
const { celebrate } = require('celebrate');
const { signupSchema, signinSchema } = require('../joi_schemas/joi-schemas');

const { createUser, login } = require('../controllers/users');

router.post('/signup', celebrate({ body: signupSchema }), createUser);
router.post('/signin', celebrate({ body: signinSchema }), login);

module.exports = router;
