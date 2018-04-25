var gulp = require('gulp');

// gulp plugin 호출
var concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');

var src = 'resources/src';
var dist = 'resources';
var paths = {
  commonjs : src + '/js/*.js',/*
  funcjs : src + '/js/!*.js',*/
  scss : src + '/scss/common-ui.scss',
  scssAll : src + '/scss/*.scss'
};

gulp.task('js_common_concat', function() {
  return gulp.src(paths.commonjs)
    .pipe(concat('common-ui.js'))
    .pipe(gulp.dest(dist + '/js'))
    .pipe(uglify())
    .pipe(rename('common-ui.min.js'))
    .pipe(gulp.dest(dist + '/js'))
});

var scssOptions = {
  outputStyle: 'compact', //values : nested, expanded, compact, compressed
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

gulp.task('watch', function() {
  gulp.watch(paths.commonjs, ['js_common_concat']);
  gulp.watch(paths.funcjs, ['js_func_concat']);
  gulp.watch(paths.scssAll, ['scss_compile']);
});

gulp.task('default', ['js_common_concat', /*'js_func_concat', */'scss_compile', 'watch']);

var fileinclude = require('gulp-file-include'),
  gulp = require('gulp');
 
gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});