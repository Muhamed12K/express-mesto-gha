const router = require('express').Router();
const {
  receiveCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

// add cards preffix
router.post('/cards', createCard);

router.get('/cards', receiveCards);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

router.delete('/cards/:id', deleteCard);

module.exports = router;