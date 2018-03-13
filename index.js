const service = require('./service');

// process.stdin.setEncoding('utf8');
//
// process.stdin.on('readable', () => {
//     const chunk = process.stdin.read();
//     if (chunk !== null) {
//         process.stdout.write(`data: ${chunk}`);
//     }
// });
//
// process.stdin.on('end', () => {
//     process.stdout.write('end');
// });
//
//
// process.stdin.pipe(process.stdout);



// process.stdin.pipe(require('split')())
//     .on('data', processLine)
//     .on('end', finish);

const arr = ['AS3a4b6k7', 'AL10r5t8d30', 'SL9r5t8d30', '',
    'aS',
    'aS',
    'aS',
    'bL',
    'bS',
    'bS',
    'bS',
    'bS',
    'kS',
    'kS',
    'kS',
    'kS',
    'kS',
    'kS',
    'rL',
    'tS',
    'eS',
    'eS',
    'eS',
    'eS',
    'eS',
    'eS',
    'eS',
    'eS'
];


/*
* a S - 3
* b L - 1
* b S - 4
* k S - 6
* r L - 1
* t S - 1
* e S - 8
* */

// L - b r
// S - a b k t e


const bloomonService = new service();


arr.forEach(function (b) {
    bloomonService.processInput(b);
});



module.exports = {

};

// {
//     'AL45f56g30': {
//         'flowers': {
//             'a': 1,
//             'b': 2
//         },
//         'count': 1,
//         'totalAmountOfFlowers': 30
//     },
//     'BL45f56g20': {
//         'flowers': {
//             'a': 1,
//             'b': 2
//         },
//         'count': 1,
//         'totalAmountOfFlowers': 10
//     }
// }

// a: {
//     L:
//     S:
// }

// смотреть по тому кол-ву цветов что нужно, если мало цветов нужно то сразу делать
// если много цветов нужно, то лучше сделать букеты из меньшего количества цветов


// for flowers

// L: {
//     a: 1,
//     b: 1,
//     c: 2
// }
// total: {
//     L: 10,
//     S: 5
// }


// function finish() {
//     console.log('end');
// }
//