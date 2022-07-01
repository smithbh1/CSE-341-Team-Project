const swaggerAutogen = require('swagger-autogen')();


// // Local test environment
const doc = {
  info: {
    title: 'Health App API',
    description: 'Create a workout health plan and track your progress with this health application'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

// Heroku test environment

// const doc = {
//     info: {
//       title: 'Health App API',
//       description: 'Create a workout health plan and track your progress with this health application'
//     },
//     host: 'health-tracking-app.herokuapp.com',
//     schemes: ['https']
//   };

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });