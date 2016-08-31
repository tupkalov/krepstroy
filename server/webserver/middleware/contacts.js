const Router = require('express').Router,
	  router = module.exports = new Router;


router.get('/', function (req, res, next){
	co(function* (){
		let data = yield {
			groups 		: App.mappers.getGroupsSidebar(),
			contactsData: App.glo.contactsData_big
		};

		res.render('contacts', data);
	})

		.catch(next);
})



router.post('/send', (req, res, next) => {
	let {who, contacts, message} = req.body,
		result, resultMessage;

	if(!who || !contacts || !message){
		result = false;
		resultMessage = "Не все поля заполнены";
	}else{

		App.mail.send({
			to : App.glo.manager,
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

