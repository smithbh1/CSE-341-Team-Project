const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars')
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv')


dotenv.config({ path: './config/config.env' })

const port = process.env.PORT || 8080;
const app = express();

  
// Handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

// static CSS file
app.use(express.static(path.join(__dirname, 'public')));

//Connects to the database using the models db connection schema.
const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

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


  app.use(auth(config));

  // Middleware to make the `user` object available for all views
  app.use(function (req, res, next) {
    res.locals.user = req.oidc.user;
    next();
  });
  
//Pulls in all routes that are in the index.js file from the routes folder.
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));
