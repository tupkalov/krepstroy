module.exports = groupId => 
	new Promise((resolve, reject) => 
		MONGO.collection('goods').find({
			groupId : MONGO.ObjectId(groupId),
			disabled : {$ne : true}
		}).toArray((err, res) => err ? reject(err) : resolve(res))
	)