let map = {
	'/' : require('./root'),
	'/cat/:alias' : require('./cat'),
	'/basket' : require('./basket')
};

const co = require('co');

module.exports = app => {

	app.use((req, res, next) => {
		req.render = require('./renderMethod');
		console.log(req.path);
		next();
	});

	for(let url in map){
		let handler = map[url];

		if(typeof handler === 'function'){
			app.get(url, (req, res, next) => 
				co(handler, req, res, next).catch(next)				
			);
		}else{
			console.log(url)
			app.use(url, handler);
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



