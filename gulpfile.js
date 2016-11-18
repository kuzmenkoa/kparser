'use strict';

var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	sourcemaps   = require('gulp-sourcemaps'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	rigger       = require('gulp-rigger');

gulp.task('css-libs', function() {
	return gulp.src([
			'node_modules/normalize.css/normalize.css',
			'node_modules/font-awesome/css/font-awesome.min.css'
		])
		.pipe(concat('libs.css'))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('sass', function() {
	return gulp.src('app/sass/main.sass')
		.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer(['last 15 versions'], {cascade: true}))
			.pipe(cssnano())
			.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
	return gulp.src('app/js/**/*.js')
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function() {
	return gulp.src([
			'node_modules/font-awesome/fonts/*.*'
		])
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('push', function() {
	return gulp.src('app/index.html')
		.pipe(rigger())
		.pipe(gulp.dest('dist'));
});

gulp.task('init', [
	'clean', 'css-libs', 'js', 'sass', 'fonts', 'clear', 'img', 'push'
]);

gulp.task('watch', function() {
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/js/*.js', ['js']);
	gulp.watch('app/img/**/*', ['img']);
	gulp.watch('app/**/*.html', ['push']);
});

gulp.task('default', ['init', 'watch']);