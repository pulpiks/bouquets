const debug = require("debug")("service");

import STAGE_PROCESSING from "./constants";

export default class Service {
    public stage: STAGE_PROCESSING = STAGE_PROCESSING.Formaulas;
    public neededBouquets: Object = {};
    public resultBouquets: string[] = [];
    public flowers: Object = {
        L: {},
        S: {},
    };
    public line: string;

    constructor() {
    }

    public processInput(line: string) {
        this.line = line;

        if (this.line.length === 0 || !this.line.trim()) {
            this.stage = STAGE_PROCESSING.Flower;
            return ;
        }
        try {
            if (this.stage === STAGE_PROCESSING.Formaulas) {
                this.analyzeBouquetSpec(this.line);
            } else {
                if (this.isAvailableBouquetsExisted()) {
                    this.collectFlowers(this.line);
                    this.analyzePossibilityToMakeTheBouquet();
                }
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    public isAvailableBouquetsExisted() {
        /*
        * check if we have available bouquets to make it
        * */
        return Object.keys(this.neededBouquets).filter((size) => {
            return Object.keys(this.neededBouquets[size]).length > 0;
        });
    }

    public showCreatedBouquet(design: string, size: string, flowers: {}) {
        //output looks like: AL10r5t8d7l

        const flowersPart = Object.keys(flowers).reduce((str, species) => {
            return str + species + flowers[species];
        }, "");
        this.resultBouquets.push(design + size + flowersPart);
        return this.resultBouquets[this.resultBouquets.length - 1];
    }

    public countFlowers(flowers) {
        let count: number = 0;
        Object.values(flowers).forEach((c: number) => {
            count += c;
        });
        return count;
    }

    public removeFlowers(storage, flowers) {
        Object
            .entries(flowers)
            .forEach(([species, count]: [string, number]) => {
                // console.log(flowers, storage, '+', storage[species], count, species, JSON.stringify(storage[species]));
                storage[species] -= count;
            });
    }

    public takeRestFlowers(n, size) {
        let takenCount = 0;
        const resultFlowers = {};
        while (takenCount !== n) {
            Object
                .entries(this.flowers[size])
                .map(([species, count]) => {
                    if (count > 0 && takenCount < n) {
                        // console.log('this.flowers[size] = ', this.flowers[size]);
                        // console.log('*****', ' ', count, ' ', n, ' ', takenCount, ' ', species);
                        const curCount = (count >= n) ? n : count;
                        takenCount += curCount;
                        // console.log('-', this.flowers[size][species], takenCount);
                        this.flowers[size][species] -= curCount;
                        resultFlowers[species] = curCount;
                    }
                });
        }
        return resultFlowers;
    }

    public isBasicFlowersEnough(flowersObject, size) {
        const missingFlowers = Object.keys(flowersObject).filter((key) => {
            // console.log('this.flowers[size][key] = '+this.flowers[size][key]);
            return (typeof(this.flowers[size][key]) === "undefined") || (flowersObject[key] > this.flowers[size][key]);
        });
        // console.log('isBasicFlowersEnough = ',missingFlowers.length === 0, this.flowers[size], flowersObject);
        return missingFlowers.length === 0;
    }

    public analyzePossibilityToMakeTheBouquet() {
        const sortedDesignsBouquets = Object.keys(this.neededBouquets);
        for (const k of sortedDesignsBouquets) {
            const size = this.neededBouquets[k].size;
            const bouquets = Object.entries(this.neededBouquets[k].flowers);
            const missingFlowers = bouquets.filter(([type, count]) => {
                return this.flowers[size][type] < count;
            });
            if (missingFlowers.length === 0) {
                const totalAmountOfFlowers = this.neededBouquets[k].totalAmountOfFlowers;
                const countFlowersInBouquets = this.countFlowers(this.neededBouquets[k].flowers);
                const countFlowersInStorage = this.countFlowers(this.flowers[size]);
                const countRestFlowers = totalAmountOfFlowers - countFlowersInBouquets;
                if  (
                    ( countFlowersInStorage >= totalAmountOfFlowers ) &&
                    ( totalAmountOfFlowers >= countFlowersInBouquets ) &&
                    ( this.isBasicFlowersEnough(this.neededBouquets[k].flowers, size) )
                    ) {
                        this.removeFlowers(this.flowers[size], this.neededBouquets[k].flowers);
                        const finalObject = { ...this.neededBouquets[k].flowers };
                        const restFlowers = this.takeRestFlowers(countRestFlowers, size);

                        Object.keys(restFlowers).reduce((finalObject, species) => {
                            if (typeof(finalObject[species]) !== "undefined") {
                                finalObject[species] += restFlowers[species];
                            } else {
                                finalObject[species] = restFlowers[species];
                            }
                            return finalObject;
                        }, finalObject);

                        console.log(this.showCreatedBouquet(this.neededBouquets[k].design, size, finalObject));

                        this.neededBouquets[k] = null;
                        delete this.neededBouquets[k];
                }
            }
        }
    }

    public collectFlowers(formulaFlower) {
        debugger;
        if (formulaFlower.length !== 2) {
            return ;
        }
        const [species, size] = formulaFlower.match(/^[a-z]|[A-Z]$/g);
        if (typeof(this.flowers[size][species]) === "undefined") {
            this.flowers[size][species] = 0;
        }
        this.flowers[size][species] += 1;
    }

    public getTotalAmountFlowers(formula) {
        return +formula.match(/\d+$/);
    }

    public analyzeBouquetSpec(formula) {
        //AS3a4b6k20
        const flowersInfo = formula.match(/\d+[a-z]/g);
        const bouquetInfo = formula.match(/[A-Z][A-Z]/g)[0];
        const totalAmountOfFlowers = this.getTotalAmountFlowers(formula);
        const design = bouquetInfo[0];
        if (typeof(this.neededBouquets[formula]) === "undefined") {
            this.neededBouquets[formula] = {
                count: 1,
                totalAmountOfFlowers,
                design,
            };
        } else {
            this.neededBouquets[formula].count += 1;
        }

        this.neededBouquets[formula].size = bouquetInfo[1];
        this.neededBouquets[formula].flowers = {};
        for (const flower of flowersInfo) {
            const [number, type] = flower.match(/^[0-9]+|[a-z]/g);
            this.neededBouquets[formula].flowers[type] = parseInt(number, 10);
        }
        debug(this.neededBouquets);
    }

}

// function sortBouquetsByNumberOfFlowers() {
//     const sortedBouques = Object.keys(neededBouquets).sort((bouquet1, bouquet2) =>
//         neededBouquets[bouquet1].totalAmountOfFlowers - neededBouquets[bouquet2].totalAmountOfFlowers
//     );
//     return sortedBouques;
// }
