const mongodb = require('mongodb'),
	  MongoClient = mongodb.MongoClient;

module.exports = config => {
	const cfg = config.mongo;
	// Connection URL 
	var url = `mongodb://${cfg.username}:${cfg.password}@${cfg.host || 'localhost'}:${cfg.port || 27017}/${cfg.db}`;
	// Use connect method to connect to the Server 
	MongoClient.connect(url, function(err, db) {
		if(err){
			console.log(err);
			process.exit();
			return;
		}

		console.log(`Connected correctly to server ${cfg.host}:${cfg.port || 27017}`);
	 
		global.MONGO = db;
	});
}