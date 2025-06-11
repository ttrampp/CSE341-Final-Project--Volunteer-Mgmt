require('dotenv').config(); // Load .env variables

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Volunteer Management API',
        description: 'API documentation for the project',
    },
    host: process.env.SWAGGER_HOST || 'localhost:8080',
    schemes: [process.env.NODE_ENV === 'production' ? 'https' : 'http'],
    
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);