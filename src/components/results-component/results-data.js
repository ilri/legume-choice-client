import {
    legfunc,
    attributes,
    biofilters,
} from "../data-entry-component/data-entry-data";
import _ from "lodash";

// data on all of the legumes initially

// go through the legume functions, and average matrix score and pairwise ranking score
const functionFitForm = [];
let legfuncCopy = _.cloneDeep(legfunc);
legfuncCopy.forEach((legumefunction) => {
    functionFitForm.push({
        legumeFunction: legumefunction,
        score: 0,
    });
});

// simply pass through the context scores
const contextFitForm = [];
let attributesCopy = _.cloneDeep(attributes);
attributesCopy.forEach((attribute) => {
    contextFitForm.push({
        attribute: attribute,
        score: 0,
    });
});

// Adding all of the attributes to the initial legumes
// For each component we have to add an averageScore and an overall rank
// For the final summary, we are only presenting the ranks
let legumeResultsToAdd = {
    functionFit: [],
    contextFit: [],
    agroEcoFit: [],
};

// Adding legume function scores to each legume
attributesCopy.map((attribute) => {
    legumeResultsToAdd.contextFit.push({
        attribute: attribute,
        score: 0,
    });
});
legumeResultsToAdd.contextFit.push({
    overallFit: 0,
});
legumeResultsToAdd.contextFit.push({
    overallRank: 1,
});

// Adding context scores to each legume
legfuncCopy.map((legfunction) => {
    legumeResultsToAdd.functionFit.push({
        legumeFunction: legfunction,
        score: 0,
    });
});
legumeResultsToAdd.functionFit.push({
    overallFit: 0,
});
legumeResultsToAdd.functionFit.push({
    overallRank: 1,
});

// Adding agroEco scores to each legume
const agroEcoCopy = _.cloneDeep(biofilters);

agroEcoCopy.map((agroecofiltter) => {
    legumeResultsToAdd.agroEcoFit.push({
        agroEcoFilter: agroecofiltter,
        score: 0,
    });
});
legumeResultsToAdd.agroEcoFit.push({
    overallFit: 0,
});
legumeResultsToAdd.agroEcoFit.push({
    overallRank: 1,
});

const agroEcoFilters = [];

const biofiltersCopy = _.cloneDeep(biofilters);
const biofiltersCleaned = [];
biofiltersCopy.map((biofilter) => {
    biofiltersCleaned.push({
        name: biofilter.name,
        label: biofilter.label,
    });
});

// Compiling all of the results data together
const resultsData = {
    legumeFunctions: legfuncCopy,
    attributes: attributes,
    agroEcoFilters: biofiltersCleaned,
    agroEcoFitSummary: agroEcoCopy,

    functionFitSummary: functionFitForm,
    contextFitSummary: contextFitForm,
    emptyScoresForLegume: legumeResultsToAdd,
    legumes: [],
    formFilled: false,
};

export { resultsData };
