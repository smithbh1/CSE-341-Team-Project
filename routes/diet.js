const express = require('express');
const router = express.Router();

const dietController = require('../controllers/diet');

router.get('/', dietController.getAll);

router.get('/:id', dietController.getSingle);

router.post('/', dietController.addOne);

router.put('/:id', dietController.editOne);

router.delete('/:id', dietController.deleteOne);

module.exports = router;