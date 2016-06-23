const {Router} = require('express');
const bodyParser = require('body-parser')

let router = module.exports = new Router();

function sendJson(success, data){
	json = {
		type : success !== false
	};

	if(data){
		if(success !== false){
			json.message = data
		}else{
			json.data = data
		}
	}

	this.json(json);
}


router.use((req, res, next) => {
	console.log('op')
	res.sendJson = sendJson;
	next();
})
router.use(bodyParser.json());






let map = {

	'/add' : function* (req, res, next) {
		let basket = req.session.basket || (req.session.basket = []);

		// check id param
		let id = req.body.id;
		if(typeof req.body.id !== "string"){
			throw new MiddlewareError("WrongId", 400, {info : {id : req.body.id}})
		}

		let good = basket.find(({_id}) => _id === id);
		if(good) res.sendJson();

		good = yield App.mappers.fetchGood(req.body.id)
			.catch(error => {
				if(error instanceof MapperError && error.message === "NotFound"){
					error = new MiddlewareError("GoodNotFound", 400, {error});
					next(error);
				}

				throw error;
			});

		basket.push(good);

		sendJson(true, basket);
	},

	'/remove' : function (req, res, next){

		let basket = req.session.basket || (req.session.basket = []);


		let good = basket.find(({_id}) => _id === id);
		if(!good) res.sendJson();

		let index = basket.indexOf(good);
		basket.splice(index, 1);
		sendJson();
	},

	'/list' : function (req, res, next){

		let basket = req.session.basket || (req.session.basket = [])
		sendJson(true, basket);

	}
};


for(let path in map){
	let fn = map[path]
	if(fn.constructor.name === 'GeneratorFunction')
		router.post(path, (req, res, next) => {
			co(fn, ...arguments).catch(next);
		});
	else if(typeof fn === "function")
		router.post(path, fn);
	else
		router.use(path, fn);
}



router.use((error, request, response, next)  => {
	let basket = req.session.basket || (req.session.basket = []);
	if(!(error instanceof MiddlewareError)){
		App.log(error);
		error = new MiddlewareError("Internal error", 500, {error});
	}

	response.status(error.status || 500);
	response.sendJson(false, error.message);
})