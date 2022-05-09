const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));;
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
// const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
const include = require('gulp-file-include');


function html() {
	return src(['app/*.html', '!app/*.part.html'])
		.pipe(
			include({
				prefix: "@@",
				basepath: "@file",
			})
		)
		.pipe(dest("dist/"))
		.pipe(browserSync.stream());
};


function browsersync() {
	browserSync.init({
		server: { baseDir: 'dist/' },
		notify: false,
		online: true
	});
}

function copyScript() {
	return src('app/js/*.js')
		.pipe(dest('dist/js/'))
}

function scripts() {
	return src([
		'app/library/jQuery/jquery-3.5.0.min.js',
		'app/js/main.js',
	])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js/'))
		.pipe(browserSync.stream());
}

function styles() {
	return src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(concat('main.min.css'))
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ }))
		.pipe(dest('app/css/'))
		.pipe(browserSync.stream());
}

function stylesdev() {
	return src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: false }))
		.pipe(dest('dist/css/'))
		.pipe(browserSync.stream());
}

function images() {
	return src('app/images/**/*')
		.pipe(newer('app/images/**/*'))
		// .pipe(imagemin())
		.pipe(dest('dist/images/'));
}

/* function cleanimg() {
	return del(['app/images/*', '!app/images/src'], { force: true });
} */

function buildcopy() {
	return src([
		// 'app/css/**/*.min.css',
		'app/js/*.js',
		'app/images/**/*',
		'app/fonts/**/*',
		'app/library/**/*',
		'!app/images/src',
		// 'app/*.html',
	], { base: 'app' })
		.pipe(dest('dist/'));
}

function cleandist() {
	return del('dist', { force: true });
}

function startwatch() {
	watch(['app/js/*.js', '!app/js/*.min.js']).on('change', browserSync.reload);
	watch('app/js/*.js', copyScript);
	watch('app/scss/**/*', stylesdev);
	watch('app/*.html', html);
	watch('app/*.html').on('change', browserSync.reload);
	watch('app/images/**/*', images);

}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.stylesdev = stylesdev;
exports.images = images;
// exports.cleanimg = cleanimg;
exports.cleandist = cleandist;
exports.build = series(html, cleandist, styles, scripts, images, buildcopy);

//  Для зразработки
exports.default = parallel(html, stylesdev, buildcopy, browsersync, startwatch);

// Экспортируем дефолтный таск с нужным набором функций
// exports.default = parallel(styles, scripts, browsersync, startwatch);