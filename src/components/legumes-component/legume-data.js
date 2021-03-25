import { allLegumes } from "./legume-information-clean";

const legumeTypes = [];
const sources = [];
allLegumes.map((legume) => {
    if (!legumeTypes.includes(legume.type)) {
        legumeTypes.push(legume.type);
    }
    if (
        !sources.includes(legume["agroecology-source"]) &&
        legume["agroecology-source"] !== null
    ) {
        sources.push(legume["agroecology-source"]);
    }
});

const newLegume = {
    name: "Sample Legume",
    type: "e.g. Grain legume perennial",
    food: 2,
    feed: 2,
    income: 2,
    "erosion-control": 2,
    fuel: 2,
    "soil-fertility": 2,
    land: 1,
    labour: 2,
    seed: 1,
    "inp-serv": 1,
    "knowl-skill": 2,
    water: 1,
    markets: 2,

    temp: [{ min: 16.0, max: 35.0 }],
    alt: [{ min: 0.0, max: 2000.0 }],
    soilpH: [{ min: 4.5, max: 8.0 }],
    rainfall: [{ min: 530.0, max: 4030.0 }],
    source: "Lexsys",
};

const legumesData = {
    allLegumes: allLegumes,
    legumeTypes: legumeTypes,
    sources: sources,
    newLegume: newLegume,
    blankLegume: newLegume,
    agroEcoData: [
        {
            name: "Rainfall (mm/year)",
            label: "rainfall",
        },
        {
            name: "Temparature (mean °C/month)",
            label: "temp",
        },
        {
            name: "Altitude (average masl)",
            label: "alt",
        },
        {
            name: "Soil pH",
            label: "soilpH",
        },
    ],
    provisionData: [
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
    ],
    requirements: [
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
            name: "Inputs and Services",
            label: "inp-serv",
        },
        {
            name: "Knowledge and Skills",
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
    ],
};

export { legumesData };
