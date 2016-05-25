const express = require('express');
const webserver = require('./webserver');
const database = require('./database');

exports.start = config => {
	if(!config) throw new AppError('noConfig');

	webserver.start(config);
	database.start(config);
}	