const router = require('express').Router();
  const {
    createUser,
    getUsersInfo,
    getUserInfoId,
    updateUserAvatar,
    updateUser
  } = require('../controllers/users');

  // add patch
  router.post('/users', createUser);

  router.get('/users', getUsersInfo);
  router.get('/users/:id', getUserInfoId);

  router.patch('/users/me', updateUser)
  router.patch('/users/me/avatar', updateUserAvatar)

module.exports = router;