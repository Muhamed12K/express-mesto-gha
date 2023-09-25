const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

  const {
    createUser,
    getUsersInfo,
    getUserInfoId,
    updateUserAvatar,
    updateUser,
    getCurrentUserInfo
  } = require('../controllers/users');

  // add patch
  router.post('/users', createUser);

  router.get('/', getUsersInfo);
  router.get('/me', getCurrentUserInfo);

  router.get('/:id', celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }), getUserInfoId);

  router.patch('/me', celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }), updateUser)

  router.patch('/me/avatar', celebrate({
    body: Joi.object().keys({
      avatar: Joi
        .string()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
    }),
  }), updateUserAvatar)

module.exports = router;