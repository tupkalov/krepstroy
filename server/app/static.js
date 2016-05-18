const fs = require('fs');

module.exports = (app, config) => {
	let staticDir = `${__dirname}/../${config.staticFolder}`;
	fs.accessSync(staticDir, fs.F_OK)
	app.use('/', express.static(staticDir));
}