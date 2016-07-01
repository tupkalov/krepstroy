
let mongoose = require('mongoose');

const required = true,
	ObjectId = mongoose.Schema.Types.ObjectId;



let schema = mongoose.Schema({
	name 	: {type : String, required, $p :{label : "Name (Зарезервированные имена на сервере)"}},
	text 	: {type : String, $p : {label : "Текст", widget : 'textarea', display : 'e'}}
}, {collection : 'glo'})

schema.virtual('$pTitle').get(function(){ return this.name })

let Model = mongoose.model('glo', schema)

module.exports = Model;
