var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', ['copy'], function(){
    gutil.log('Gulp ran.');
});

gulp.task('copy', function(){
    gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular-animate/angular-animate.min.js', 'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-material/angular-material.min.js', 'node_modules/angular-material/angular-material.min.css', 'node_modules/angular-route/angular-route.min.js'])
        .pipe(gulp.dest('server/app/assets/vendor'));
});