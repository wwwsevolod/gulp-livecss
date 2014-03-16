var through = require('through2');
var gutil = require('gulp-util');

var notFirstTime = {};

module.exports = function(opts) {
    var url = opts.url;
    var livecss = opts.server;
    var insteadUrl = url + opts.instead;
    return through.obj(function (file, enc, cb) {
        if (!(file.relative in notFirstTime) || file.stat.mtime >= +new Date() - 5000) {
            var fullUrl = gutil.replaceExtension(url + file.relative, opts.extension);
            livecss.addToInitialListOfReplacings(fullUrl, insteadUrl);
            livecss.notify(fullUrl, insteadUrl);
        }
        notFirstTime[file.relative] = true;
        this.push(file);
        cb();
    });
};
