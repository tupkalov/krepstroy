module.exports = 
	() => App.groupsTree.map(
		group => Object.assign({}, group)
	)