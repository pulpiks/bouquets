const service = require('./service');

process.stdin.setEncoding('utf8');

const bloomonService = new service();

process.stdin.pipe(require('split')())
    .on('data', (line) => {
        bloomonService.processInput(line);
    })
    .on('end', () => {
        console.log('end');
    });