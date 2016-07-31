module.exports = function*(req,res,next){
	let {params : {id}} = req;
	let _id;
	try{
		_id = MONGO.ObjectId(id);
	}catch(e){
		return next();
	}

	let link = yield MONGO.collection('goods')
		.aggregate(([{
			$match : {
				_id,
				disabled : {$ne : true}
			}
		}, {
			$lookup : {
				from : 'groups',
				localField : 'groupId',
				foreignField : '_id',
				as : 'group'
			}
		}]))

			.toArray()
			.then(res => {
				if(res[0]){
					res = res[0];
					if(res.group){
						var link = `/cat/${res.group[0].alias}#${_id}`
					}else
						throw new AppError('GoodWithoutParent', {status : 500});
					
					return link;
				}else
					throw new AppError('GoodNotFound', {status : 404});
			})

	res.redirect(link);
}