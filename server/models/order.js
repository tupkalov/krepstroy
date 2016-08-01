
let mongoose = require('mongoose');

const required = true,
	ObjectId = mongoose.Schema.Types.ObjectId;



let schema = mongoose.Schema({
	id 	   : {type : Number, $p : {label : 'Номер заказа'}},
	basket : {type : mongoose.Schema.Types.Mixed, $p : {label : "Состав", display : 'e'}}, 
	name   : {type : String, $p : {label : 'Имя'}}, 
	tel   			: {type : String, $p : {label : 'Телефон'}}, 
	organization   	: {type : String, $p : {label : 'Организация'}}, 
	inn   			: {type : String, $p : {label : 'ИНН'}}, 
	additional   	: {type : String, $p : {label : 'Дополнительно'}}, 
	address   		: {type : String, $p : {label : 'Адрес'}}, 
});

schema.virtual('$pTitle').get(function(){ return this.id })

let Model = mongoose.model('Order', schema)

module.exports = Model;
