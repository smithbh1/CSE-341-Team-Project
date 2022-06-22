const dbConfig = require('../config/connect');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//Pulls in the connection string needed for DB connection and the mongoose PUT POST templates for all database inputs. 
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require('./user')(mongoose);
db.goals = require('./goal')(mongoose);
db.plans = require('./plan')(mongoose);
db.workouts = require('./workout')(mongoose);
db.diets = require('./diet')(mongoose);


module.exports = db;