/*
	1.less编译、压缩、合并 
	2.js合并、压缩、混淆
	3.img复制
	4.html压缩
*/

var gulp = require('gulp');
//1.less编译、压缩、合并 
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var sourcemaps=require('gulp-sourcemaps');
gulp.task('style', function() {
	gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.stream());
});

//2.js合并、压缩混淆
gulp.task('script', function() {
	gulp.src('src/scripts/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('all.js'))
		.pipe(uglify())
		 .pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/script'))
		.pipe(browserSync.stream()); 
});

//3.img复制
gulp.task('image', function() {
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.stream());
});

//4.html压缩
gulp.task('htmlmin', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

// Static server
gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
	/*browserSync({
		server: true
	}, function(err, bs) {
		console.log(bs.options.getIn(["urls", "local"]));
	});*/
	gulp.watch('src/styles/*.less', ['style']);
	gulp.watch('src/scripts/*.js', ['script']);
	gulp.watch('src/images/*.*', ['image']);
	gulp.watch('src/*.html', ['htmlmin']);
	 

	/*browserSync.watch("./dist/*.*", function(event, file) {
		console.log('ddds');
		if (event === "change") {
			console.log(file);

			browserSync.reload();
		}
	});*/

	//bs.watch("*.html").on("change", bs.reload);
});