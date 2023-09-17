const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const cardSchema= new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator(name) {
          return name.length >= 2 && name.length <= 30
        },
        message: 'Имя карточки должно быть длиной от 2 до 30 символов',
      },
    },

    link: {
      type: String,
      required: [true, 'Link is required']
    },

    owner: {
      type: ObjectId,
      ref: 'user',
      required: [true, 'Owner is required']
    },

    likes: [{
      type: ObjectId,
      ref: 'user',
      default: [],
    }],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model('card', cardSchema);