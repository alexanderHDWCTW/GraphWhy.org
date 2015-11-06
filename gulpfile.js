/* gulpfile.js */
var gulp = require('gulp');
var browserify = require('browserify');  
var del = require('del');  
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  gulp.src(['./public/client/lib/react.min.js', 
  			'./public/client/lib/react-dom.min.js', 
  			'./public/client/lib/jquery-2.1.4.min.js',
  			'./public/client/lib/d3.js',
  			'./public/client/lib/mui.min.js',
  			'./public/client/lib/browser.min.js',
  			'./public/client/lib/underscore.js'
  			])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/src/'))
  gulp.src(['./public/client/css/index.css',
  			'./public/client/lib/mui.min.css'
  			])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./public/src/'))

});
