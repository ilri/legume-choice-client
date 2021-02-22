import React from "react";

import "./data-entry-component.css";

import AgroEco from "../agro-ecological-filter-component/agro-ecological-filter";
import ContextScore from "../context-scores-component/context-scores-component";
import ParticipatoryMatrix from "../participatory-matrix-scoring-component/participatory-matrix-scoring";
import PairwiseRanking from "../pairwise-ranking-component/pairwise-ranking-component";

import Results from "../results-component/results-component";

class DataEntry extends React.Component {
    render() {
        return (
            <div>
                <h1>Data Entry</h1>
                <div className="data-entry-container">
                    <ContextScore />
                    <PairwiseRanking />
                    <ParticipatoryMatrix />
                    <AgroEco />
                    <Results />
                </div>
            </div>
        );
    }
}

export default DataEntry;
