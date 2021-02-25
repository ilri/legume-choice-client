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

const legumesData = {
    allLegumes: allLegumes,
    legumeTypes: legumeTypes,
    sources: sources,
};

export { legumesData };
