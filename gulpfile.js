const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();

// Задача для старта сервера из папки app
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "./app/"
    }
  })
});

gulp.task('default', gulp.parallel('server'));