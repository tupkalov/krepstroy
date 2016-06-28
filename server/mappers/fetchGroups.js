module.exports = () =>
	new Promise((res, rej) => {

		MONGO.collection('groups').find({
			disabled	: false
		}).toArray((error, result) => {
			if(result)
				res(result);
			else if(err)
				rej(new AppError('InternalError', {err}))
			else
				rej(new AppError('GetGroups:NoGroups'));
		})
	})