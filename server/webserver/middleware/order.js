const Router = require('express').Router,
	  router = module.exports = new Router;


router.get('/', (req, res, next) => {
	
	res.render('order');

})


router.post('/send', (req, res, next) => {

})

