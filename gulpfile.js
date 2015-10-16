var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade');

gulp.task('default', ['copy', 'jade'], function(){
    gutil.log('gulp ran');
});

gulp.task('copy', function(){
    gulp.src(['node_modules/angular/angular.min.js','node_modules/angular-animate/angular-animate.min.js', 'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-material/angular-material.min.js', 'node_modules/angular-material/angular-material.min.css', 'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-messages/angular-messages.min.js'])
        .pipe(gulp.dest('server/app/assets/vendor'));
});

gulp.task('jade', function(){
   gulp.src(['./server/app/views/partials/**/*.jade'])
       .pipe(jade())
       .pipe(gulp.dest('./server/app/views/partials'))
});