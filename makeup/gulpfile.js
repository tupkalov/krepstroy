var gulp = require('gulp');  
var concat = require('gulp-concat');

var exorcist = require('exorcist');

var browserify = require('browserify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');

var pug = require("gulp-pug");

var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

//var lr = require('tiny-lr');
var livereload = require('gulp-livereload');

var connect = require('connect');
var serveStatic = require('serve-static');

var plumber = require('gulp-plumber');
//var server = lr();
// ////////////////////////////////////////////
// ////////////////////////////////////////////
// ////////////////////////////////////////////
var watchify    = require('watchify');
// Input file.
watchify.args.debug = true;
var bundler = watchify(browserify('js/src/index.js', watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: '/ttttt'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    console.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            console.log(err);
        })
        .pipe(exorcist('build/index.js.map', 'index.js.map', '..'))
        .pipe(source('index.js'))
        .pipe(gulp.dest('build'))
}
gulp.task('scripts', function () {
    return bundle();
});
// ////////////////////////////////////////////
// ////////////////////////////////////////////
// ////////////////////////////////////////////

gulp.task('styles', function() {  
    gulp.src(['styles/index.styl'])
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'));
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

    gulp.watch(['styles/**/*.styl', 'blocks/**/*.styl'], ['styles'])
    gulp.watch(['templates/**/*.pug', 'blocks/**/*.pug'], ['templates'])

});





let replace =require('gulp-replace');

gulp.task('compileTemplates', () => {

    gulp.src(['./templates/layouts/*.pug'])
        .pipe(pug({client : true, compileDebug : false}))
        .pipe(replace('function template(locals)', 'module.exports = function(locals, jade)'))
        .pipe(
            gulp.dest('./build/viewjs')
        )
        .pipe(livereload());

})

gulp.task('watch-make', function(){
    livereload.listen();

    gulp.watch(['js/src/**/*.js', 'blocks/**/*.js'], ['scripts'])
    gulp.watch(['styles/**/*.styl', 'blocks/**/*.styl'], ['styles'])
    gulp.watch(['templates/**/*.pug', 'blocks/**/*.pug'], ['compileTemplates'])
})


gulp.task('make', ['compileTemplates', 'scripts', 'styles', 'watch-make']);

gulp.task('default', ['scripts', 'styles', 'templates', 'watch']);