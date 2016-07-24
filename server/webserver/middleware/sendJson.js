module.exports = function sendJson(success, data){
	json = {
		type : success !== false ? 'ok' : 'error'
	};

	if(data){
		if(success === false){
			json.message = data
		}else{
			json.data = data
		}
	}

	this.json(json);
}