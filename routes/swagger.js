const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { requiresAuth } = require('express-openid-connect');


router.get('/', (req, res, next) => {
    if (req.oidc.isAuthenticated()){
        res.redirect('/main')
    } else {
    res.render('login', {
        layout: 'login'
    })}
});

router.get('/main', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.render('main', {
            layout: 'main',
            name: req.oidc.user.name
           })
    } else {
        res.redirect('/')
    }
   
});


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;