import { typologies, legfunc } from "../data-entry-component/data-entry-data";

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

const MatrixData = {
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
    summary: {
        scoreTypes: [],
        scoresIndividual: [],
    },
};

legfunc.forEach((legumefunction) => {
    MatrixData.summary.scoresIndividual.push({
        legumeFunction: legumefunction,
        scores: [
            {
                name: "Total",
                label: "total",
                score: 0,
            },
            {
                name: "Score (0-5)",
                label: "score",
                score: 0,
            },
            {
                name: "Average Rank",
                label: "rank",
                score: 0,
            },
        ],
    });
});

legfunc.forEach((legumefunction, index) => {
    MatrixData.gender.map((gender) => {
        MatrixData.summary.scoresIndividual[index].scores.push({
            name: gender.name + " (0-5)",
            label: gender.label,
            type: "gender",
            score: 0,
        });
    });
    MatrixData.typology.map((typology) => {
        MatrixData.summary.scoresIndividual[index].scores.push({
            name: typology.name + " (0-5)",
            label: typology.name,
            type: "typology",
            score: 0,
        });
    });
});

MatrixData.summary.scoreTypes = MatrixData.summary.scoresIndividual[0].scores;

export { MatrixData };
