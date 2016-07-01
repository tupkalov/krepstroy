const express = require('express');
const basicAuth = require('basic-auth-connect');

module.exports = app => {
	app.use('/admincdn', express.static("admincdn"));
	
	app.use('/admin', basicAuth('admin', 'KrepSpbRu'));

	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/krepstroy');
	 
	require('coffee-script/register') // <-- This dependency is to be removed very soon. 
	penguin = require('penguin')
	admin = new penguin.Admin({	
		fileManager: true,
		indexTitle: 'Админка',
		vModels: {
			groups: {
				base: 'groups'
			}
		},
		menu: [
			[ 'Админка', '/admin' ],
			[ 'Разделы', [
				[ 'Файлы', '/admin/files' ],
				[ 'Группы', '/admin/groups' ],
				[ 'Товары', '/admin/goods' ],
				[ 'Новости', '/admin/news' ],
				[ 'Общее', '/admin/glo' ],
			] ]
		]
	})

	admin.resLocals.statics.js.push('//cdn.ckeditor.com/4.4.4/standard/ckeditor.js')
	admin.resLocals.statics.js.push('/admincdn/script.js')
	//admin.resLocals.statics.css.push('/admincdn/style.css')

	admin.setupApp(app)
}
