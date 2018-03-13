const debug = require('debug')('service');

class Service {
    constructor() {
        this.isBouquetsStream = true;
        this.neededBouquets = {};
        this.flowers = {
            'L': {

            },
            'S': {

            }
        };
    }

    processInput(line) {
        this.line = line;
        if (this.line.length === 0 || !this.line.trim()) {
            this.isBouquetsStream = false;
            return ;
        }
        if (this.isBouquetsStream) {
            this.analyzeBouquetSpec(this.line);
        }
        else {
            this.collectFlowers(this.line);
            this.analyzePossibilityToMakeTheBouquet();
        }
    }

    showCreatedBouquet(design, size, flowers) {
        //output looks like: AL10r5t8d7l
        const flowersPart = flowers.reduce((str, typeAndCount) => {
            return str + typeAndCount.join('');
        }, '');
        return design + size + flowersPart;
    }


    countFlowers(flowers) {
        let count = 0;
        Object.values(flowers).forEach((flower) => {
            count += flower[1];
        });
        return count;
    }

    removeFlowers(storage, flowers) {
        Object
            .entries(flowers)
            .forEach(([species, count]) => {
                storage[species] -= count;
            })
    }

    analyzePossibilityToMakeTheBouquet() {
        const sortedDesignsBouquets = Object.keys(this.neededBouquets);
        for (let k of sortedDesignsBouquets) {
            let size = this.neededBouquets[k]['size'];
            let bouquets = Object.entries(this.neededBouquets[k]['flowers']);
            let missingFlowers = bouquets.filter(([type, count]) => {
                return this.flowers[size][type] < count;
            });
            if (missingFlowers.length === 0) {
                let restFlowers = this.neededBouquets[k]['totalAmountOfFlowers'];
                let countFlowersInBouquets = this.countFlowers(bouquets);
                let countFlowersInStorage = this.countFlowers(Object.entries(flowers[size]));

                if ( restFlowers === countFlowersInBouquets || countFlowersInBouquets <= countFlowersInStorage ) {
                    console.log(this.showCreatedBouquet(this.neededBouquets[k]['design'], size, bouquets));
                    this.removeFlowers(this.flowers[size], this.neededBouquets[k]['flowers']);
                    this.neededBouquets[k] = null;
                    delete this.neededBouquets[k];
                }
            }
        }
    }

    collectFlowers(formulaFlower) {
        if (formulaFlower.length !== 2) {
            return ;
        }
        const [species, size] = formulaFlower.match(/^[a-z]|[A-Z]$/g);
        if (typeof(this.flowers[size][species]) === 'undefined') {
            this.flowers[size][species] = 0;
        }
        this.flowers[size][species] += 1;
    }

    getTotalAmountFlowers(formula) {
        return +formula.match(/\d+$/);
    }

    analyzeBouquetSpec(formula) {
        //AS3a4b6k20
        const flowersInfo = formula.match(/\d+[a-z]/g);
        const bouquetInfo = formula.match(/[A-Z][A-Z]/g)[0];
        const totalAmountOfFlowers = this.getTotalAmountFlowers(formula);
        console.log(totalAmountOfFlowers);
        const design = bouquetInfo[0];
        if (typeof(this.neededBouquets[formula]) === 'undefined') {
            this.neededBouquets[formula] = {
                count: 1,
                totalAmountOfFlowers: totalAmountOfFlowers,
                design: design
            };
        }
        else {
            this.neededBouquets[formula]['count'] += 1;
        }

        this.neededBouquets[formula]['size'] = bouquetInfo[1];
        this.neededBouquets[formula]['flowers'] = {};
        for(let flower of flowersInfo) {
            const [number, type] = flower.match(/^[0-9]+|[a-z]/g);
            this.neededBouquets[formula]['flowers'][type] = parseInt(number,10);
        }
        debug(this.neededBouquets);
    }

}

module.exports = Service;



// function sortBouquetsByNumberOfFlowers() {
//     const sortedBouques = Object.keys(neededBouquets).sort((bouquet1, bouquet2) =>
//         neededBouquets[bouquet1].totalAmountOfFlowers - neededBouquets[bouquet2].totalAmountOfFlowers
//     );
//     return sortedBouques;
// }
