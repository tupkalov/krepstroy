const Router = require('express').Router,
	  router = module.exports = new Router;


router.get('/', function (req, res, next){
	co(function* (){
		let data = yield {
			groups 		: App.mappers.getGroupsSidebar(),
			contactsData: App.mappers.glo('contactsData')
		};

		res.render('contacts', data);
	})

		.catch(next);
})


router.post('/send', (req, res, next) => {

})

