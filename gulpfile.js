const gulp = require('gulp')

gulp.task('first', function (callback) {
  console.log("Hello from first task")
  callback();
})

gulp.task('second', function (callback) {
  console.log("Hello from second task")
  callback();
})

gulp.task('default', gulp.parallel('first', 'second')) 