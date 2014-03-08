var gulp         = require('gulp')
  , when         = require('gulp-if')
  , concat       = require('gulp-concat')
  , uglify       = require('gulp-uglify')
  , minifyCss    = require('gulp-minify-css')
  , isProduction = process.argv.indexOf('--production') !== -1
  , paths  = {
      styles: [
        'bower_components/highlightjs/styles/github.css',
        'assets/css/screen.css'
      ],
      scripts: [
        'bower_components/highlightjs/highlight.pack.js',
        'assets/js/jquery.fitvids.js',
        'assets/js/index.js',
      ]
    }
  ;

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(when(isProduction, uglify()))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('assets/build'));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(when(isProduction, minifyCss()))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('assets/build'));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['scripts', 'styles']);
