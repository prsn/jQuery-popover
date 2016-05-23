var gulp = require('gulp');
var src = 'src/';
var dest = './';
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    return gulp.src(src + 'scripts/*.js')
    	.pipe(rename('simple-popover.js'))
        .pipe(gulp.dest(dest));
});
gulp.task('styles', function() {
    return gulp.src(src + 'styles/*.css')
    	.pipe(rename('simple-popover.css'))
        .pipe(gulp.dest(dest));
});


gulp.task('watch', function() {
   // Watch .js files
  gulp.watch(src + 'scripts/*.js', ['scripts']);
  // Watch css files
  gulp.watch(src + 'styles/*.css', ['styles']);
 });
 // Default Task
gulp.task('default', ['scripts', 'styles', 'watch']);