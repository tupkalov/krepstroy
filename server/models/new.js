
let mongoose = require('mongoose');

const required = true,
	ObjectId = mongoose.Schema.Types.ObjectId;



let schema = mongoose.Schema({
	title 	: {type:String, required, $p : {label : "Заголовок"}},
	date 	: {type : String, required, $p : {label : "Дата формата ММ/ДД"}},
	alias 	: {type : String, $p : {label : "Алиас для адресной строки"}},
	short 	: {type : String, $p : {label : "Короткая аннотация для главной страницы"}},
	desc 	: {type : String, $p : {label : "Текст", widget : 'textarea', display : 'e'}}
})

schema.virtual('$pTitle').get(function(){ return this.title })

let Model = mongoose.model('New', schema)

module.exports = Model;
