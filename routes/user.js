const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', userController.addOne);

router.put('/:id', userController.editOne);

router.delete('/:id', userController.deleteOne);

module.exports = router;