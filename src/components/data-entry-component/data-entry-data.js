export const legfunc = [
    {
        name: "Food",
        label: "food",
    },
    {
        name: "Feed",
        label: "feed",
    },
    {
        name: "Income",
        label: "income",
    },
    {
        name: "Erosion Control",
        label: "erosion-control",
    },
    {
        name: "Fuel",
        label: "fuel",
    },
    {
        name: "Soil Fertility",
        label: "soil-fertility",
    },
];

export const typologies = [
    {
        name: "Low",
        label: "low",
    },
    {
        name: "Medium",
        label: "med",
    },
    {
        name: "High",
        label: "high",
    },
];

export const participants = [
    {
        name: "Farmer",
        label: "farmer",
    },
    {
        name: "Expert",
        label: "expert",
    },
];

export const attributes = [
    {
        name: "Land",
        label: "land",
    },
    {
        name: "Labour",
        label: "labour",
    },
    {
        name: "Seed",
        label: "seed",
    },
    {
        name: "Inputs and services",
        label: "inp-serv",
    },
    {
        name: "Knowledge and skills",
        label: "knowl-skill",
    },
    {
        name: "Water",
        label: "water",
    },
    {
        name: "Markets",
        label: "markets",
    },
];

let ContextScores = {
    attributes: attributes,
    participants: participants,
    typologies: typologies,
    scores: [],
};

for (
    let attributesIndex = 0;
    attributesIndex < attributes.length;
    attributesIndex++
) {
    // Giving room to add average scores for each attribute
    ContextScores.scores.push({
        scoreType: "average",
        attribute: attributes[attributesIndex],
        score: 0,
    });

    for (
        let participantIndex = 0;
        participantIndex < participants.length;
        participantIndex++
    ) {
        for (
            let typologyIndex = 0;
            typologyIndex < typologies.length;
            typologyIndex++
        ) {
            // Giving room to add individual scores for each entry
            ContextScores.scores.push({
                scoreType: "individual",
                attribute: attributes[attributesIndex],
                participant: participants[participantIndex],
                typology: typologies[typologyIndex],
                score: 0,
            });
        }
    }
}
export { ContextScores };

const newSelections = JSON.parse(JSON.stringify(legfunc));

newSelections.forEach((func, index) => {
    if ([0, 1].includes(index)) {
        func.score = 4;
    }
    if ([2, 3, 4, 5].includes(index)) {
        func.score = 3;
    }
});
const newFarmer = {
    // Setting initial values
    number: 0,
    name: "Jane Bloggs",
    gender: "Female",
    typology: "Medium",
    selections: newSelections,
    total: 0,
};

const matrixdata = {
    farmerAttributes: [
        {
            name: "Number",
            label: "number",
        },
        {
            name: "Name",
            label: "name",
        },
        {
            name: "Gender",
            label: "gender",
        },
        {
            name: "Typology",
            label: "typology",
        },
        {
            name: "Matrix Selections",
            label: "selections",
        },
        {
            name: "Total",
            label: "total",
        },
    ],
    farmers: [],
    legumeFunctions: legfunc,
    blankFarmer: newFarmer,
    typology: typologies,
    gender: [
        {
            name: "Male",
            label: "male",
        },
        {
            name: "Female",
            label: "female",
        },
    ],
};

export { matrixdata };
