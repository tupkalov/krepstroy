const express = require('express');

exports.start = config => {
	if(!config) throw new AppError('noConfig');

	let app = new express();

	app.set('view engine', 'pug');
	app.set('views', '../views');

	require('../middleware')(app);

	app.listen(config.port, () => 
		console.log(`Server started on ${config.port}`)
	)
}	