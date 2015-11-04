var gulp = require('gulp');
var sourceMaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync').create();


var scriptFiles = ['bower_components/jquery/dist/jquery.min.js',
                   'bower_components/bootstrap/js/collapse.js',
                   'bower_components/d3/d3.min.js',
                   'bower_components/topojson/topojson.js',
                   'bower_components/datamaps/dist/datamaps.world.min.js',
                   'compiled/*.js'];
var styleFiles  = ['bower_components/bootstrap/dist/css/bootstrap.min.css',
                   'app/css/*.css'];
var htmlFiles   = ['app/*.html'];
var fontFiles   = ['bower_components/bootstrap/dist/fonts/*.*'];


gulp.task('clean', function(){
  return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('scripts',['babel', 'clean'], function () {
  return gulp.src(scriptFiles)
      .pipe(sourceMaps.init())
      .pipe(concat('scripts.js'))
      .pipe(sourceMaps.write('.'))
      .pipe(gulp.dest('dist/js/'));
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
  return gulp.src(fontFiles)
      .pipe(gulp.dest('dist/fonts/'));
});


// Watch tasks
gulp.task('js-watch', ['refresh'], browserSync.reload);
gulp.task('css-watch', ['refresh'], browserSync.reload);
gulp.task('html-watch', ['refresh'], browserSync.reload);

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
});

gulp.task('refresh',function (callback) {
  runSequence(
    ['scripts', 'styles'],
    ['copy', 'copyFonts'],
    callback);
});

gulp.task('serve', ['clean'], function (callback) {
  runSequence(
    ['scripts', 'styles'],
    ['copy', 'copyFonts'],
    'browser-sync',
    callback);
});
