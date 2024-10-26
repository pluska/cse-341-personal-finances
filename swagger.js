const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE-341 Personal finances',
        description: 'Final project for CSE-341.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const output = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(output, endpointsFiles, doc)