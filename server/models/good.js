
let mongoose = require('mongoose');

const required = true,
	ObjectId = mongoose.Schema.Types.ObjectId;



let schema = mongoose.Schema({

	name 		: {type : String, required, $p:{label : "Наименование"}},
	//alias 		: {type : String, required, $p : {label : "Название на латинице для адресной строки"}},
	description : {type : String, $p: {widget: 'textarea', display: 'e', label : "Описание в списке товаров"}},
	cid 		: {type : String, $p : {label : "Идентификатор из 1С"}},
	disabled 	: {type : Boolean, $p : {label : "Отключить"}},
	image 		: {type : mongoose.Schema.Types.ObjectId, ref: 'File', $p : {label : "Картинка для списка"}},
	groupId 	: {type : ObjectId, ref : 'Group', $p: {widget: 'select', label : "Родительская категория"}},
	ordr 		: {type : Number, $p : {label : "Рейтинг для сортировки"}},
	price 		: {type : Number, $p : {label : "Цена"}},
	measure 	: {type : String, $p : {label : "Единица измерения"}}
})

schema.virtual('$pTitle').get(function(){ return this.name })

schema.post('save', function(){
	process.emit('recache');
});
schema.post('remove', function(){
	process.emit('recache');
});


let Model = mongoose.model('Good', schema)

module.exports = Model;
