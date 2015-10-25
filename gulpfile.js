var gulp = require('gulp');
var sourceMaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var vulcanize = require('gulp-vulcanize');
var browserSync = require('browser-sync').create();


var scriptFiles = ['bower_components/webcomponentsjs/webcomponents.min.js',
                   'bower_components/jquery/dist/jquery.min.js', 'compiled/*.js',
                   'bower_components/promise-polyfill/Promise.js'];
var styleFiles  = ['app/css/*.css'];
var components  = ['app/elements/earthquake-map/earthquake-map.html'];
var htmlFiles   = ['app/*.html'];


gulp.task('clean', function(){
  return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('scripts',['babel', 'clean'], function () {
  return gulp.src(scriptFiles) //get all js files under the src
      .pipe(sourceMaps.init()) //initialize source mapping
      .pipe(concat('scripts.js'))
      .pipe(sourceMaps.write('.')) //write source maps
      .pipe(gulp.dest('dist/js/')); //pipe to the destination folder
});

gulp.task('babel', function () {
  return gulp.src('app/js/*.js')
      .pipe(babel())
      .pipe(concat('babel.js'))
      .pipe(gulp.dest('compiled/'));
});

gulp.task('styles',['clean'], function() {
  return gulp.src(styleFiles)
      .pipe(sourceMaps.init())
      .pipe(concatCss('style.css'))
      .pipe(sourceMaps.write('.'))
      .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy', function () {
  return gulp.src(htmlFiles)
      .pipe(gulp.dest('dist'));
});

gulp.task('copyFonts', function () {
  return gulp.src('app/fonts/*.*')
      .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('vulcanizeFiles', function () {
    return gulp.src(components)
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false
        }))
        .pipe(gulp.dest('dist/components/'));
});

// Watch tasks
gulp.task('js-watch', ['refresh'], browserSync.reload);
gulp.task('css-watch', ['refresh'], browserSync.reload);
gulp.task('html-watch', ['refresh'], browserSync.reload);
gulp.task('component-watch', ['vulcanizeFiles'], browserSync.reload);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch(htmlFiles, ['html-watch']);
    gulp.watch(styleFiles, ['css-watch']);
    gulp.watch(scriptFiles, ['js-watch']);
    gulp.watch('app/js/*.js', ['js-watch']);
    gulp.watch(components, ['component-watch']);
});

gulp.task('refresh',function (callback) {
  runSequence(
    ['scripts', 'styles'],
    'vulcanizeFiles',
    ['copy', 'copyFonts'],
    callback);
});

gulp.task('serve', ['clean'], function (callback) {
  runSequence(
    ['scripts', 'styles'],
    'vulcanizeFiles',
    ['copy', 'copyFonts'],
    'browser-sync',
    callback);
});
