const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const del = require("del");
const browserSync = require("browser-sync").create();

const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");

const cssFiles = [
  "./src/sass/fonts.sass",
  "./src/sass/animation.sass",
  "./src/sass/nav-main.sass",
  "./src/sass/section-1.sass",
  "./src/sass/section-2.sass",
  "./src/sass/section-3.sass",
  "./src/sass/section-4.sass",
  "./src/sass/section-5.sass",
  "./src/sass/footer.sass",
  "./src/sass/style.sass",
  "./src/sass/address.sass",
];

const cssOutline = ["./src/css/reset.css"];

function styles() {
  return (
    gulp
      .src(cssFiles)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(concat("style.css"))
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 8 versions"],
          cascade: false,
        })
      )
      .pipe(
        cleanCSS({
          level: 2,
        })
      )
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./src/css"))
      .pipe(browserSync.stream())
  );
}

function scripts() {
  return (
    gulp
      .src(jsFiles)
      .pipe(concat("script.js"))
      .pipe(
        uglify({
          toplevel: true,
        })
      )
      .pipe(gulp.dest("./src/js"))
      .pipe(browserSync.stream())
  );
}

function outlinecss() {
  return (
    gulp
      .src(cssOutline)
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });

  gulp.watch("./src/css/reset.css", outlinecss);
  gulp.watch("./src/sass/**/*.sass", styles);

  gulp.watch("./src/*.html").on("change", browserSync.reload);
}

gulp.task("styles", styles);

gulp.task("scripts", scripts);

gulp.task("watch", watch);

gulp.task("public", gulp.series(gulp.parallel(styles, scripts)));

gulp.task("dev", gulp.series("styles", "watch"));
