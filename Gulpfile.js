var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// make some css
gulp.task('styles', function(){
    gulp.src('./src/theme/default/scss/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./dist/theme/default/css/'))
    .pipe(gulp.dest('./src/theme/default/css/'))
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
});