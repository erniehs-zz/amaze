var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('lint', function() {
    return gulp
        .src(['gulpfile.js', './lib/*.js', './test/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('demo', function() {
    var browserified = function(filename) {
        return browserify(filename)
            .require(filename, {
                expose: 'maze'
            });
    };

    return browserified('./lib/maze.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./demo'));
});

gulp.task('test', function() {
    return gulp
        .src('./test/*.js')
        .pipe(mocha());
});

gulp.task('default', ['lint', 'test', 'demo'], function() {
    gulp.watch(['./lib/*.js', './test/*.js', './demo/index.html'], function() {
        gulp.run('lint', 'test', 'demo');
    });
});
