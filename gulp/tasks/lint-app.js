/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const config = require('../gulp.config');

gulp.task('lint-app', () => gulp.src([
  config.src.js.app,
  config.spec.all,
])
.pipe(eslint({
  configFile: config.src.js.eslintConfig,
}))
.pipe(eslint.format()));
