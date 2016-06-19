const express = require('express');
module.exports = function(config){
	let app = new express();

	app.set('view engine', 'js');
	app.set('views', config.viewsDir);

	require('../../middleware')(app);

	app.listen(config.port, () => 
		console.log(`Server started on ${config.port}`)
	)
}