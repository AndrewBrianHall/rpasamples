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
var fs = require('fs');
var header = require('gulp-header');
const removeCode = require('gulp-remove-code');

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


gulp.task('pack-js', function() {
    // var key = JSON.parse(fs.readFileSync(keyFile));

    return gulp.src(['unicornname.js'])
        .pipe(removeCode({ production: true }))
        // .pipe(concat('unicornname.js'))
        // .pipe(template(key))
        .pipe(gulp.dest(workingDir));
});

gulp.task('copy', function() {
    var options = {};

    return gulp
        .src(['*.html', '*.png', '*.css'])
        .pipe(gulpCopy(workingDir, { prefix: 1 }))
});

gulp.task('add-text-to-beginning', function() {
    return gulp.src(outputDir + 'main.html')
        .pipe(header('<!-- saved from url=(0016)http://localhost -->'))
        .pipe(gulp.dest(outputDir));
});

gulp.task('remove-code', function() {
    return gulp.src(['unicornname.js'])
        .pipe(removeCode({ production: true }))
        .pipe(gulp.dest(workingDir));
});

gulp.task('default', gulp.series('pack-js', 'copy', 'inline', 'minhtml'));
gulp.task('local', gulp.series('pack-js', 'copy', 'inline', 'minhtml', 'add-text-to-beginning'));