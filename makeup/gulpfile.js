var gulp = require('gulp');  
var concat = require('gulp-concat');
var babel = require("gulp-babel");

var jade = require("gulp-jade");

var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

var refresh = require('gulp-livereload');  
var lr = require('tiny-lr');  
var server = lr();

gulp.task('scripts', function() {  
    gulp.src(['js/src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('js'))
        .pipe(refresh(server))
})

gulp.task('styles', function() {  
    gulp.src(['styles/style.styl'])
        .pipe(sourcemaps.init())
        .pipe(stylus({
        	compress : true
    	}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
        .pipe(refresh(server))
})

gulp.task('templates', function(){
    gulp.src(['templates/*.jade'])
        .pipe(jade())
        .pipe(gulp.dest('./'))
})

gulp.task('lr-server', function() {  
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('default', ['scripts', 'styles', 'templates', 'lr-server']);
gulp.watch('js/**', ['scripts'])
gulp.watch('styles/**', ['styles'])
gulp.watch('templates/**', ['templates'])