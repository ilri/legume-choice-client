import legfunc from "./legumefunctions";
import { typologies } from "./context-scores-data";
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
    ],
    farmers: [],
    legumeFunctions: legfunc,
    typologies,
};

export default matrixdata;
