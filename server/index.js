require('./classes');

global.__appdir = __dirname;
global.co = require('co');
global.requireDir = require('require-dir');


global.App = {
	server : require('./app'),
	config : require('./config/config.json'),
	mappers : requireDir('./mappers'),


	log : message => {
		if(message instanceof AppError){
			console.log(message.toString())

			if(message instanceof FatalError){
				process.exit()
			}
		}else
			console.log(message);
	}
}
App.mail = require('./mail');

App.server.start(App.config);