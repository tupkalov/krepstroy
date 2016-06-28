module.exports = id =>
	new Promise((resolve, reject) => {
		MONGO.collection('goods').findOne({
			_id : MONGO.ObjectId(id),
			disabled : {$ne : true}
		}, 
			(err, res) => err ? reject(err) : res ? resolve(res) : reject(new MapperError('NotFound'))
		)
	})