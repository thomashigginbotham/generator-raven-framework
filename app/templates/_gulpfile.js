'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');<% if (linters) { %>
var htmlhint = require('gulp-htmlhint');
var scsslint = require('gulp-scss-lint');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
<% } %>

gulp.task('sass:dev', function () {
	return sass('./scss/**/*.scss', {style: 'expanded', sourcemap: true})
		.on('error', sass.logError)
		.pipe(sourcemaps.write('maps', {
			includeContent: false,
			sourceRoot: '/scss'
		}))
		.pipe(gulp.dest('css'));
});

gulp.task('sass:dist', function () {
	return sass('scss/**/*.scss', {style: 'compressed', sourcemap: true})
		.on('error', sass.logError)
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('maps', {
			includeContent: false,
			sourceRoot: '/scss'
		}))
		.pipe(gulp.dest('css'));
});

gulp.task('default', ['sass:dist']);

gulp.task('watch', ['sass:dev', 'sass:watch']);

gulp.task('sass:watch', function () {
	gulp.watch('./scss/**/*.scss', ['sass:dev']);
});<% if (linters) { %>

gulp.task('htmlhint', function () {
	return gulp.src('html/**/*.html')
		.pipe(htmlhint('.htmlhintrc'))
		.pipe(htmlhint.failReporter());
});

gulp.task('scss-lint', function () {
	return gulp.src('scss/**/*.scss')
		.pipe(scsslint({
			'config': '.scss-lint.yml'
		}))
		.pipe(scsslint.failReporter());
});

gulp.task('jshint', function () {
	return gulp.src(['gulpfile.js', 'js/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function () {
	return gulp.src(['gulpfile.js', 'js/**/*.js'])
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));

});

gulp.task('lint', ['htmlhint', 'scss-lint', 'jshint', 'jscs']);<% } %>
