const User = require('../models/user');
const {
  ERROR_INACCURATE_DATA,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../errors/errors');

function createUser(req, res) {
  const {
    name, about, avatar,
  } = req.body;

  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then(user => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch((err) => (
      err.name === 'ValidationError'
        ? res.status(ERROR_INACCURATE_DATA).send({ message: 'Переданы некорректные данные при создании пользователя' })
        : res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    ));
}

function getUsersInfo(req, res) {
  User
    .find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' }));
}

function getUserInfoId(req, res) {
  const { id } = req.params;

  User
    .findById(id)
    .then((user) => {
      if (user) return res.send({ user });

      return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
    })
    .catch((err) => (
      err.name === 'CastError'
        ? res.status(ERROR_INACCURATE_DATA).send({ message: 'Передан некорректный id' })
        : res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    ));
}

function updateUser(req, res)
{
  const {name, about} = req.body;

  User.findById(req.user._id)
    .then((user) => {
      user.name = name;
      user.about = about;
      error = user.validateSync();

      if (!error) {
        return res.send({ user });
      }

      res.status(ERROR_INACCURATE_DATA).send({ message: 'Переданы некорректные данные при обновлении пользователя' })
    })
    .catch((err) => (
      err.name === 'ValidationError'
        ? res.status(ERROR_INACCURATE_DATA).send({ message: 'Переданы некорректные данные при обновлении пользователя' })
        : res.status(ERROR_INTERNAL_SERVER).send({ message: err })
    ));


}

function updateUserAvatar(req, res)
{
  const {avatar} = req.body;

  User.findById(req.user._id)
    .then((user) => {
      user.avatar = avatar;
      error = user.validateSync();

      if (!error) {
        return res.send({ user });
      }

      res.status(ERROR_INACCURATE_DATA).send({ message: 'Переданы некорректные данные при обновлении аватара' })
    })
    .catch((err) => (
      err.name === 'ValidationError'
        ? res.status(ERROR_INACCURATE_DATA).send({ message: 'Переданы некорректные данные при обновлении аватара' })
        : res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    ));
}

module.exports = {
  createUser,
  getUsersInfo,
  getUserInfoId,
  updateUserAvatar,
  updateUser
};