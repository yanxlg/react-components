const gulp = require("gulp");
require('./gulpfile');

const metadata = { task: "pub" };
// Gulp >= 4.0.0 (doesn't support events)
const taskInstance = gulp.task("pub");
if (taskInstance === undefined) {
    gulp.emit('task_not_found', metadata);
    return;
}
const start = process.hrtime();
gulp.emit('task_start', metadata);
try {
    taskInstance.apply(gulp);
    metadata.hrDuration = process.hrtime(start);
    gulp.emit('task_stop', metadata);
    gulp.emit('stop');
} catch (err) {
    err.hrDuration = process.hrtime(start);
    err.task = metadata.task;
    gulp.emit('task_err', err);
}