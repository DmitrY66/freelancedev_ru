//Подключаем модули gulp
const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const del = require("del");
const browserSync = require("browser-sync").create();

const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");

//Порядок подключения css файлов
// const cssFiles = ["./src/css/reset.css", "./src/css/style.css"];

//Порядок подключения sass файлов
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

//Порядок подключения отдельных css файлов
const cssOutline = ["./src/css/reset.css"];

//Порядок подключения js файлов
// const jsFiles = ["./src/js/lib.js", "./src/js/main.js"];

//Таск на стили CSS
function styles() {
  //Шаблон для поиска файлов CSS
  //Всей файлы по шаблону './src/css/**/*.css'
  return (
    gulp
      .src(cssFiles)
      //вызываем sourcemaps
      .pipe(sourcemaps.init())
      //компилируем sass
      .pipe(sass())
      //Объединение файлов в один
      .pipe(concat("style.css"))
      //Добавить префиксы
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 8 versions"],
          cascade: false,
        })
      )
      //Минификация CSS
      .pipe(
        cleanCSS({
          level: 2,
        })
      )
      //выходная папка для sourcemaps
      .pipe(sourcemaps.write("./"))
      //Выходная папка для стилей
      .pipe(gulp.dest("./src/css"))
      //обновление страницы без перезагрузки
      .pipe(browserSync.stream())
  );
}

//Таск на скрипты JS
function scripts() {
  //Шаблон для поиска файлов JS
  //Всей файлы по шаблону './src/js/**/*.js'
  return (
    gulp
      .src(jsFiles)
      //Объединение файлов в один
      .pipe(concat("script.js"))
      //Минификация JS
      .pipe(
        uglify({
          toplevel: true,
        })
      )
      //Выходная папка для скриптов
      .pipe(gulp.dest("./src/js"))
      //обновление страницы без перезагрузки
      .pipe(browserSync.stream())
  );
}

//Таск на отдельное обновление страницы без перезагрузки
function outlinecss() {
  return (
    gulp
      .src(cssOutline)
      //обновление страницы без перезагрузки
      .pipe(browserSync.stream())
  );
}

//===============================
//Удалить всё в указанной папке
// function clean() {
//   return del(["folder_name/*"]);
// }
//===============================

//Просматривать файлы
function watch() {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });

  //Следить за CSS  SASS файлами
  gulp.watch("./src/css/reset.css", outlinecss);
  gulp.watch("./src/sass/**/*.sass", styles);

  //Следить за JS файлами
  // gulp.watch("./src/js/**/*.js", scripts);

  //При изменении HTML запустить синхронизацию
  gulp.watch("./src/*.html").on("change", browserSync.reload);
}

//===============================
//Таск вызывающий функцию styles
gulp.task("styles", styles);
//===============================
//Таск вызывающий функцию scripts
gulp.task("scripts", scripts);
//===============================
//Таск для очистки папки folder_name
// gulp.task("del", clean);
//===============================
//Таск для отслеживания изменений
gulp.task("watch", watch);
//===============================
//Таск для удаления файлов в папке folder_name и запуск styles и scripts
// gulp.task("public", gulp.series(clean, gulp.parallel(styles, scripts)));
//Таск для запуска styles и scripts
gulp.task("public", gulp.series(gulp.parallel(styles, scripts)));
//===============================
//Таск запускает таск styles и watch последовательно
gulp.task("dev", gulp.series("styles", "watch"));
//===============================
