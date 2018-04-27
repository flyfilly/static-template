'use strict';
const gulp        = require("gulp"),
      $           = require("gulp-load-plugins")( ),
      shell       = require("gulp-shell"),
      runSequence = require("run-sequence"),
      htmlmin     = require("gulp-htmlmin"),
      pump        = require("pump");

gulp.task("default", cb => {
  runSequence(
    ['copy','poly-bundle'],
    'minify',
    cb
  );
} );

gulp.task("compress", cb => {
  pump([
    gulp.src('assets/prod/*.js'),
    uglify(),
    gulp.dest('dist')
  ], cb);
});

gulp.task("mk-build", shell.task("mkdir build"));
gulp.task("poly-bundle", shell.task("polymer-bundler assets/components.html > build/assets/components.min.html --strip-comments --inline-scripts --inline-css"));

gulp.task('minify', function() {
  return gulp.src('./build/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));
});

gulp.task( 'copy', function( ) {
  gulp.src( [ 'assets/images/**/*' ] ).pipe( gulp.dest( 'build/assets/images' ) );
  gulp.src( [ 'assets/components.min.html' ] ).pipe( gulp.dest( 'build/assets/' ) );
  gulp.src( [ 'index.html', 'manifest.json', 'service-worker.js' ] ).pipe( gulp.dest( 'build/' ) );
} );