
let mongoose = require('mongoose');

const required = true,
	ObjectId = mongoose.Schema.Types.ObjectId;



let schema = mongoose.Schema({
	name 	: {type : String, required, $p :{
		display : 'e', 
		label : "alias (Зарезервированные имена на сервере)"
	}},
	description : {type : String, $p : {label : "Описание"}},
	text 	: {type : String, $p : {
		label : "Значение", 
		display : 'e',
	}},

	bigtext 	: {type : String, $p : {
		widget : 'textarea',
		label : "Текст", 
		display : 'e',
	}},

}, {collection : 'glo'})

schema.virtual('$pTitle').get(function(){ return this.name })


schema.post('save', function(){
	process.emit('recache');
});

let Model = mongoose.model('glo', schema)

Model.$p = {
	actions : {
		delete : {
		    apply (conditions, context, done){
    	    	context.model.obj.remove (conditions, function(){
    	    		process.emit('recache');
    	    		done(...arguments);
    	    	});
        	}
        }
	},
	pageActions : ['delete']
};

module.exports = Model;