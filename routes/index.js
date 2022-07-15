const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/goal', require('./goal'));
router.use('/plan', require('./plan'));
router.use('/workout', require('./workout'));
router.use('/diet', require('./diet'));

module.exports = router;