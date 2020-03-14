var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var gulpCopy = require('gulp-copy');

var inline = require('gulp-inline');
var minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
var template = require('gulp-template');
const htmlmin = require('gulp-htmlmin');
var base64 = require('gulp-base64-inline');
var replace = require('gulp-replace');

var fs = require('fs');

var workingDir = "./obj/";
var outputDir = "./bld/";
const keyFile = "keys.json";

gulp.task('minhtml', () => {
    return gulp.src(outputDir + '*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('inline', function() {
    return gulp.src(workingDir + '*.html')
        .pipe(inline({
            base: workingDir,
            js: minify({
                ext: {
                    min: '.js'
                },
                noSource: true
            }),
            css: [minifyCss]
        }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('css', function() {
    return gulp.src(workingDir + 'style.css')
        .pipe(replace('url(', 'inline('))
        .pipe(base64())
        .pipe(gulp.dest(workingDir));
});


gulp.task('pack-js', function() {
    var key = JSON.parse(fs.readFileSync(keyFile));

    return gulp.src(['appinsights.js', 'script.js'])
        .pipe(concat('script.js'))
        .pipe(template(key))
        .pipe(gulp.dest(workingDir));
});

gulp.task('copy', function() {
    var options = {};

    return gulp
        .src(['*.html', '*.png', '*.css', '*.svg'])
        .pipe(gulpCopy(workingDir, { prefix: 1 }))
});

gulp.task('default', gulp.series('pack-js', 'copy', 'css', 'inline', 'minhtml'));