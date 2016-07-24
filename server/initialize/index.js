const tasks = requireDir(__dirname + '/tasks');

exports.start = co.wrap(function* (config) {
	try{
		for(let name in tasks)
			yield tasks[name](config)

	}catch(error){
		App.log(error);
	}
})