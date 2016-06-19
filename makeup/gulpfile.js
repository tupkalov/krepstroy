var gulp = require('gulp');  
var concat = require('gulp-concat');

var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var exorcist = require('exorcist');
var browserify = require('browserify');

var pug = require("gulp-pug");

var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

//var lr = require('tiny-lr');
var livereload = require('gulp-livereload');

var connect = require('connect');
var serveStatic = require('serve-static');

var plumber = require('gulp-plumber');
//var server = lr();

gulp.task('scripts', function() {  

    var bundler = browserify({
        entries: 'js/src/index.js',
        debug: true
    });
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(exorcist('js/app.js.map', {
            root : '../'
        }))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('js'))
        .pipe(livereload());
})

gulp.task('styles', function() {  
    gulp.src(['styles/index.styl'])
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
})

gulp.task('templates', function(){
    gulp.src(['templates/pages/*.pug'])
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./'))
        .pipe(livereload());
})


gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(['js/src/**/*.js', 'blocks/**/*.js'], ['scripts'])
    gulp.watch(['styles/**/*.styl', 'blocks/**/*.styl'], ['styles'])
    gulp.watch(['templates/**/*.pug', 'blocks/**/*.pug'], ['templates'])

});

gulp.task('default', ['scripts', 'styles', 'templates', 'watch']);