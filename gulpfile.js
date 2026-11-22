// Initial modules
const distFileName = "flatify";
const bumpVersionFiles = ["./package.json", "./scss/flatify.scss", "./js/flatify.js"];

const { src, dest, watch, series, parallel } = require("gulp");
const argv = require("yargs").argv;
const autoprefixer = require("autoprefixer");
const babel = require("gulp-babel");
const bump = require("gulp-bump");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const fs = require("fs");
const noop = require("gulp-noop");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
// The SCSS still uses @import and global functions, hide the Dart Sass deprecation noise until it moves to @use.
const sassOptions = { quietDeps: true, silenceDeprecations: ["import", "global-builtin", "slash-div"] };
const semver = require("semver");
const uglify = require("gulp-uglify");
const webpack = require("webpack-stream");

// File path variables
const files = {
  sassFiles: "scss/**/*.scss", // for watch task
  sassMain: "scss/flatify.scss",
  jsMain: "js/**/*js",
};

const { Transform } = require("stream");

// Start a source map for files that do not come from src(), like the webpack output.
const vinylSourcemap = require("vinyl-sourcemap");
const initSourcemaps = () =>
  new Transform({
    objectMode: true,
    transform(file, enc, done) {
      vinylSourcemap.add(file, done);
    },
  });

// Task creators
function sassTask(file, fileName, minify = true, prefixed = true) {
  let postcssPlugins = [];
  if (minify) {
    postcssPlugins.push(cssnano());
  }
  if (prefixed) {
    postcssPlugins.push(autoprefixer());
  }
  return src(file, { sourcemaps: true })
    .pipe(sass(sassOptions))
    .pipe(postcss(postcssPlugins))
    .pipe(
      rename((file) => {
        if (fileName) {
          file.basename = fileName;
        }
        if (!prefixed) {
          file.basename += "-noprefix";
        }
        if (minify) {
          file.basename += "-min";
        }
      })
    )
    .pipe(dest("dist/css", { sourcemaps: "../maps" }));
}

function jsTask(file, fileName, minify = true, production = true) {
  return src(file)
    .pipe(
      webpack({
        mode: production ? "production" : "development",
        optimization: {
          minimize: minify,
        },
      })
    )
    .pipe(initSourcemaps())
    .pipe(concat(fileName))
    .pipe(
      production
        ? babel({
            presets: ["@babel/env"],
          })
        : noop()
    )
    .pipe(minify ? uglify() : noop())
    .pipe(
      rename((file) => {
        if (minify) {
          file.basename += "-min";
        }
        file.extname = ".js";
      })
    )
    .pipe(dest("dist/js", { sourcemaps: "../maps" }));
}

// calculate the next version
function nextVersion(type = "patch") {
  const pkg = JSON.parse(fs.readFileSync(bumpVersionFiles[0], "utf8"));
  return semver.inc(pkg.version, argv.type || type);
}

// bump version
function bumper(files, type = "patch", value) {
  // command gulp release --ver 1.0.0
  // OR
  // command gulp release --type major | minor | patch | prerelease
  return src(files)
    .pipe(bump({ version: value || argv.ver || nextVersion(type) }))
    .pipe(dest((file) => file.base));
}

// Watch task
function watchTask(filesArr, tasksArr) {
  watch(filesArr, parallel(...tasksArr));
}

// SASS tasks
const mainSassTask__noprefix = () => sassTask(files.sassMain, distFileName, false, false); // dev
const mainSassTask__prefixed = () => sassTask(files.sassMain, distFileName, false, true);
const mainSassTask__minified__noprefix = () => sassTask(files.sassMain, distFileName, true, false);
const mainSassTask__minified__prefixed = () => sassTask(files.sassMain, distFileName, true, true); // production

// JavaScript tasks
const mainJsTask_dev = () => jsTask(files.jsMain, distFileName, false, false);
const mainJsTask_production = () => jsTask(files.jsMain, distFileName, false, true);
const mainJsTask__minified_production = () => jsTask(files.jsMain, distFileName, true, true);

const bumpVersionDefault = () => bumper(bumpVersionFiles, "prerelease");
const bumpVersionRelease = () => bumper(bumpVersionFiles, "patch");

// Old v1 file names, v2 uses one file for both directions.
// These copies keep old import paths working, they will be removed in v3.
const rtlAliases = () =>
  src(["dist/css/flatify.css", "dist/css/flatify-min.css", "dist/css/flatify-noprefix.css", "dist/css/flatify-noprefix-min.css"])
    .pipe(rename((file) => (file.basename = file.basename.replace(/^flatify/, "flatify-rtl"))))
    .pipe(dest("dist/css"));

const build = series(
  // CSS
  mainSassTask__noprefix,
  mainSassTask__prefixed,
  mainSassTask__minified__noprefix,
  mainSassTask__minified__prefixed,
  rtlAliases,
  // JS
  mainJsTask_production,
  mainJsTask__minified_production
);

// Watch
const defaultWatchTasks = () => watchTask([files.sassFiles, files.jsMain], [mainSassTask__noprefix, mainJsTask_dev]);
exports.watch = series(parallel(mainSassTask__noprefix, mainJsTask_dev), defaultWatchTasks);

// Build without touching the version
exports.build = build;
exports.default = build;

// Build and bump the version as prerelease, e.g. 2.0.0 -> 2.0.1-0
exports.prerelease = series(bumpVersionDefault, build);

// Release: bump the version (patch by default, or --type / --ver) and build.
// Commit and tag yourself after checking the changes.
exports.release = series(bumpVersionRelease, build);
