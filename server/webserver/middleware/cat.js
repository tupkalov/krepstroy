const co = require('co');

module.exports = co.wrap(function *(req, res, next){
	let group, alias = req.params.alias;
	if(!alias || !(group = App.groupsMap[alias]))
		throw new AppError('NoGroupForAlias', {status : 404, info : {alias, req : req.params}});
	
	// category
	if(group.list && group.list.length){
		let data = yield {
			groups 			: App.mappers.getGroupsSidebar({activeId : group._id}),
			tilesCategory 	: App.mappers.getTileCategory(group._id),
			breadcrumbs 	: App.mappers.getBreadcrumbs(group._id)
		}

		res.render('category', data);

	}
	// subcat
	else {

		let data = yield {
			groups 		: App.mappers.getGroupsSidebar({activeId : group._id}),
			breadcrumbs	: App.mappers.getBreadcrumbs(group._id),
			goods 		: App.mappers.fetchGoodsByGroupId(group._id)
		};



		res.render('subcat', data);

	}
});