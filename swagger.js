require('dotenv').config(); // Load .env variables

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Volunteer Management API',
        description: 'API documentation for the project',
    },
    host: process.env.SWAGGER_HOST || 'localhost:8080',
    schemes: [process.env.NODE_ENV === 'production' ? 'https' : 'http'],

    tags: [
    {
      name: 'Users',
      description: 'User management routes'
    },
    {
      name: 'Events',
      description: 'Event scheduling and lookup'
    },
    {
      name: 'Volunteers',
      description: 'Volunteer registration and search'
    },
    {
      name: 'Feedback',
      description: 'Feedback collection and display'
    }
  ],
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
const endpointsFiles = [
  './routes/userRoutes.js',
  './routes/eventRoutes.js',
  './routes/volunteerRoutes.js',
  './routes/feedbackRoutes.js',
  './routes/authRoute.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);