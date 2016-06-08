	const cfg = {
		"host" 	: "localhost",
		"port" 	: 27017,
		"db"	: "krepstroy",
		"username"	: "krepsite",
		"password"	: "KrepSpbRu"
	};

	let mongodb = require('mongodb'),
		MongoClient = mongodb.MongoClient,
		ObjectID = mongodb.ObjectId,
		_ = require('underscore');

	// Connection URL 
	var url = `mongodb://${cfg.username}:${cfg.password}@${cfg.host || 'localhost'}:${cfg.port || 27015}/${cfg.db}`;
	// Use connect method to connect to the Server 
	MongoClient.connect(url, function(err, db) {
		if(err){
			console.log(err);
			process.exit();
			return;
		}

		console.log(`Connected correctly to server ${cfg.host}:${cfg.port}`);
	 	
	 	debugger;

		global.MONGO = db;

		json = require('./dump.json');

		map = {};
		json.forEach(obj => {
			let id = obj.id;
			map[id] = obj;
		});

		let exitArray = [], obj;
		while(obj = json.shift()){
			obj._id || (obj._id = new ObjectID());

			let parentId = obj.parent_id;
			if(parentId == 0){
				obj.parent_id = null;
			}else{

				let	parent = map[parentId];

				if(!parent) continue;
				if(!parent._id){
					let index = json.indexOf(parent);
					json.unshift(json.splice(index, 1)[0], obj);
					continue;
				}

				obj.parent_id = parent._id;

			}
			exitArray.push(obj);
		}
		console.log('done');

		exitArray = exitArray
		.map(({_id, img, name, ordr, parent_id, skey}) => {

			return {
				_id : ObjectID(_id),
				image : img ? '/files/' + img : null,
				name,
				ordr : parseInt(ordr),
				parent_id : ObjectID(parent_id),
				alias : skey
			}

		})

		fs = require('fs');
		fs.writeFile('exit.json', JSON.stringify(exitArray), () => {
			console.log('writeed')
		})
	});