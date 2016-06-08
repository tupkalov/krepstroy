module.exports = () =>
	new Promise((res, rej) => 
		MONGO.collections.groups.find({
			enable 		: true,
			parentId 	: null
		}).toArray((error, result) => {
			if(result)
				res(result);
			else if(err)
				rej(new AppError('InternalError', {err}))
			else
				rej(new AppError('GetGroups:NoGroups'));
		})
	)