// Gulpfile

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css');

var assetsJS = 'assets/scripts/',
	jsSources = {
		'root': assetsJS+'*.js',
		'about': assetsJS+'views/about/*.js',
		'home': assetsJS+'views/home/*.js',
		'menu': assetsJS+'views/menu/*.js',
		'phone': assetsJS+'views/phone/*.js',
		'projects': assetsJS+'views/projects/*.js'
	},
	sassSources = ['assets/styles/styles.scss'],
	outputDir = 'dist';

// Complile SCSS files and Minify CSS files
gulp.task('minify-css', function() {

	// Compile SCSS
	gulp.src(sassSources)
	.pipe(sass({style: 'expanded'}))
		.on('error', gutil.log)
	.pipe(gulp.dest(outputDir+'/styles/output'))
	.on('end', function () {

		// Minify CSS
		gulp.src(outputDir+'/styles/output/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(outputDir+'/styles'));

	});
});

// Minify JS files individually
gulp.task('minify-js', function() {

	gulp.src(jsSources.root)
	.pipe(uglify())
	.pipe(gulp.dest(outputDir+'/scripts'));

	gulp.src(jsSources.about)
	.pipe(uglify())
	.pipe(gulp.dest(outputDir+'/scripts/views/about'));

	gulp.src(jsSources.home)
	.pipe(uglify())
	.pipe(gulp.dest(outputDir+'/scripts/views/home'));

	gulp.src(jsSources.menu)
	.pipe(uglify())
	.pipe(gulp.dest(outputDir+'/scripts/views/menu'));

	gulp.src(jsSources.phone)
	.pipe(uglify())
	.pipe(gulp.dest(outputDir+'/scripts/views/phone'));

	gulp.src(jsSources.projects)
	.pipe(uglify())
	.pipe(gulp.dest(outputDir+'/scripts/views/projects'));
	
});

gulp.task('default', ['minify-css','minify-js']);