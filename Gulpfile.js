var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();


// variables for css build
var cssInput = './src/theme/default/scss/**/*.scss';
var cssOutput = './dist/theme/default/css/';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions']
};


// make some css
gulp.task('styles', function(){
    gulp.src(cssInput)
    .pipe(sass(sassOptions).on('error',sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(cssOutput))
    .pipe(gulp.dest('./src/theme/default/css/'))
    .pipe(browserSync.stream());
});

// variables for html build
var htmlInput = './src/**/*.html';
var htmlOutput = './dist/';

// html changes
gulp.task('markup', function(){
  gulp.src(htmlInput)
  .pipe(gulp.dest(htmlOutput))
  .pipe(browserSync.stream());
});

// watch 
gulp.task('default',function() {

    browserSync.init({
          serveStatic: ['.'],
          serveStaticOptions: {
            extensions: ['html'] // pretty urls
          }
      })
      
    gulp.watch('./src/theme/default/scss/**/*.scss',['styles']);
     gulp.watch('./src/**/*.html',['markup']);
});

// only for release
gulp.task('release', function () {
  // CSS
   gulp
    .src(cssInput)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(cssOutput));
  // Html
  gulp.src(htmlInput)
    .pipe(gulp.dest(htmlOutput))
    .pipe(browserSync.stream());
});