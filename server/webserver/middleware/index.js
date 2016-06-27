let map = {
	'get /' 			: require('./root'),
	'get /cat/:alias' 	: require('./cat'),
	'use /basket' 		: require('./basket'),
	'use /order' 		: require('./order'),
	'get /news'			: require('./news'),
	'use /contacts'		: require('./contacts')
};

const co = require('co');

module.exports = app => {

	app.use((req, res, next) => {
			res.render = require('./renderMethod')(req, res);
			next();
	});

	for(let key in map){
		let [method, url] = key.split(' ');
		let handler = map[key];

		if(handler.constructor.name === 'GeneratorFunction'){
			app[method](url, (req, res, next) => {
				co(handler, req, res, next).catch(next)				
			})
		}else{

			app[method](url, handler);

		}
	}


	// ERROR HANDLING
	app.use((err,req,res,next) => {
		App.log(err);
		
		let status = err.status || 500;
		res.status(status);
		res.render('errorPage', {status});
	})

}