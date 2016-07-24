module.exports = groupId => {
	let breadcrumbs = [];
	while(group = App.groupsMap[groupId]){
		if(breadcrumbs.includes(group)) break;

		group = Object.assign({}, group);
		group.href = '/cat/' + group.alias;

		breadcrumbs.unshift(group);
		groupId = group.parentId;
	}
	
	return breadcrumbs;
}