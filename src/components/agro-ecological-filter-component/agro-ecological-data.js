import { biofilters } from "../data-entry-component/data-entry-data";
import _ from "lodash";

const biofiltersCopy = _.cloneDeep(biofilters);
const AgroEcoData = {
    biofilters: biofiltersCopy,
};

export { AgroEcoData };
