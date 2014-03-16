#Gulp module for [livecss]() css update server

Gulp module, to automate updates of css in browser via [Livecss](https://github.com/wwwsevolod/livecss)

### Example
```js
    var gulp = require('gulp'),
        stylus = require('gulp-stylus'),
        concat = require('gulp-concat'),
        changed = require('gulp-changed'),
        prefixer = require('gulp-autoprefixer'),
        livecssStream = require('gulp-livecss'),
        getLiveCssServer = require('livecss');


    var styles = [
        './css/*.styl'
    ];

    var stylesCompiled = './static/';
    var stylesCompiledSelector = stylesCompiled + '*.css';

    gulp.task('build-css', function() {
        return gulp.src(styles)
            .pipe(changed(stylesCompiled, {
                extension: '.css'
            }))
            .pipe(stylus())
            .on('error', console.log)
            .pipe(prefixer())
            .pipe(gulp.dest(stylesCompiled))
    });

    gulp.task('concat-css', ['build-css'], function() {
        return gulp.src(stylesCompiledSelector)
            .pipe(concat('stylesheet.css'))
            .pipe(gulp.dest(stylesCompiled + 'compiled/'))
            .pipe(notify('CSS build finished'));
    });

    gulp.task('notify-browser', function() {
        var server = getLiveCssServer(4343);
        return gulp.src(stylesCompiledSelector)
            .pipe(livecssStream({
                url: '/static/',
                instead: 'compiled/stylesheet.css',
                server: server,
                extension: '.css'
            }));
    });

    gulp.task('watch', function() {
        var server = getLiveCssServer(4343);
        gulp.watch(stylesCompiledSelector, ['notify-browser']);
        gulp.watch(styles, ['concat-css']);
    });

    gulp.task('build', ['concat-css']);
    gulp.task('build-dev', ['concat-css', 'notify-browser', 'watch']);
```

If you want to update your styles from browser – you can use Chrome Workspaces, and work on not parsed files, so you can use variables, mixins and everything that your css preprocessor provide, in Source tab of develooper tools, automatically rebuild with gulp and sync changes with browser – is this awesome? Awesome!!
