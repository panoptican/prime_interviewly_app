var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

gulp.task('default', ['copy-images', 'copy-angular', 'build-css', 'jade-partials', 'build-app'], function(){
    gutil.log('Gulp ran');
});

gulp.task('copy-images', function() {
    return gulp.src('./server/app/assets/img/**.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./client/app/assets/img'))
});

gulp.task('copy-angular', function() {
    return gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/angular-material/angular-material.min.css',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-messages/angular-messages.min.js'])
        .pipe(gulp.dest('client/app/assets/vendor'));
});

gulp.task('build-app', function() {
    return gulp.src(['./server/app/app.js', './server/app/views/partials/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./client/app/assets/js'))
});

gulp.task('build-css', function() {
    return gulp.src('./server/app/assets/css/**.css')
        .pipe(sourcemaps.init())
        .pipe(concat('styles.min.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./client/app/assets/css'))
});

gulp.task('jade-partials', function() {
   return gulp.src('./server/app/views/partials/**/*.jade')
       .pipe(jade())
       .pipe(gulp.dest('./client/app/views/partials'))
});