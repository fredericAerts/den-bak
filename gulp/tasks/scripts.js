/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const cached = require('gulp-cached');
const babel = require('gulp-babel');
const remember = require('gulp-remember');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const config = require('../gulp.config');

gulp.task('scripts', () => gulp.src([
  ...config.src.js.vendor,
  config.src.js.utilities,
  config.src.js.app,
  config.src.js.entry,
])
.pipe(cached())
.pipe(babel({
  presets: ['es2015'],
  compact: true,
}))
.pipe(remember())
.pipe(concat('script.js'))
.pipe(rename({ suffix: '.min' }))
.pipe(uglify())
.pipe(gulp.dest(config.dest.js)));
