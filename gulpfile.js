/* globals process, require */
"use strict";
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const spawn = require('child_process').spawn;
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const runSequence = require('run-sequence');
const ts = require('gulp-typescript');
// const gzip = require('gulp-gzip');

const tsServerProject = ts.createProject('tsconfig.json');

const paths = {
    src: 'src/@(server|shared)/**/*.{js,jsx}',
    destServer: 'out',
    clientDest: 'dist'
};

gulp.task('clean-server', () => {
    return del(paths.destServer);
});

gulp.task('clean-client', () => {
    return del(paths.clientDest);
});

gulp.task('clean-all', [ 'clean-server', 'clean-client' ]);

gulp.task('clean-build-all', (cb) => {
    runSequence('clean-all', 'build-all', cb);
});

gulp.task('clean-build-client', (cb) => {
    runSequence('clean-client', 'build-client', cb);
});

gulp.task('clean-build-server', (cb) => {
    runSequence('clean-server', 'build-server', cb);
});

gulp.task('build-all', ['build-server', 'build-client']);

// build server
gulp.task('build-server', () => {
    return tsServerProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsServerProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.destServer));
});

gulp.task('build-client', () => {
    return webpackStream(require('./webpack.config.js'), webpack)
        .pipe(gulp.dest(paths.clientDest));
});

// Development mode. rebuild and restart server on file changed.
gulp.task('dev-server', [ 'server'], () => {
    return gulp.watch(paths.src, [ 'server']);
});

// Start Express server
let node;
gulp.task('server', ['build-server'], () => {
    if (node) {
        node.kill();
        node = null;
    }

    node = spawn('node', [ 'out/server/index.js' ], { stdio: 'inherit' });

    node.on('close', (code) => {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill();
});