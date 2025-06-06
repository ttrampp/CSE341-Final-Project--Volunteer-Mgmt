require('dotenv').config(); // Load .env variables

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Volunteer Management API',
        description: 'API documentation for the project',
    },
    host: `localhost:${process.env.PORT || 8080}`,
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);