import legfunc, { typologies } from "../data-entry-component/data-entry-data";

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

export default matrixdata;
