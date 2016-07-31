module.exports = function* (req, res, next) {
	let {query} = req.body,
		results, resultMessage;

	if(!req.xhr)
		return next();

	if(!query){
		results = false;
		resultMessage = "No query field";
	}else{
		results = yield App.mappers.search(query);
	}

	res.sendJson(!!results, results || resultMessage);
};