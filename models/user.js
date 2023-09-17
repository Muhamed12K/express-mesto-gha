const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type:String,
      required: true,
      // validate: {
      //   validator: function(v) {
      //     return /\d{3}-\d{3}-\d{4}/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid phone number!`
      // },
      //
      validate: {
        validator(name) {
          return name.length >= 2 && name.length <= 30
        },
        message: 'Имя пользователя должно содержать от 2 до 30 символов',
      },
    },

    about: {
      type:String,
      required: true,
      validate: {
        validator(about) {
          return about.length >= 2 && about.length <= 30
        },
        message: 'Информация о пользователе должна содержать от 2 до 30 символов',
      },
    },

    avatar: {
      type: String,
      required: [true, "User avatar required"]
      // default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
);

module.exports = mongoose.model('user', userSchema);