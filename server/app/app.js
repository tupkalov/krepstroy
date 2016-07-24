const express = require('express');

const webserver 	= require(__appdir + '/webserver');
const database 		= require(__appdir + '/database');
const initialize 	= require(__appdir + '/initialize');

exports.start = config => {
	if(!config) throw new AppError('noConfig');

	Promise.all([
		webserver.start(config),
		database.start(config)
	])
		.then(

			res => {
				process.emit('load');

				initialize.start(config);
				
				process.on('recache', () => 
					initialize.start(config))
			},


			error => {
				App.log(error);
				process.exit();
			}
			
		)
}	