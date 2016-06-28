module.exports = groupId => {
	var group = App.groupsMap[groupId];
	if(!group)
		throw new AppError('NoGroup');
	return group.list || null;
}