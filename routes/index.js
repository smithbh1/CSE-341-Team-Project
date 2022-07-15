const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/user', requiresAuth(), require('./user'));
router.use('/goal', requiresAuth(), require('./goal'));
router.use('/plan', requiresAuth(), require('./plan'));
router.use('/workout', requiresAuth(), require('./workout'));
router.use('/diet', requiresAuth(), require('./diet'));

module.exports = router;