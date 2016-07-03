const Router = require('express').Router,
	  router = module.exports = new Router;


router.get('/', (req, res, next) => {

	res.render('order');

})



router.post('/send', (req, res, next) => {
	let {name, tel, organization, inn, additional} = req.body,
		result, resultMessage;

	if(!name || !tel || !organization){
		result = false;
		resultMessage = "Не все поля заполнены";
	}else{
		let basket = req.session.basket || (req.session.basket = []);

		App.mail.send({
			to : App.glo.manager,
			subject : `Новый заказ от ${name}`,
			text : `Контактное лицо: ${name}\n` +
				`Телефон: ${tel}\n` +
				`Организация: ${organization}\n` +
				`ИНН: ${inn}\n`+
				`Дополнительно: ${additional}\n\n` +
				`Заказ\n` +
				basket.map(item => 
					`${item.good.cid}\t${item.good.name}\t${item.count} x ${item.good.price}р.`
				).join('\n')



		});

		result = true;
		resultMessage = "Сообщение отправлено";

	}

	if(req.xhr){
		res.sendJson(result, resultMessage);
	}else{
		res.render('message', {message : resultMessage});
	}
})
