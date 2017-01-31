'use strict';

/*global require*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    childProcess = require('child_process'),
    fork = require('child_process').fork,
    runSequence = require('run-sequence');

// ===============================
// GENERAL TASKS

gulp.task('sass', function () {
  gulp.src('sass/app.scss')
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

// ===============================
// BUILD RELATED
gulp.task('clean', function (callback) {
  childProcess.exec('rm -rf ./public', [], function () {
    callback();
  });
});

gulp.task('build', function (callback) {
  runSequence(
    [
      'sass',
    ],
    callback);
});

// ===============================
// WATCH
gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
});

// ===============================
// START
gulp.task('start', function (callback) {
  runSequence(
    'clean',
    'build',
    'watch',
    callback);
});

gulp.task('default', ['start']);
