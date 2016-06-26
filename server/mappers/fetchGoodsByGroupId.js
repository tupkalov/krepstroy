module.exports = (groupId, basket) => 
	(new Promise((resolve, reject) => 
		MONGO.collection('goods').find({
			groupId : MONGO.ObjectId(groupId),
			disabled : {$ne : true}
		})
		.sort({ordr : 1})
		.toArray((err, res) => err ? reject(err) : resolve(res))
	))

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