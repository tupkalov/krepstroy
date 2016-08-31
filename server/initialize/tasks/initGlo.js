module.exports = function* (){
	MONGO.collection('glo').find()
		.toArray()
		.then(
			glos => {
				let glo = {};
				glos.forEach(item => {
					glo[item.name] = item.text
					glo[item.name + "_big"] = item.bigtext
				});
				console.log('Glo complete!');
				App.glo = glo;
			}
		)
}