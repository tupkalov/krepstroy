
let mongoose = require('mongoose');

const required = true,
	ObjectId = mongoose.Schema.Types.ObjectId;



let schema = mongoose.Schema({

	name 		: {type : String, required, $p : {label : "Наименование"}},
	alias 		: {type : String, $p : {label : "Алиас для адресной строки"}},
	disabled 	: {type : Boolean, $p : {label : "Отключить"}},
	parentId 	: {type : ObjectId,  required : false, default : null, ref : 'Group', $p : {label : "Родительская группа", widget: 'select'}},
	ordr		: {type : Number, $p : {label : "Рейтинг для сортировки"}}

})

schema.virtual('$pTitle').get(function(){ return this.name })
schema.pre('validate', function(next){
	if(!this.parentId)
		this.parentId = null;
	next();
});

schema.post('save', function(){
	process.emit('recache');
});
schema.post('update', function(){
	console.log('updcountate', ...arguments);
	process.emit('recache');
});

let Model = mongoose.model('Group', schema)

module.exports = Model;