module.exports = name =>
	new Promise((res, rej) => {
		MONGO.collection('glo').findOne({name})
			.then(result => {
				if(!result)
					throw new AppError('Glo:NoDocument');
				else
					res(result);
			})

			.catch(error => {
				if(!(error instanceof AppError))
					error = new AppError('InternalError', {error});

				reject(error);
			})
	})