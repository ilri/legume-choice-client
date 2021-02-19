import allLegumes from "./legume-all-initial";

const legumeTypes = [];
const sources = [];
allLegumes.map((legume) => {
    if (!legumeTypes.includes(legume.type)) {
        legumeTypes.push(legume.type);
    }
    if (!sources.includes(legume.source) && legume.source !== null) {
        sources.push(legume.source);
    }
});

const legumesData = {
    allLegumes: allLegumes,
    legumeTypes: legumeTypes,
    sources: sources,
};

export default legumesData;
