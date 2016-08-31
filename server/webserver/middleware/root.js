const co = require('co');

module.exports = function *(req, res, next){
	
	let data = yield {
		groups 		: App.mappers.getFirstLevelGroups(),
		newsData	: App.mappers.getFirstPageNews(),
		mainText	: App.glo.mainText_big
	};

	res.render('index', data);
};