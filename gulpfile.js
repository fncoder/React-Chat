const gulp            = require('gulp');
const sass            = require('gulp-sass');
const autoprefixer    = require('gulp-autoprefixer');
const concat          = require('gulp-concat');
const cssmin          = require('gulp-cssmin');
const uglify          = require('gulp-uglify');
const babel           = require('gulp-babel');
const rename          = require('gulp-rename');
const browserify      = require('gulp-browserify');

gulp.task('default', ['sass','css-build','js-build','htmls']);

gulp.task('sass', ()=>{
  return gulp.src(['src/sass/app.scss'])
  .pipe(concat('app.css'))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('src/stylesheets'));
});


gulp.task('css-build', ()=>{
  return gulp.src('src/stylesheets/app.css')
  .pipe(gulp.dest('build/stylesheets'))
  .pipe(rename({suffix: '.min'}))
  .pipe(cssmin())
  .pipe(gulp.dest('build/stylesheets'))
});


gulp.task('js-build', ()=>{
  return gulp.src('src/js/components/app.js')
  .pipe(concat('bundle.js'))
  .pipe(browserify({
    transform: ['babelify']
  }))
  .pipe(gulp.dest('src/js'))
  .pipe(gulp.dest('build/js'))
  .pipe(concat('bundle.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
});


gulp.task('build-scripts', ()=>{
  return gulp.src('src/js/components/*.js')
  .pipe(babel())
  .pipe(gulp.dest('build/js/components'))
  .pipe(rename({suffix: '.min'}))
  .pipe(babel())
  .pipe(uglify())
  .pipe(gulp.dest('build/js/components'))
});


gulp.task('htmls', ()=>{
  return gulp.src('src/*.html')
  .pipe(gulp.dest('build'))
});


gulp.task('watch', ['server','sass','css-build','js-build','htmls'], ()=>{
  gulp.watch(['src/sass/app.scss'], ['sass'])
  gulp.watch('src/stylesheets/*.css', ['css-build'])
  gulp.watch('src/js/components/*.js', ['js-build','build-scripts'])
  gulp.watch('src/*.html', ['htmls'])
});
