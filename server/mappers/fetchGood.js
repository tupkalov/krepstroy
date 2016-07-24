module.exports = id =>		

	MONGO.collection('goods')
		.aggregate(([{
			$match : {
				_id : MONGO.ObjectId(id),
				disabled : {$ne : true}
			}
		}, {
			$lookup : {
				from : 'files',
				localField : 'image',
				foreignField : '_id',
				as : 'image'
			}
		}]))

			.toArray()
			.then(res => {
				if(res[0]){
					res = res[0];
					if(res.image && res.image.length){
						res.image = res.image[0].path
					}else
						delete res.image
					
					return res;
				}
			})