const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { auth,  requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL_LOCAL,
    //push to heroku comment ou the line above and use the line below!!!
    // baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };


router.use(auth(config));

router.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()){
        res.redirect('/main')
    } else {
    res.render('login', {
        layout: 'login'
    })}
});

router.get('/main', requiresAuth(), (req, res) => {
   res.render('main', {
    layout: 'main',
    name: req.oidc.user.name
   })
});


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;