	let fs = require('fs'),
		http = require('http');

	const cfg = {
		"host" 	: "localhost",
		"db"	: "krepstroy",
		"username"	: "krepsite",
		"password"	: "KrepSpbRu"
	};

	let mongodb = require('mongodb'),
		MongoClient = mongodb.MongoClient,
		ObjectID = mongodb.ObjectID,
		_ = require('underscore');

	debugger;
	// Connection URL 
	var url = `mongodb://${cfg.username}:${cfg.password}@${cfg.host || 'localhost'}:${cfg.port || 27017}/${cfg.db}`;
	// Use connect method to connect to the Server 
	MongoClient.connect(url, function(err, db) {
		if(err){
			console.log(err);
			process.exit();
			return;
		}

		console.log(`Connected correctly to server ${cfg.host}:${cfg.port}`);
	 
		global.MONGO = db;

		json = require('./groups.json');

		map = {};
		json.forEach(obj => {
			let id = obj.id;
			map[id] = obj;
		});

		let groupsArray = [], groupsMap = {}, obj;
		debugger;
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

			/*       
				"id": "1",
		        "ts": "2014-10-17 09:21:46",
		        "ordr": "0",
		        "name": "Анкера",
		        "skey": "ankera",
		        "onoff": "1",
		        "img": "139823856557.jpg",
		        "img2": "140085867988.jpg",
		        "parent_id": "11"
        	*/
        	let ordr = parseFloat(obj.ordr);
        	let groupsObj = {
				_id 	: obj._id,
				oid 	: parseInt(obj.id),
				ordr 	: isNaN(ordr) ? null : ordr,
				name 	: obj.name,
				alias 	: obj.skey,
				disabled: obj.onoff !== "1",
				parent_id: obj.parent_id
			};
			groupsArray.push(groupsObj);

			groupsMap[obj._id] = groupsObj;
		}


		/*
			{
		        "id": "2095",
		        "ts": "2016-06-02 14:02:53",
		        "ordr": "0",
		        "category_id": "93",
		        "name": "Гель для мытья посуды Цитрус 5 л",
		        "skey": "gel_dlya_mytya_posudy_citrus_5_l",
		        "ann": "",
		        "desc": "",
		        "img": "",
		        "onoff": "1",
		        "cid": "000006135",
		        "price": "84.8",
		        "img2": "",
		        "measure": "шт."
		    }
		 */
		json = require('./goods.json');
		let goods = [], imgs = [];
		let goodObj;
		while(goodObj = json.shift())
		{
			let group = map[goodObj.category_id];
			if(!group || !(group = groupsMap[group._id]))
				continue;


        	let ordr = parseFloat(goodObj.ordr);
			let good = {
				_id 		: new ObjectID,
				ordr 		: isNaN(ordr) ? null : ordr,
				group_id 	: group._id,
				name 		: goodObj.name,
				alias 		: goodObj.skey,
				description	: goodObj.ann,


				image       : null,
				cid 		: goodObj.cid,
				price 		: goodObj.price,
				measure  	: goodObj.measure
			}

			goods.push(good);


			if(goodObj.img2){
				imgs.push({
					good, img : goodObj.img2
				})
			}

		}


		function download(filename){
			return new Promise((resolve, reject) => {
				let dest = './goodImgs/' + filename;
				let file = fs.createWriteStream(dest);
				let request = http.get(`http://krep.spb.ru/files/items/${filename}`,
					response => {
						response.pipe(file);
						file.on('finish', () => file.close(() => resolve(filename)));
					}
				).on('error', error => {
					fs.unlink(dest);
					reject(error);
				})
			})
		}


		function* imgParse(){
			let imgData;
			while(imgData = imgs.shift()){
				let good = imgData.good;
				yield download(imgData.img).then(
					img => {
						good.image = img;
						console.log('file downloaded ' + img + "| left : " + imgs.length)
					},
					error => {
						console.error("Error download file " + imgData.img);
						console.error(error);
					}
				)

			}
		}

		let co = require('co');
		var beautify = require("json-beautify");

		co(imgParse).then(
			() => {

				return Promise.all([

					new Promise((resolve, reject) =>{
						let groups = db.collection('groups');
						groups.insertMany(groupsArray, (err, r) => err ? reject(err) : resolve(r))
						//fs.writeFile('groupsExit.json', beautify(groupsArray, null, 2, 100), err => err ? reject(err) : resolve())
					}),

					new Promise((resolve, reject) =>{
						let goodsC = db.collection('goods');
						goodsC.insertMany(goods, (err, r) => err ? reject(err) : resolve(r))
						// fs.writeFile('goodsExit.json', beautify(goods, null, 2, 100), err => err ? reject(err) : resolve())
					}
					)

				]);

			}
		).then(
			ok => console.log('done!'),
			error => console.error(error)
		).then(
			() => process.exit()
		);
	});