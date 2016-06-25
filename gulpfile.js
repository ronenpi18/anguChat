var gulp = require('gulp');
var config = require('./gulp.config')();

var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var tsProject = tsc.createProject('tsconfig.json');

var livereload = require('gulp-livereload');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

var gls = require('gulp-live-server');



livereload.listen();
var server = gls.new(['--harmony', 'index.js'], null, false);
server.start();

gulp.task('ts-lint', function() {
	return gulp.src(config.allTs)
		.pipe(tslint())
		.pipe(tslint.report('prose', {
			emitError: false
		}));
});

gulp.task('inject', function() {
	return gulp.src('./app/index.jade')
		.pipe(wiredep())
		.pipe(gulp.dest('./app/'));
});

gulp.task('html', function(){
	gulp.src([config.allJades])
	.pipe(wiredep())
	.pipe(jade())
	.pipe(gulp.dest('./app/'))
	.pipe(livereload());
});

gulp.task('scss', function(){
	gulp.src(['app/app.scss'])
	.pipe(
		inject(
			gulp.src([
				config.allScss,
				'!app/app.scss'
			]),
		  {
				starttag: '/* inject:scss */',
				endTag: '/* endinject */',
				transform: function (filepath){
					return '@import '+ '".'+ filepath.replace('.less', '') +'";';
				}
			}
	))
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./app/css'))
	.pipe(livereload());
});

gulp.task('compile-ts', function() {
	var sourceTsFiles = [
		config.allTs,
		config.typings
	];

	var tsResult = gulp
		.src(sourceTsFiles)
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));

	return tsResult.js
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.tsOutputPath))
		.pipe(livereload());
});

gulp.task('watch', ['ts-lint', 'compile-ts', 'scss', 'inject', 'html'], function() {
	gulp.watch([config.allTs], ['ts-lint', 'compile-ts']);
	gulp.watch([config.allJades], ['html']);
	gulp.watch([config.allScss], ['scss']);
	gulp.watch(['./index.js', './server/**/*.js'], function() {
      server.start.bind(server)();
  });
});

gulp.task('default', ['watch']);
