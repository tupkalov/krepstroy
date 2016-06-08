const co = require('co');
module.exports = co.wrap(function *(req, res, next){

	let data = yield {
		groups 	: require('../mappers').getFirstLevelGroups(),
		firstPage : require('../mappers').getFirstPageData()
	};

	res.render('root', data);
	
});