const Service = require('./service');

let bloomonService;

const arr = [
    'AS2a3b4c9',
    '',
    'aS',
    'aS',
    'bS',
    'bS',
    'bS',
    'cS',
    'cS',
    'cS',
    'cS'
];

beforeEach(() => {
    bloomonService = new Service();

    // arr.forEach(function (s) {
    //     bloomonService.processInput(s);
    // });
});


describe('test creating bouquets', () => {
    const testNeededBouquets = {
        'AS2a3b4c9': {
            count: 1,
            totalAmountOfFlowers: 9,
            design: 'A',
            size: 'S',
            flowers: {
                a: 2,
                b: 3,
                c: 4
            }
        }
    };
    test('comparison with cparsed correct structure', () => {
        bloomonService.processInput('AS2a3b4c9');
        console.log(bloomonService.neededBouquets);
        expect(bloomonService.neededBouquets).toEqual(testNeededBouquets);
    });

});
