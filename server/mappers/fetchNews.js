module.exports = () =>
	new Promise((res, rej) => {
		
		MONGO.collection('news')

		.find({})
		.sort({date : -1})

		.toArray((error, result) => {
			if(result)
				res(result);
			else if(err)
				rej(new AppError('InternalError', {err}))
			else
				rej(new AppError('fetchNews:NoNews'));
		})
	})