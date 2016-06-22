


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

		checkCircle(list);
		
}


function checkCircle(list){
	let target, chain = [], map = App.groupsMap;
	list = Array.from(list);
	
	// Вытаскиваем последний и идем по родителям
	while(target = list.pop()){
		let chain = [];

		while(target){
			chain.push(target);
			if(target.parentId){
				let parent = map[target.parentId];
				let index = chain.indexOf(parent);
				if(index !== -1){
					console.log('Зацикливание найдено!', chain.map(g => g.name));
					chain.forEach(removeGroup);
					chain = [];
					break;
				}else
					target = parent;

			}else{
				chain = [];
				break;
			}
		}
	}
}

function removeGroup(group){
	delete App.groupsMap[group.alias];
	delete App.groupsMap[group._id];

	// Удаляем из списка родителя
	let parentList = App.parentMap[group.parentId];
	if(parentList)
		_remove(group, parentList);

	// Удаляем из дерева
	if(group.parentId){
		let parent = App.groupsMap[group.parentId];
		if(parent && parent.list)
			_remove(group, parent.list);
	}else{
		_remove(App.groupsTree, group);
	}

	// Удаляем из листа
	_remove(group, App.groupsList);
}

function _remove(el, arr){
	let index = arr.indexOf(el);
	if(index !== -1)
		arr.splice(index, 1);
}