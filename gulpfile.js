const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass')


gulp.task('scss', function (callback) {
  return gulp.src('./app//scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css/'));
  callback();
})

gulp.task('watch', function () {
  watch(['./app/*.html', './app/css/**/*.css'], gulp.parallel(browserSync.reload));
});

// Задача для старта сервера из папки app
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "./app/"
    }
  })
});

gulp.task('default', gulp.parallel('server', 'watch'));
