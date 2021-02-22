import legfunc from "../data-entry-component/data-entry-data";

let PairwiseRankingData = {
    legumeFunctions: legfunc,
    male: {
        pairwiseSelection: [],
        totals: [],
    },
    female: {
        pairwiseSelection: [],
        totals: [],
    },
    pairwiseSelection: [],
    totals: [],
};

// Creating all of the potential pairwise functions for each of the entries
let previousidentifiers = [];
for (
    let outerArrayIndex = 0;
    outerArrayIndex < PairwiseRankingData.legumeFunctions.length;
    outerArrayIndex++
) {
    let function1 = PairwiseRankingData.legumeFunctions[outerArrayIndex];
    PairwiseRankingData.totals.push({
        attribute: function1,
        value: 0,
    });

    PairwiseRankingData.male.totals.push({
        attribute: function1,
        value: 0,
    });

    PairwiseRankingData.female.totals.push({
        attribute: function1,
        value: 0,
    });
    for (
        let innerArrayIndex = 0;
        innerArrayIndex < PairwiseRankingData.legumeFunctions.length;
        innerArrayIndex++
    ) {
        let function2 = PairwiseRankingData.legumeFunctions[innerArrayIndex];

        // Checking if the pair is the same
        if (function1 !== function2) {
            let intermediateidentifier = [function1.label, function2.label];
            intermediateidentifier.sort();
            let identifier = intermediateidentifier.join("_");

            if (!previousidentifiers.includes(identifier)) {
                PairwiseRankingData.pairwiseSelection.push({
                    funct1: function1,
                    funct2: function2,
                    identifier: identifier,
                    value: "",
                });

                PairwiseRankingData.male.pairwiseSelection.push({
                    funct1: function1,
                    funct2: function2,
                    identifier: identifier,
                    value: "",
                });

                PairwiseRankingData.female.pairwiseSelection.push({
                    funct1: function1,
                    funct2: function2,
                    identifier: identifier,
                    value: "",
                });
                previousidentifiers.push(identifier);
            }
        }
    }
}
console.log(PairwiseRankingData);
export default PairwiseRankingData;

// Returning all of the potential combinations using a nested map function. Remember that flatmap returns an unnested list
/*PairwiseRankingData.pairwiseScores.individual.push(
    legumeFunctions.flatMap((item, i, arr) => {
        return arr.flatMap((subitem) => {
            if (item != subitem) {
                return {
                    item1: item,
                    item2: subitem,
                    value: {},
                };
            } else {
                return [];
            }
        });
    })
);*/
