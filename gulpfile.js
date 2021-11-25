let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var ggf = require('gulp-google-fonts');

gulp.task('fonts', function () {
    return gulp.src('fonts.config').pipe(ggf()).pipe(gulp.dest('app/fonts'));
});
gulp.task('sync', done => {

    browserSync.init({
        server: {
            baseDir: './app',
            index: "index.html"
        },
        reloadDelay: 100,
        notify: false

    });

    gulp.watch(["./app/scss/*.scss", "./app/scss/bootstrap/*.scss", "./app/scss/bootstrap/forms/*.scss", "./app/scss/bootstrap/mixins/*.scss", "./app/*.html", "./app/js/*.js", "./app/img/*.+(png|jpg|gif|svg)"], {depth: 10}).on('change', function(fileUrl){

        console.log(fileUrl);


        gulp.src('app/scss/*.scss')
            .pipe(sass())
            .pipe(cssnano())
            .pipe(gulp.dest('./app/css'))
            .pipe(browserSync.reload({
                stream: true
            }));

        gulp.src('app/*.html')
            .pipe(browserSync.reload({
                stream: true
            }));

    });
    done();
});