module.exports = function(){
	let app = new express();

	require('./static')(app, config);

	app.set('view engine', 'pug');
	app.set('views', '../views');

	require('../middleware')(app);

	app.listen(config.port, () => 
		console.log(`Server started on ${config.port}`)
	)
}