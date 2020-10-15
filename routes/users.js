const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getAllUsers, getUser } = require('../controllers/users');

router.get('/me', getAllUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);

module.exports = router;
