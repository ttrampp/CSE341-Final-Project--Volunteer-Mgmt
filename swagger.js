require('dotenv').config(); // Load .env variables

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Volunteer Management API',
        description: 'API documentation for the project',
    },
    host: 'cse341-final-project-volunteer-mgmt.onrender.com/', 
    schemes: ['https'], 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);