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

		app.use(session({
			secret : 'KrepSpbRu',
			resave : true,
			saveUninitialized : true
		}));
		
		require('./middleware')(app);

		// ADMIN
		require('./admin')(app);
		
		app.use((req, res, next) => {
			next(new AppError('PageUndefined', {status : 404}))
		});


		// ERROR HANDLING
		app.use((err,req,res,next) => {
			if(!(err instanceof AppError))
				App.log(err);
			
			let status = err.status || 500;
			res.status(status);
			res.render('errorPage', {status});
		})

		app.listen(config.port, () => {
			resolve()
			console.log(`Server started on ${config.port}`)
			process.emit('webserver');
		});

	});