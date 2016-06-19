let gulp = require('gulp'),
	pug = require('gulp-pug');

gulp.task('pug', () => {

	gulp.src(['./makeup/templates/layouts/*.pug'])
		.pipe(pug({client : true, compileDebug : false}))
		.pipe(
			gulp.dest('./static/viewjs')
		)
})