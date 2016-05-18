require('./classes');

const server = require('./app');
const config = require('./config/config.json');

server.start(config);