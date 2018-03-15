var service = require('./service');
process.stdin.setEncoding('utf8');
var bloomonService = new service();
process.stdin.pipe(require('split')())
    .on('data', function (line) {
    bloomonService.processInput(line);
})
    .on('end', function () {
    console.log('end');
});
