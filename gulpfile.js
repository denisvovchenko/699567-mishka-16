'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var del = require('del');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var webp = require('gulp-webp')
var svgstore = require('gulp-svgstore');

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include({encoding: 'utf8'}),
    ]))
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('scripts', function () {
  return gulp.src('source/js/**/*.js')
    .pipe(sourcemap.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(sourcemap.write())
    .pipe(gulp.dest('build/js/'));
});

gulp.task('imagesClean', function () {
  return del('build/img');
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('svg-sprite', function() {
  return gulp.src('source/img/svg/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true,
    }))
    .pipe(rename('sprite.html'))
    .pipe(gulp.dest('source/components'));
})

gulp.task('webp', function() {
  return gulp.src('build/img/**/*.{jpg,png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img/'));
});

gulp.task('clean', function () {
  return del(['build/*', '!build/img']);
});

gulp.task('copy', function() {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'))
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/**/*.html').on('change', gulp.series('html'));
  gulp.watch('source/**/*.js').on('change', gulp.series('scripts'));
});

gulp.task('build', gulp.series('clean', 'html', 'css', 'scripts', 'copy'));
gulp.task('start', gulp.series('build', 'server'));
gulp.task('buildImages', gulp.series('imagesClean', 'images', 'webp'));
