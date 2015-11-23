'use strict';

var autoprefixer = require('gulp-autoprefixer')
  , browserify   = require('browserify')
  , buffer       = require('vinyl-buffer')
  , fs           = require('fs')
  , gulp         = require('gulp')
  , gulpIf       = require('gulp-if')
  , nodemon      = require('gulp-nodemon')
  , path         = require('path')
  , promise      = require('es6-promise').polyfill()
  , rename       = require('gulp-rename')
  , sass         = require('gulp-sass')
  , source       = require('vinyl-source-stream')
  , uglify       = require('gulp-uglify')
  , reactify     = require('reactify')
/*
 * In vanilla CSS, @import statements do another HTTP request to the server.
 *
 * In Sass, if you're importing a .sass or .scss file, the @import statement will
 * be replaced with the contents of the file being imported. If you're importing a .css
 * file, the @import statement remains intact in the outputted .css file.
 */
function npmModuleImporter(file, prev, done) {

  // Import module if possible
  try {
    var basePath = path.resolve('node_modules', file)
    var pkgInfo = path.join(basePath, 'package.json')
    var info = JSON.parse(fs.readFileSync(pkgInfo))

    // If the package.json doesn't have a `style` field, then find index.css
    var newFilePath = path.join(basePath, info.style || 'index.css')

    // If the imported file is a `.css` file.
    if (path.extname(newFilePath) === '.css') {
      var contents = fs.readFileSync(newFilePath).toString()
      return done({ contents: contents })
    } else {
      return done({ file: newFilePath })
    }

  } catch(e) {
    // If we fail to find/import the module, try finding it in client/ directory
    try {
      var contents = fs.readFileSync(path.resolve('client/sass', file)).toString()
      return done({ contents: contents })
    } catch(e) {
      return done({ file: file })
    }
  }
}


gulp.task('compile-js', function() {
  return browserify('./client/js/index.js')
  .transform(reactify)
  .bundle()
  .pipe(source('scripts.min.js'))
  .pipe(buffer())
  .pipe(gulpIf(process.env.NODE_ENV === 'production', uglify()))
  .pipe(gulp.dest('pub'))
})

gulp.task('compile-sass', function() {
  return gulp.src('./client/sass/index.scss')
    .pipe(sass({ importer: npmModuleImporter, outputStyle: 'compressed' }))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('pub'))
})

gulp.task('compile', ['compile-js', 'compile-sass'])

gulp.task('server', ['compile'], function() {
  gulp.watch('./client/sass/**', ['compile-sass'])
  gulp.watch('./client/js/*.js', ['compile-js'])
  return nodemon(
    { script: 'server'
    , env   : { NODE_ENV: 'development'}
    , watch : ['server/**/*']
    }
  )
})
