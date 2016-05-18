let map = {
	'/' : require('./root')
};

module.exports = app => {

	let handler;
	for(let url in map){
		handler = map[url];

		if(typeof handler === 'function'){
			app.get(url, handler);
		}else{
			app.use(url, handler);
		}
	}

}

