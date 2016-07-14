'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var del = require('del');
var pump = require('pump');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var processhtml = require('gulp-processhtml');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var open = require('gulp-open');<% if (linters) { %>
var htmlhint = require('gulp-htmlhint');
var scsslint = require('gulp-scss-lint');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
<% } %>

var config = {
	port: 9090
};

var compileHtml = function (opts) {
	var dest = (opts.environment === 'dist') ? 'dist' : '.tmp';

	return gulp.src('app/*.html')
		.pipe(processhtml(opts))
		.pipe(gulp.dest(dest));
};

var compileSass = function (opts, env) {
	var dest = (env === 'dist') ? 'dist/css' : '.tmp/css';

	return sass('app/scss/**/*.scss', opts)
		.on('error', sass.logError)
		.pipe(gulpif(env === 'dist', rename({
			suffix: '.min'
		})))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest));
};

// Tasks
gulp.task('clean:dev', function () {
	return del(['.tmp']);
});

gulp.task('clean:dist', function () {
	return del(['.tmp', 'dist']);
});

gulp.task('copy:dist', ['clean:dist'], function () {
	gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	gulp.src(['app/*.{png,ico,svg}', 'app/browserconfig.xml', 'app/manifest.json'])
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['html:watch', 'sass:watch', 'js:watch']);

gulp.task('html:watch', ['clean:dev'], function () {
	compileHtml({
		environment: 'dev',
		recursive: true
	}).pipe(connect.reload());

	gulp.watch(['app/*.html', 'app/templates/**/*.html'], ['processhtml:dev']);
});

gulp.task('sass:watch', ['clean:dev'], function () {
	compileSass({
		style: 'expanded',
		sourcemap: true
	}).pipe(connect.reload());

	gulp.watch('app/scss/**/*.scss', ['sass:dev']);
});

gulp.task('js:watch', function () {
	gulp.watch('app/js/**/*', function () {
		gulp.src('app/js/**/*')
			.pipe(connect.reload());
	});
});

gulp.task('processhtml:dev', function () {
	compileHtml({
		environment: 'dev',
		recursive: true
	}).pipe(connect.reload());
});

gulp.task('processhtml:dist', ['clean:dist'], function () {
	compileHtml({
		environment: 'dist',
		recursive: true
	});
});

gulp.task('sass:dev', function () {
	compileSass({
		style: 'expanded',
		sourcemap: true
	}).pipe(connect.reload());
});

gulp.task('sass:dist', ['clean:dist'], function () {
	compileSass({
		style: 'compressed',
		sourcemap: true
	}, 'dist');
});

gulp.task('uglify:dist', ['clean:dist'], function (cb) {
	pump([
		gulp.src('app/js/**/*.js'),
		sourcemaps.init(),
		uglify(),
		rename({
			suffix: '.min'
		}),
		sourcemaps.write('./'),
		gulp.dest('dist/js')
	], cb);
});

gulp.task('imagemin:dist', ['clean:dist'], function () {
	gulp.src('app/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
});

gulp.task('open:dev', ['connect:dev'], function () {
	gulp.src(__filename)
		.pipe(open({uri: 'http://localhost:' + config.port}));
});

gulp.task('connect:dev', ['clean:dev'], function () {
	connect.server({
		root: ['.tmp', 'app'],
		port: config.port,
		livereload: true
	});
});<% if (linters) { %>

gulp.task('htmlhint', function () {
	return gulp.src('app/**/*.html')
		.pipe(htmlhint('.htmlhintrc'))
		.pipe(htmlhint.failReporter());
});

gulp.task('scss-lint', function () {
	return gulp.src('app/scss/**/*.scss')
		.pipe(scsslint({
			'config': '.scss-lint.yml'
		}))
		.pipe(scsslint.failReporter());
});

gulp.task('jshint', function () {
	return gulp.src(['gulpfile.js', 'app/js/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function () {
	return gulp.src(['gulpfile.js', 'app/js/**/*.js'])
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));

});<% } %>

// Use the default task to create a "dist" directory with optimized files
gulp.task('default', ['copy:dist', 'sass:dist', 'uglify:dist', 'processhtml:dist', 'imagemin:dist']);

// Use the "serve" task to start a local server with live reload support
gulp.task('serve', ['open:dev', 'watch']);<% if (linters) { %>

// The "lint" task verifies your code follows a standard syntax
gulp.task('lint', ['htmlhint', 'scss-lint', 'jshint', 'jscs']);<% } %>
