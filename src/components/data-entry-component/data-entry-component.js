import React from "react";

import "./data-entry-component.css";

import AgroEco from "./agro-ecological-filter";
import ContextScore from "./context-scores-component";
import ParticipatoryMatrix from "./participatory-matrix-scoring";
import PairwiseRanking from "./pairwise-ranking-component";

class DataEntry extends React.Component {
    render() {
        return (
            <div>
                <div className="data-entry-container">
                    <ContextScore />
                    <PairwiseRanking />
                    <ParticipatoryMatrix />
                    <AgroEco />
                </div>
            </div>
        );
    }
}

export default DataEntry;
