const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type:String,
      required: true,
      minLength: 2,
      maxLength: 30,
      validate: {
        validator: ({ length }) =>length >= 2 && length <= 30,
        message: 'Имя пользователя должно содержать от 2 до 30 символов',
      },
    },

    about: {
      type:String,
      required: true,
      minLength: 2,
      maxLength: 30,
      validate: {
        validator: ({ length }) =>length >= 2 && length <= 30,
        message: 'Информация о пользователе должна содержать от 2 до 30 символов',
      },
    },

    avatar: {
      type: String,
      required: true,
      // default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        message: 'Требуется ввести URL',
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);