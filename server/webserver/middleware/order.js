const Router = require('express').Router,
	  router = module.exports = new Router;


router.get('/', (req, res, next) => {

	res.render('order');

})



router.post('/send', (req, res, next) => {
	let {who, contacts, message} = req.body,
		result, resultMessage;

	if(!who || !contacts || !message){
		result = false;
		resultMessage = "Не все поля заполнены";
	}else{

		App.mail.send({
			to : "tupkalov@gmail.com",
			subject : `Форма обратной связи от ${who}`,
			text : `${who}:\n\n ${message}\n\n ${contacts}`
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
