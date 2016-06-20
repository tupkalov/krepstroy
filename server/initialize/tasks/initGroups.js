


module.exports = function* fetchGroup (){
		let groups = yield App.mappers.fetchGroups();
		let map 		= App.groupsMap = {},
			parentMap 	= App.parentMap = {},
			tree 		= App.groupsTree = [],
			list 		= App.groupsList = groups;
		
		for(let group of groups)
		{
			if(map[group._id])
				group = Object.assign(map[group._id], group);

			(parentMap[group.parentId] || (parentMap[group.parentId] = []))
				.push(group);

			if(group.parentId === null) 
				tree.push(group);

			map[group.alias] = map[group._id] = group;
			
			if(group.parentId){
				let parent = map[group.parentId]
				if(!parent)
					map[group.parentId] = parent = {}

				if(!parent.list)
					parent.list = [];
				parent.list.push(group)
			}
		}
		
}


function checkCircle(tree){

}