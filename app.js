const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const app = express();


//Pulls in all routes that are in the index.js file from the routes folder.
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));


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
