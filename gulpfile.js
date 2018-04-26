var gulp = require('gulp');

// gulp plugin 호출
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    fileInclude = require('gulp-file-include');

 
var src = 'resources/src';
var dist = 'resources';
var paths = {
  commonjs : src + '/js/*.js',
  scss : src + '/scss/common-ui.scss',
  scssAll : src + '/scss/*.scss',
  includeHtml : src + '/lottopang/html/*.html'
};



/* JS TASK(S) */
gulp.task('js_common_concat', function() {
  return gulp.src(paths.commonjs)
    .pipe(concat('common-ui.js'))
    .pipe(gulp.dest(dist + '/js'))
    .pipe(uglify())
    .pipe(rename('common-ui.min.js'))
    .pipe(gulp.dest(dist + '/js'))
});
/* JS TASK(E) */

/* SASS TASK(S) */
var scssOptions = {
  outputStyle: 'expanded', //values : nested, expanded, compact, compressed
  indentType: 'space',
  indentWidth: 4, //outpusStyle이 nested, expanded인 경우 사용
  precision: 6 //컴파일된 css 소수점 자리수
};

gulp.task('scss_compile', function() {
    return gulp.src(paths.scss)
      .pipe(sourcemaps.init())
      .pipe(scss(scssOptions).on('error', scss.logError))
      .pipe(sourcemaps.write('sourcemaps')) 
      .pipe(gulp.dest(dist + '/css'))
});
/* SASS TASK(E) */


/* HTML INCLUDE TASK(S) */
gulp.task('html_include',function(){
    return gulp.src(paths.includeHtml)
      .pipe(fileInclude({
        prefix: '@@',
        basepath: './resources/src/include'
      }))
    .pipe(gulp.dest(dist + '/html'));

});
/* HTML INCLUDE TASK(E) */



gulp.task('watch', function() {
  gulp.watch(paths.commonjs, ['js_common_concat']);
  gulp.watch(paths.funcjs, ['js_func_concat']);
  gulp.watch(paths.scssAll, ['scss_compile']);
  gulp.watch(paths.includeHtml, ['html_include']);
});

gulp.task('default', ['js_common_concat','scss_compile','html_include', 'watch']);

