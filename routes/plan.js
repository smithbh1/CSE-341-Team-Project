const express = require('express');
const router = express.Router();

const planController = require('../controllers/plan');

router.get('/', planController.getAll);

router.get('/:id', planController.getSingle);

router.post('/', planController.addOne);

router.put('/:id', planController.editOne);

router.delete('/:id', planController.deleteOne);

module.exports = router;