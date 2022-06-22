
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env'});


//Pulls in the connection protected string from the .env file
module.exports = {
  url: process.env.MONGODB_URI,
};

