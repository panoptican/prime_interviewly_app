var gulp = require('gulp'),
    gutil = require('gulp-util');

gulp.task('default', ['copy'], function(){
    gutil.log('gulp ran');
});

gulp.task('copy', function(){
    gulp.src(['node_modules/angular/angular.min.js','node_modules/angular-animate/angular-animate.min.js', 'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-material/angular-material.min.js', 'node_modules/angular-material/angular-material.min.css'])
        .pipe(gulp.dest('client/vendor'));
    gulp.src(['server/app/app.js'])
        .pipe(gulp.dest('client/app/assets/js'));
});