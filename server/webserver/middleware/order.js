const Router = require('express').Router,
	  router = module.exports = new Router;


router.get('/', (req, res, next) => {

	res.render('order');

})



router.post('/send', function(req, res, next){

	co(function* () {
		let {name, tel, organization, inn, address, additional} = req.body,
			result, resultMessage;

		if(!name || !tel || !organization || !address){
			result = false;
			resultMessage = "Не все поля заполнены";
		}else{
			let basket 	= req.session.basket || (req.session.basket = []);
			let order 	= yield App.services.order({
				basket, name, tel, organization, inn, additional
			})

			App.mail.send({
				to : App.glo.manager,
				subject : `Новый заказ #${order.id} от ${name}`,
				text : order.emailText,
				attachments : [{
					path : order.fileUrl,
	            	contentType: 'text/xml'
				}]
			});

			result = true;
			resultMessage = "Сообщение отправлено";

		}

		if(req.xhr){
			res.sendJson(result, resultMessage);
		}else{
			res.render('message', {message : resultMessage});
		}
	}).catch(next);
})
