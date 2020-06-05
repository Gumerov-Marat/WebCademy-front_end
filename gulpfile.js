const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');

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
