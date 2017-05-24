/**
 * Coder: fmd
 * Date: 2017/3/20
 * Time: 10:29
 */
const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gls = require('gulp-live-server'),
    less = require('gulp-less'),
    path = require('path'),
    cssmin = require('gulp-minify-css');
const cssPath = ['less/base/core.less', 'less/components/*.less', 'less/view/*.less'],
    jsLibPath = ['js/lib/*.js'],
    jsCommonPath = ['js/base/*.js', 'js/components/*.js', 'js/plugin/*.js'],
    jsAppPath = ['js/app/*.js'];

const jsDest = 'public/js';
const cssDest = './public/css';

const jsDevConfig = {
    modules: [{
        src: jsLibPath,
        rename: 'js-lib.js',
        concat: true
    }, {
        src: jsCommonPath,
        rename: 'js-common.js',
        concat: true
    }, {
        src: jsAppPath,
        concat: false
    }],
    uglify: false,
    watch: true
};

const cssDevConfig = {
    modules: [{
        src: cssPath,
        rename: 'main.css'
    }],
    uglify: false,
    watch: true
};

const jsProConfig = Object.assign({}, jsDevConfig, {
    uglify: true,
    watch: false
});
const cssProConfig = Object.assign({}, cssDevConfig, {
    uglify: true,
    watch: false
});

const buildJs = (config) => {
    config.modules.forEach((module) => {
        const bundle = () => {
            // 基础拼接
            let stream;
            if (module.concat) {
                stream = gulp
                    .src(module.src)
                    .pipe(concat(module.rename));
            } else {
                stream = gulp
                    .src(module.src);
            }
            // 是否压缩
            if (config.uglify) {
                stream.pipe(uglify());
            }
            stream.pipe(gulp.dest(jsDest));
        };

        // 是否监听变动
        if (config.watch) {
            gulp.watch(module.src, () => bundle());
        }
        bundle();
    });
};

const buildCss = (config) => {
    config.modules.forEach((module) => {
        const bundle = () => {
            // 基础拼接
            let stream = gulp
                .src(module.src)
                .pipe(less({
                    paths: [path.join(__dirname, 'less', 'includes')]
                }))
                .pipe(concat(module.rename));

            // 是否压缩
            if (config.uglify) {
                stream.pipe(cssmin());
            }
            stream.pipe(gulp.dest(cssDest));
        };
        // 是否监听变动
        if (config.watch) {
            gulp.watch(module.src, () => bundle());
        }
        bundle();
    });
};

/**
 * 服务器启动
 */
gulp.task('serve', function () {
    const server = gls.static('/', 8888);
    server.start();
});

gulp.task('dev', () => {
    buildJs(jsDevConfig);
    buildCss(cssDevConfig);
});

gulp.task('proc', () => {
    buildJs(jsProConfig);
    buildCss(cssProConfig);
});