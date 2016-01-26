'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/* Load all gulp tasks from the gulp directory */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

/* Default gulp task builds the app to dist */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
