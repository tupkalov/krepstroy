const co = require('co');

module.exports = function *(req, res, next){
	
	let data = yield {
		groups 		: App.mappers.getFirstLevelGroups(),
		newsData	: App.mappers.getFirstPageNews()
	};

	res.render('index', data);
};