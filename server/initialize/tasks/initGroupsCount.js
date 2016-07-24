function* iteration(groupsLevel){
	count = 0;
	for(let group of groupsLevel){
		if(group.count)
			count += group.count

		else{
			
			if(group.list){
				count += group.count = yield iteration(group.list)
			}else{
				var children = App.parentMap[group._id];
				if(!children)	
					count += group.count = yield App.mappers.fetchGoodsCountByGroupId(group._id)
			}
				
		}
	}

	return count;
}


module.exports = function* (){
	let count = yield iteration(App.groupsTree)
	console.log("Goods counted | count: " + count);
}