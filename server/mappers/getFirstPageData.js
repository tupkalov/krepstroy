module.exports = () =>
	new Promise((res, rej) => 
		MONGO.collections.glo.findOne({
			name : 'firstPageData'
		}, (error, result) => {
			if(result)
				res(result);
			else if(err)
				rej(new AppError('InternalError', {err}))
			else
				rej(new AppError('GetFirstPageData:NoGroups'));
		})
	)