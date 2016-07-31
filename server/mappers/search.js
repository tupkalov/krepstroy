module.exports = query => {
	if(typeof query !== "string" || !query.length)
		return Promise.resolve([]);

	return MONGO.collection('goods').find({
		$text : {
			$search : query
		}
	}).limit(10).project({name : true}).toArray();
}