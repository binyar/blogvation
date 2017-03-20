/**
 * Coder: fmd
 * Date: 2017/3/20
 * Time: 10:29
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gls = require('gulp-live-server'),
    less = require('gulp-less'),
    path = require('path'),
    cssmin = require('gulp-minify-css');
var cssPath = ['less/base/core.less', 'less/components/*.less'],
    jsLibPath = ['js/lib/*.js'],
    jsCommonPath = ['js/base/*.js', 'js/components/*.js'],
    jsAllPath = jsLibPath.concat(jsCommonPath);
/**
 * 服务器启动
 */
gulp.task('serve', function () {
    var server = gls.static('public', 8888);
    server.start();
});
/**
 * js类库
 */
gulp.task('js-lib', function () {
    return gulp.src(jsLibPath)
        .pipe(concat('js-lib.js'))
        .pipe(gulp.dest('public/js'))
});
/**
 * js公共组件库
 */
gulp.task('js-common', function () {
    gulp.watch(jsCommonPath, ['js-common']);
    return gulp.src(jsCommonPath)
        .pipe(concat('js-common.js'))
        .pipe(gulp.dest('public/js'))
});
/**
 * less打包处理
 */
gulp.task('less', function () {
    gulp.watch(cssPath, ['less']);
    return gulp.src(cssPath)
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./public/css'))
});

/**
 * js代码压缩处理
 */
gulp.task('js-ugl', function () {
    return gulp.src(jsAllPath)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
});

/**
 * css代码压缩
 */
gulp.task('less-ugl', function () {
    return gulp.src(cssPath)
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cssmin())
        .pipe(concat('core.min.css'))
        .pipe(gulp.dest('./public/css'))
});

/**
 * 默认执行
 */
gulp.task('default', function () {
    gulp.start('serve', 'js-lib', 'js-common', 'less')
});

/**
 * 代码压缩
 */
gulp.task('pro', function () {
    gulp.start('js-ugl', 'less-ugl')
});