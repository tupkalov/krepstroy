var gulp = require('gulp');  
var concat = require('gulp-concat');

var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
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
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('js'))
        .pipe(livereload());

   /*gulp.src(['js/src/**\/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('js'))
        .pipe(livereload());*/
})

gulp.task('styles', function() {  
    gulp.src(['styles/index.styl'])
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
})

gulp.task('templates', function(){
    gulp.src(['templates/*.pug'])
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./'))
        .pipe(livereload());
})

// Локальный сервер для разработки
gulp.task('http-server', function() {
    connect()
        .use(require('connect-livereload')())
        .use(serveStatic('./'))
        .listen('9000');

    console.log('Server listening on http://localhost:9000');
})

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('js/src/**', ['scripts'])
    gulp.watch('styles/**', ['styles'])
    gulp.watch('blocks/**', ['styles', 'scripts', 'templates'])
    gulp.watch('templates/**', ['templates'])

});

gulp.task('default', ['scripts', 'styles', 'templates', 'watch', 'http-server']);