const gulp = require('gulp');
const minify = require('gulp-minify');
const gulpCopy = require('gulp-copy');
const inline = require('gulp-inline');
const minifyCss = require('gulp-minify-css');
const template = require('gulp-template');
const htmlmin = require('gulp-htmlmin');
const removeCode = require('gulp-remove-code');
const injectString = require('gulp-inject-string');
const fs = require('fs');
const header = require('gulp-header');
const rename = require("gulp-rename");
const imageDataURI = require('gulp-image-inline');
const concat = require('gulp-concat');
const replace = require('gulp-string-replace');

var workingDir = "./obj/";
var outputDir = "./dist/";
const keyFile = "keys.json";

gulp.task('minhtml', () => {
    return gulp.src(workingDir + '*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(workingDir));
});

gulp.task('create-inline-image-css', function() {
    return gulp.src('./images/*')
        .pipe(imageDataURI())
        .pipe(concat('inline-background.css'))
        .pipe(gulp.dest(workingDir));
});

gulp.task('inline', function() {
    return gulp.src([workingDir + '*.html'])
        .pipe(injectString.before('</head>', '<link rel="stylesheet" href="inline-background.css" />'))
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
        .pipe(gulp.dest(workingDir));
});


// gulp.task('prepare', function() {
//     // var key = JSON.parse(fs.readFileSync(keyFile));

//     return gulp.src(['*.js'])
//         .pipe(removeCode({ production: true }))
//         .pipe(gulp.dest(workingDir));
// });

gulp.task('remove-background-urls', function() {
    return gulp.src('*.css')
        .pipe(replace(/background-image: url(.*);/ig, ''))
        .pipe(gulp.dest(workingDir));
});

gulp.task('copy', function() {
    var options = {};

    return gulp
        .src(['*.html', '*.png', '*.css', '*.svg', '*.js'])
        .pipe(removeCode({ production: true }))
        .pipe(gulpCopy(workingDir, { prefix: 1 }));
});

gulp.task('create-local', function() {
    return gulp.src(workingDir + '*.html')
        .pipe(injectString.prepend('<!-- saved from url=(0016)http://localhost -->\x0D\x0A'))
        .pipe(rename('unicornGenerator.html'))
        .pipe(gulp.dest(outputDir + 'local'));
});

gulp.task('create-web', function() {
    return gulp.src(workingDir + '*.html')
        .pipe(injectString.after('<head>', '<link rel="shortcut icon" href="/assets/rocketunicorn.ico">'))
        .pipe(injectString.before('</head>', '<script src=/appinsights.js async></script>'))
        .pipe(gulp.dest(outputDir + 'web'));;
})

gulp.task('inject-local', function() {
    let css = gulp.src(['local.css']);
    return gulp.src(workingDir + 'index.html')
        .pipe(injectString.before('</head>', '<link rel="stylesheet" href="local.css" />'))
        .pipe(gulp.dest(workingDir));
});

gulp.task('web', gulp.series('create-inline-image-css', 'copy', 'remove-background-urls', 'inline', 'minhtml', 'create-web'));
gulp.task('local', gulp.series('create-inline-image-css', 'copy', 'remove-background-urls', 'inline', 'minhtml', 'create-local'));
gulp.task('default', gulp.series('web', 'local'));