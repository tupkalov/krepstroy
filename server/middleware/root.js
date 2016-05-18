const co = require('co');
module.exports = co.wrap(function *(req, res, next){

	let data = yield {
		groups 	: require('../services/getGroups')(),
		text 	: require('../services/getText')()
	};

	res.render('root', data);
	
});