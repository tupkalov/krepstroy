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
			list : start(g.list, options) || []
		};

		if(activeId && group._id == activeId)
			group.active = true;

		else if(group.list.some(
			group => group._id === activeId
		)){
			group.opened = true
		}

		return group;
	})

}