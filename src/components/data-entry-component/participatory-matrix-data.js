import legfunc from "./legumefunctions";
import { typologies } from "./context-scores-data";

const newSelections = legfunc;
newSelections.map((func) => {
    func.score = 0;
});
const newFarmer = {
    number: 0,
    name: "",
    gender: "",
    typology: "",
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
