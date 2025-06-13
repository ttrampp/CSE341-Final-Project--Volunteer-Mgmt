require('dotenv').config(); // Load .env variables

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Volunteer Management API',
        description: 'API documentation for the project',
    },
    host: process.env.SWAGGER_HOST || 'cse341-final-project-volunteer-mgmt-p4er.onrender.com',
    schemes: [process.env.NODE_ENV === 'production' ? 'https' : 'http'],

  securityDefinitions: {
    GitHubAuth: {
      type: 'oauth2',
      flow: 'accessCode',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      scopes: {
        'user:email': 'Grants read access to a user email addresses.'
      }
    }
  }

};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
