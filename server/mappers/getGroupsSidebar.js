module.exports = options => {
	debugger;
	return start(App.groupsTree, options)
}

function start (arr, options) {

	/*	"_id"  : 2,
		    "name": "Дюбели для теплоизоляции",
		    "alias" : ""
		    "list": [***]
	*/
	if(!arr) return null;
	let activeId = options && options.activeId;
	return arr.map(g => {
		let group  = {
			_id : g._id,
			name : g.name,
			alias : g.alias,
			list : start(g.list) || []
		};

		if(activeId && group._id == activeId)
			group.active = true;

		return group;
	})

}