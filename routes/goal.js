const express = require('express');
const router = express.Router();

const goalController = require('../controllers/goal');

router.get('/', goalController.getAll);

router.get('/:id', goalController.getSingle);

router.post('/', goalController.addOne);

router.put('/:id', goalController.editOne);

router.delete('/:id', goalController.deleteOne);

module.exports = router;