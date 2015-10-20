var gulp = require('gulp');
var sourceMaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var vulcanize = require('gulp-vulcanize');
var browserSync = require('browser-sync').create();


var scriptFiles = ['bower_components/webcomponentsjs/webcomponents.min.js', 'bower_components/jquery/dist/jquery.min.js', 'app/js/*.js'];
var styleFiles  = ['app/css/*.css'];
var components  = ['bower_components/google-map/google-map.html'];
var htmlFiles   = ['app/*.html'];


gulp.task('clean', function(){
  return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('scriptTask', function () {
  return gulp.src(scriptFiles) //get all js files under the src
      .pipe(sourceMaps.init()) //initialize source mapping
      .pipe(babel()) //transpile
      .pipe(concat('scripts.js'))
      .pipe(sourceMaps.write('.')) //write source maps
      .pipe(gulp.dest('dist/js/')); //pipe to the destination folder
});

gulp.task('styles', function() {
  return gulp.src(styleFiles) //get all js files under the src
      .pipe(sourceMaps.init()) //initialize source mapping
      .pipe(concatCss('style.css'))
      .pipe(sourceMaps.write('.')) //write source maps
      .pipe(gulp.dest('dist/css/')); //pipe to the destination folder
});

gulp.task('copy', function () {
  return gulp.src(htmlFiles)
      .pipe(gulp.dest('dist'));
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
gulp.task('js-watch', ['scriptTask'], browserSync.reload);
gulp.task('css-watch', ['styles'], browserSync.reload);
gulp.task('html-watch', ['copy'], browserSync.reload);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch(htmlFiles, ['html-watch']);
    gulp.watch(styleFiles, ['css-watch']);
    gulp.watch(scriptFiles, ['js-watch']);
});

gulp.task('serve', ['clean'], function (callback) {
  runSequence(
    ['scriptTask', 'styles'],
    'vulcanizeFiles',
    'copy',
    'browser-sync',
    callback);
});
