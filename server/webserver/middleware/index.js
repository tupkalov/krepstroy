let map = {
	'get /' 			: require('./root'),
	'get /cat/:alias' 	: require('./cat'),
	'use /basket' 		: require('./basket'),
	'use /order' 		: require('./order'),
	'get /news'			: require('./news'),
	'use /contacts'		: require('./contacts'),
	'post /search'		: require('./search'),
	'get /good/:id'		: require('./good')
};

const co = require('co'),
	  bodyParser = require('body-parser');

module.exports = app => {



	app.use((req, res, next) => {
		res.render = require('./renderMethod')(req, res);
		res.sendJson = require('./sendJson');
		next();
	});

	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json());


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


}