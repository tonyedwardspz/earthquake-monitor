var gulp = require('gulp');
var sourceMaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var vulcanize = require('gulp-vulcanize');
var browserSync = require('browser-sync').create();

gulp.task('clean', function(){
  return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('scriptTask', function () {
  return gulp.src('app/js/*.js') //get all js files under the src
      .pipe(sourceMaps.init()) //initialize source mapping
      .pipe(babel()) //transpile
      .pipe(concat('scripts.js'))
      .pipe(sourceMaps.write('.')) //write source maps
      .pipe(gulp.dest('dist/js/')); //pipe to the destination folder
});

gulp.task('styles', function() {
  return gulp.src('app/css/*.css') //get all js files under the src
      .pipe(sourceMaps.init()) //initialize source mapping
      .pipe(concatCss('style.css'))
      .pipe(sourceMaps.write('.')) //write source maps
      .pipe(gulp.dest('dist/css/')); //pipe to the destination folder
});

gulp.task('copy', function () {
  return gulp.src('app/*.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('vulcanizeFiles', function () {
    return gulp.src('bower_components/google-map/google-map.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false
        }))
        .pipe(gulp.dest('dist/components/'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('serve', ['clean'], function (callback) {
  runSequence(
    ['scriptTask', 'styles'],
    'vulcanizeFiles',
    'copy',
    'browser-sync',
    callback);
});
