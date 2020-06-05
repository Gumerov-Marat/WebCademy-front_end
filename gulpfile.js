const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');


// Таск для компиляции SCSS в CSS
gulp.task('scss', function(callback) {
  return gulp.src('./app/scss/main.scss')
  .pipe( plumber({
      errorHandler: notify.onError(function (err) {
        return {
            title: 'Styles',
            sound: false,
            message: err.message
        }
      })
  }))
		.pipe( sourceMaps.init() )
		.pipe( sass() )
		.pipe( autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}) )
		.pipe( sourceMaps.write() )
		.pipe( gulp.dest('./app/css/') )
	callback();
});

// Слежение за HTML и CSS и обновление браузера
gulp.task('watch', function() {
	// Слежение за HTML и CSS и обновление браузера
	watch(['./app/*.html', './app/css/**/*.css'], gulp.parallel( browserSync.reload ));

	// Слежение за SCSS и компиляция в CSS - обычный способ
	// watch('./app/scss/**/*.scss', gulp.parallel('scss'));

	// Запуск слежения и компиляции SCSS с задержкой, для жесктих дисков HDD
	watch('./app/scss/**/*.scss', function(){
		setTimeout( gulp.parallel('scss'), 1000 )
	})

});

// Задача для старта сервера из папки app
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./app/"
		}
	})
});

// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
gulp.task('default', gulp.parallel('server', 'watch', 'scss'));
