const co = require('co');
module.exports = co.wrap(function *(req, res, next){

	console.log('root request');
	
	let data = yield {
		groups 	: require('../mappers/getGroups')(),
		text 	: require('../mappers/getText')()
	};

	res.render('root', data);
});