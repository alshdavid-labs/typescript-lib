const tsConfig = require('./tsconfig.json')
const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const tsProject = ts.createProject('tsconfig.json');
const resolveTsconfig = require('./gulp/resolve-tsconfig')

const copyFiles = () => {
  return gulp.src('src/**/*.!(spec.ts|spec.tsx|ts|tsx)')
    .pipe(gulp.dest('./'));
}

const buildTypeScript = () => {
  const results = gulp.src('src/**/!(*.spec)*.?(ts|tsx)')
    .pipe(resolveTsconfig(tsConfig.compilerOptions))
    .pipe(tsProject())
  return merge([
    results.dts.pipe(gulp.dest('./')),
    results.js.pipe(gulp.dest('./'))
  ])
}

const buildTypeScriptSpecs = () => {
  return gulp.src('src/**/*.spec.?(ts|tsx)')
    .pipe(resolveTsconfig(tsConfig.compilerOptions))
    .pipe(tsProject())
}

exports.build = gulp.series(copyFiles, buildTypeScript, buildTypeScriptSpecs)
exports.watch = () => gulp.watch(['src/**/*.*'], gulp.series(buildTypeScript, buildTypeScriptSpecs, copyFiles))
