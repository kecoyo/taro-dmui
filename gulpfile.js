const gulp = require('gulp');

function buildStyle() {
  return gulp.src(['./src/style/**/*.scss']).pipe(gulp.dest('./lib/style'));
}

exports.buildStyle = buildStyle;

exports.watchStyle = function () {
  gulp.watch(['src/**/*.scss'], gulp.series(buildStyle));
};

exports.default = function () {};
