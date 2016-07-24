module.exports = () =>
	new Promise((res, rej) => {

		MONGO.collection('groups').aggregate([{
			$match : {disabled	: false}
		}, {
			$lookup : {
				from : 'files',
				localField : 'image',
				foreignField : '_id',
				as : 'image'
			}
		}]).toArray((error, result) => {
			if(result)
				res(result);
			else if(err)
				rej(new AppError('InternalError', {err}))
			else
				rej(new AppError('GetGroups:NoGroups'));
		})
	})