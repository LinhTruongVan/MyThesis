var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({
        root: 'app',
        port: 8080
    });
});

gulp.task('serve',['connect']);
