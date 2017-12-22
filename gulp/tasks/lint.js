/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const config = require('../gulp.config');

gulp.task('lint', () => gulp.src([
  config.gulp.js.all,
  config.server.js.entry,
  config.server.js.modules,
])
.pipe(eslint())
.pipe(eslint.format()));
