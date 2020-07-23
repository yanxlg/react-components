const gulp = require('gulp');
const shelljs = require('shelljs');
const pkg = require('./package.json');
const path = require('path');

gulp.task('clean', async done => {
    // shelljs.cd(path.join(process.cwd(),"./src"));
    // let ret = shelljs.exec("find . -name '*.d.ts' -delete").code;
    // if (!ret) {
    //     ret = undefined;
    // }
    // done(ret);
    done();
});

gulp.task(
    'compile',
    gulp.series('clean', done => {
        let ret = shelljs.exec('npm run compile').code;
        if (!ret) {
            ret = undefined;
        }
        done(ret);
    }),
);

// 先获取当前分支，然后提交当前分支，合并到develop分支，合并到master分支

gulp.task(
    'pub',
    gulp.series('compile', done => {
        const { version } = pkg;
        shelljs.cd(process.cwd());
        shelljs.exec(`git add -A`);
        shelljs.exec(`git commit -m "update version"`);
        shelljs.exec('git push');
        shelljs.exec(`git tag ${version}`);
        shelljs.exec(`git push origin ${version}:${version}`);
        shelljs.exec('git push origin master:master');
        done();
    }),
);

gulp.task(
    'replace',
    gulp.series('compile', done => {
        const { version } = pkg;
        shelljs.cd(process.cwd());
        shelljs.exec(`git tag -d ${version}`);
        shelljs.exec(`git push origin :refs/tags/${version}`);
        shelljs.exec(`git add -A`);
        shelljs.exec(`git commit -m "update version"`);
        shelljs.exec('git push');
        shelljs.exec(`git tag ${version}`);
        shelljs.exec(`git push origin ${version}:${version}`);
        shelljs.exec('git push origin master:master');
        done();
    }),
);
