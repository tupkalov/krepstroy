let connect = require('connect'),
	serveStatic = require('serve-static');
	
    console.log('Server listening on http://localhost:9000', __dirname);
    connect()
        .use(serveStatic(__dirname))
        .listen('9000');
