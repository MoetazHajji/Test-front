const path = require('path')

module.exports = {
    openai: '3.0.0',
    info: {
        // API informations (required)
        title: 'Node-Typescript API',
        version: '1.0.0',
        description: 'A Simple API'
    },
    servers: [
        { url: 'http://localhost:3000' }
    ],
    apis: [path.join(__dirname, 'api/src/routes/*.ts')]
};