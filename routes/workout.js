const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workout');

router.get('/', workoutController.getAll);

router.get('/:id', workoutController.getSingle);

router.post('/', workoutController.addOne);

router.put('/:id', workoutController.editOne);

router.delete('/:id', workoutController.deleteOne);

module.exports = router;