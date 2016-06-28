module.exports = function* (req, res, next) {
	let data = yield {
		groups 		: App.mappers.getGroupsSidebar(),
		newsData 	: App.mappers.fetchNews()
	};

	res.render('news', data);
}