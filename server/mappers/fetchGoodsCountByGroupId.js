module.exports = groupId => 
	new Promise((resolve, reject) => 
		MONGO.collection('goods').find({
			groupId : MONGO.ObjectId(groupId)
		}).count((err, res) => err ? reject(err) : resolve(res))
	)