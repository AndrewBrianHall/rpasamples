const gulp = require('gulp');
const minify = require('gulp-minify');
const gulpCopy = require('gulp-copy');
const inline = require('gulp-inline');
const inline_download = require('gulp-inline-download');
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
const inlineFonts = require('gulp-inline-fonts');
var download = require("gulp-download-files");
const escapeStringRegexp = require('escape-string-regexp');
const scan = require('gulp-scan');
const merge = require('merge-stream');

var workingDir = "./obj/";
var outputDir = "./dist/";
const keyFile = "keys.json";
const remote_font = "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap";
const local_font_file = "open-sans.css";

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
    const remote_font_to_replace = escapeStringRegexp(remote_font);

    return gulp.src([workingDir + '*.html'])
        .pipe(injectString.before('</head>', '<link rel="stylesheet" href="inline-background.css" />'))
        .pipe(replace(remote_font_to_replace, local_font_file))
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
        .pipe(inline_download({
            uglify: {
                css: {}
            }
        }))
        .pipe(gulp.dest(workingDir));
});



gulp.task('download-top-level-font', function() {
    return download(remote_font)
        .pipe(rename(local_font_file))
        .pipe(gulp.dest(workingDir));
});

gulp.task('download-individual-fonts', function() {
    let stream = merge();

    gulp.src([workingDir + local_font_file])
        .pipe(scan({
            term: /https:\/\/.*\.ttf/ig,
            fn: function(match) {
                stream.add(download(match)
                    .pipe(gulp.dest(workingDir + 'fonts/'))
                );

            }
        }));

    return stream;
});

gulp.task('convert-font-files', function() {
    const fontName = 'Open Sans';

    let downloadedFiles = [
        { weight: 400, file: 'mem8YaGs126MiZpBA-U1Ug.ttf' },
        { weight: 600, file: 'mem5YaGs126MiZpBA-UNirk-VQ.ttf' },
        { weight: 700, file: 'mem5YaGs126MiZpBA-UN7rg-VQ.ttf' }
    ];

    let fontStream = merge();

    downloadedFiles.forEach(function(file) {
        fontStream.add(gulp.src([workingDir + `fonts/${file.file}`])
            .pipe(inlineFonts({ name: `${fontName}`, weight: file.weight, formats: ['ttf'] }))
        );
    });

    return fontStream.pipe(concat(local_font_file))
        .pipe(gulp.dest(workingDir));
});

gulp.task('inline-fonts', gulp.series('download-top-level-font', 'download-individual-fonts', 'convert-font-files'))

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

gulp.task('web', gulp.series('inline-fonts', 'create-inline-image-css', 'copy', 'remove-background-urls', 'inline', 'minhtml', 'create-web'));
gulp.task('local', gulp.series('inline-fonts', 'create-inline-image-css', 'copy', 'remove-background-urls', 'inline', 'minhtml', 'create-local'));
gulp.task('default', gulp.series('web', 'local'));