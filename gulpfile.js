var gulp = require('gulp'),
    concat = require('gulp-concat'),
    notifier = require('node-notifier'),
    server = require('http-server'),
    compass = require('gulp-compass'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
    
// 定義路徑
var path = {
    'source': './source/',
    'bower': './bower_components/',
    'css': './source/stylesheets/',
    'img': './source/images/',
    'public': './public/'
}

// 連結連結 webserver 跟 livereload
gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true,
        port: 8888
    });
});

// 合併套件js
gulp.task('jsLib', function() {
    gulp.src([
            path.bower + 'jquery/dist/jquery.min.js',
            path.bower + 'tether/dist/js/tether.min.js',
            path.bower + 'bootstrap/dist/js/bootstrap.min.js',
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(path.public + 'js'));
});

// 編譯Compass
gulp.task('compass', function() {
    return gulp.src(['./source/sass/'])
        .pipe(compass({
            config_file: './config.rb' // ** 注意：這裡必需額外加入config.rb **
        }))
        .on('error', function() {
            notifier.notify({ 'title': 'Gulp', 'message': 'sass Error' });
        });

});

// 複製 Html 到 Public 資料夾
gulp.task('html', function() {
    gulp.src(['./source/**/**.html'])
        .pipe(gulp.dest(path.public))
});

gulp.task('js', function() {
    gulp.src(['./source/js/**.js'])
        .pipe(gulp.dest(path.public + 'js'))
});

gulp.task('css', function() {
    gulp.src(['./source/sass/**.css'])
        .pipe(gulp.dest(path.public + 'stylesheets'))
});

// 監聽資料夾事件
gulp.task('watch', function() {
    watch('./source/sass/**/*.sass', batch(function(events, done) {
        gulp.start('compass', done);
    }));
    watch('./source/**/**.html', batch(function(events, done) {
        gulp.start('html', done);
    }));
    watch('./source/js/**/**.js', batch(function(events, done) {
        gulp.start('js', done);
    }));
    watch('./source/sass/**/**.css', batch(function(events, done) {
        gulp.start('css', done);
    }));
    watch(['./**/*.html','./**/*.css','./**/*.js'], { cwd: 'public' }, reload)
});

//瀏覽器重整
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "public"
        }
    });
});

gulp.task('default', ['jsLib', 'compass', 'html','js','css', 'connect', 'browser-sync', 'watch']);
