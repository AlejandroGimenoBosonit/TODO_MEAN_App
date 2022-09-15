const { Router } = require('express');

const { getAllCards, addCard, updateCard, deleteCard } = require('../../controllers/dashboard/card.controller');

const router = Router();

// get cards from database
router.get('/', getAllCards);
// add card to database
router.post('/', addCard);
// update card information
router.put('/:id', updateCard);
// delete card from database
router.delete('/:id', deleteCard)

module.exports = router;