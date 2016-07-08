module.exports = (groupId, basket) =>
		MONGO.collection('goods')
			.aggregate(([{
				$match : {
					groupId : MONGO.ObjectId(groupId),
					disabled : {$ne : true}
				}
			}, {
				$lookup : {
					from : 'files',
					localField : 'image',
					foreignField : '_id',
					as : 'image'
				}
			}, {
				$sort : {
					ordr : 1
				}
			}]))

			.toArray()
			.then(result => {
				return result.map(res => {
					if(res.image && res.image.length){
						res.image = res.image[0].path
					}else
						delete res.image
					
					return res;
				});
			})

			.then(goods => {
				for(let basketElement of basket){

					for(good of goods){

						if(good._id.toString() === basketElement._id.toString()){
							good.inBasket = basketElement.count

						}

					}

				}

				return goods;

			})