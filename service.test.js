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
    test('check parsing input data to convenient structure', () => {
        bloomonService.processInput('AS2a3b4c9');
        expect(bloomonService.neededBouquets).toEqual(testNeededBouquets);
    });

    test('create bouquet if the total quantity can be equal than the the sum of the flower quantities', () => {
        bloomonService.processInput('AS2a3b4c9');
        bloomonService.processInput('');
        bloomonService.processInput('aS');
        bloomonService.processInput('aS');
        bloomonService.processInput('bS');
        bloomonService.processInput('bS');
        bloomonService.processInput('bS');
        bloomonService.processInput('cS');
        bloomonService.processInput('cS');
        bloomonService.processInput('cS');
        bloomonService.processInput('cS');
        expect(bloomonService.resultBouquets[bloomonService.resultBouquets.length-1])
            .toEqual('ASa2b3c4');
    });

    test('create bouquet if the total quantity can be bigger than the the sum of the flower quantities', () => {
        bloomonService.processInput('AS2a3b4c10');
        bloomonService.processInput('');
        bloomonService.processInput('aS');
        bloomonService.processInput('aS');
        bloomonService.processInput('bS');
        bloomonService.processInput('bS');
        bloomonService.processInput('bS');
        bloomonService.processInput('cS');
        bloomonService.processInput('cS');
        bloomonService.processInput('cS');
        bloomonService.processInput('cS');
        bloomonService.processInput('dL');
        bloomonService.processInput('eS');
        expect(bloomonService.resultBouquets[bloomonService.resultBouquets.length-1])
            .toEqual('ASa2b3c4e1');
    });
});
