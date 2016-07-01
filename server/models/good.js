
let mongoose = require('mongoose');

const required = true,
	ObjectId = mongoose.Schema.Types.ObjectId;



let schema = mongoose.Schema({

	name 		: {type : String, required, $p:{label : "Наименование"}},
	alias 		: {type : String, required, $p : {label : "Название на латинице для адресной строки"}},
	description : {type : String, $p: {widget: 'textarea', display: 'e', label : "Описание в списке товаров"}},
	disabled 	: {type : Boolean, $p : {label : "Отключить"}},
	image 		: {type : mongoose.Schema.Types.ObjectId, ref: 'File', $p : {label : "Картинка для списка"}},
	groupId 	: {type : ObjectId, ref : 'Group', $p: {widget: 'select'}, $p : {label : "Родительская категория"}},
	ordr 		: {type : Number, $p : {label : "Рейтинг для сортировки"}},
	price 		: {type : Number, $p : {label : "Цена"}},
	measure 	: {type : String, $p : {label : "Единица измерения"}}
})

schema.virtual('$pTitle').get(function(){ return this.name })

let Model = mongoose.model('Good', schema)

module.exports = Model;
