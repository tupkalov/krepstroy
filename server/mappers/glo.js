module.exports = name =>
	MONGO.collection('glo').findOne({name})
			.then(result => {
				if(!result)
					throw new AppError('Glo:NoDocument', {info : {name}});
				else
					return result;
			})

			.catch(error => {
				if(!(error instanceof AppError))
					error = new AppError('InternalError', {error});

				throw error;
			})