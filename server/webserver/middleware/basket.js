const {Router} = require('express');
const bodyParser = require('body-parser')

let router = module.exports = new Router();

function sendJson(success, data){
	json = {
		type : success !== false ? 'ok' : 'error'
	};

	if(data){
		if(success === false){
			json.message = data
		}else{
			json.data = data
		}
	}

	this.json(json);
}


router.use((req, res, next) => {
	res.sendJson = sendJson;
	next();
})
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());






let map = {

	'/add' : function* (req, res, next) {
		let basket = req.session.basket || (req.session.basket = []);

		// check id param
		let id = req.body.id;
		if(typeof req.body.id !== "string"){
			throw new MiddlewareError("WrongId", {status : 400, info : {id : req.body.id}})
		}

		let count = parseInt(req.body.count);
		if(isNaN(count) || count < 1){
			throw new MiddlewareError("WrongCount", {status : 400, info : {count}});
		}


		let good = basket.find(({_id}) => _id === id);
		if(good){
			good.count = count;

		}else{

			good = yield App.mappers.fetchGood(req.body.id)
				.catch(error => {
					if(error instanceof MapperError && error.message === "NotFound"){
						error = new MiddlewareError("GoodNotFound", {status : 400, error});
						next(error);
					}

					throw error;
				});

			basket.push({_id : req.body.id, count : count, good});

		}
		
		res.sendJson(true, basket);
	},

	'/remove' : function (req, res, next){

		let basket = req.session.basket || (req.session.basket = []);

		// check id param
		let id = req.body.id;
		if(typeof req.body.id !== "string"){
			throw new MiddlewareError("WrongId", {status : 400, info : {id : req.body.id}})
		}

		let good = basket.find(({_id}) => _id === id);
		if(!good) 
			return res.sendJson();

		let index = basket.indexOf(good);
		basket.splice(index, 1);
		res.sendJson();
	},

	'/list' : function (req, res, next){

		let basket = req.session.basket || (req.session.basket = [])
		res.sendJson(true, basket);

	}
};


for(let path in map){
	let fn = map[path]
	if(fn.constructor.name === 'GeneratorFunction')
		router.post(path, (req, res, next) => {
			co(fn, req, res, next).catch(next);
		});
	else if(typeof fn === "function")
		router.post(path, fn);
	else
		router.use(path, fn);
}



router.use((error, req, res, next)  => {
	let basket = req.session.basket || (req.session.basket = []);
	if(!(error instanceof MiddlewareError)){
		App.log(error);
		error = new MiddlewareError("Internal error", {status : 500, error});
	}
	res.status(error.status || 500);
	res.sendJson(false, error.message);
})