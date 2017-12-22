/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const config = require('../gulp.config');

gulp.task('serve', ['nodemon'], () => {
  browserSync({
    proxy: 'http://localhost:5000',
    port: 3000,
  });
});

/*  NODEMON
    ======================================================= */
// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
const BROWSER_SYNC_RELOAD_DELAY = 1500;

gulp.task('nodemon', (cb) => {
  let called = false;

  return nodemon({
    script: config.server.js.entry,
    watch: [
      config.server.js.entry,
      config.server.js.modules,
    ],
  })
  .on('start', () => {
    // ensure start only got called once
    if (!called) { cb(); }
    called = true;
  })
  .on('restart', () => {
    setTimeout(() => {
      browserSync.reload({
        stream: false,
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
});
