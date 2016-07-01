
let mongoose = require('mongoose');

const required = true,
	ObjectId = mongoose.Schema.Types.ObjectId;



let schema = mongoose.Schema({
	name 	: {type : String, required, $p :{display : 'e', label : "alias (Зарезервированные имена на сервере)"}},
	description : {type : String, $p : {label : "Описание"}},
	text 	: {type : String, $p : {label : "Текст", widget : 'textarea', display : 'e'}}
}, {collection : 'glo'})

schema.virtual('$pTitle').get(function(){ return this.name })

let Model = mongoose.model('glo', schema)

module.exports = Model;
