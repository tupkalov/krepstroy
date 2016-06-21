const co = require('co');

module.exports = co.wrap(function *(req, res, next){
	let group, alias = req.params.alias;

	if(!alias || !(group = App.groupsMap[alias]))
		throw new AppError('NoGroupForAlias', {status : 404, info : {alias, req : req.params}});
	
	// category
	if(group.list && group.list.length){
		let data = yield {
			groups 			: App.mappers.getGroupsSidebar({activeId : group._id}),
			tileCategory 	: App.mappers.getTileCategory(group._id),
			breadcrumbs 	: App.mappers.getBreadcrumbs(group._id)
		}
		res.render('category');

	}
	// subcat
	else {

		let data = yield {
			groups 		: App.mappers.getFirstLevelGroups(),
			newsData	: App.mappers.getFirstPageNews()
		};

		res.render('index', data);

	}
});