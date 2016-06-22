const express = require('express'),
	  session = require('express-session');
	  
module.exports = config => 
	new Promise((resolve, reject) => {
		let app = new express();


		app.engine('js', function (filePath, options, callback) { // define the template engine
		  let data = require(filePath)(options);
		  callback(null, data);
		});

		app.set('view engine', 'js');
		app.set('views', __appdir + '/' + config.viewsDir);

		require('./middleware')(app);

		app.listen(config.port, () => {
			resolve()
			console.log(`Server started on ${config.port}`)
			process.emit('webserver');
		})
	});