let connect = require('connect'),
	serveStatic = require('serve-static');

    console.log('Server listening on http://localhost:9000');
    connect()
        .use(serveStatic(__driname))
        .listen('9000');