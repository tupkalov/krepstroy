module.exports = groupId => {
	let breadcrumbs = [];
	while(group = App.groupsMap[groupId]){
		if(breadcrumbs.includes(group)) break;

		breadcrumbs.unshift(group);
		groupId = group.parentId;
	}
	
	return breadcrumbs;
}