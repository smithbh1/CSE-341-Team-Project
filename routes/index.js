const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/goal', require('./goal'));
router.use('/plan', require('./plan'));
router.use('/workout', require('./workout'));
router.use('/diet', require('./diet'));
router.use('/login', require('./auth'));

module.exports = router;