import React from "react";

import "./data-entry-component.css";

import AgroEco from "../agro-ecological-filter-component/agro-ecological-filter";
import ContextScore from "../context-scores-component/context-scores-component";
import ParticipatoryMatrix from "../participatory-matrix-scoring-component/participatory-matrix-scoring";
import PairwiseRanking from "../pairwise-ranking-component/pairwise-ranking-component";

// import Results from "../results-component/results-component";

import AppContext from "../../AppContext";

class DataEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [
                <ContextScore key="contextScore" />,
                <PairwiseRanking key="pairwise" />,
                <ParticipatoryMatrix key="matrix" />,
                <AgroEco key="agroeco" />,
                //<Results key="results" />,
            ],
        };
    }

    renderComponents = () => {};
    render() {
        return (
            <div>
                <h1>Data Entry</h1>
                {/* <AppContext.Provider value={AppContext}> */}
                <div className="data-entry-container">
                    {this.state.components.map((component) => {
                        return component;
                    })}
                    ;
                </div>
                {/* </AppContext.Provider> */}
            </div>
        );
    }
}

DataEntry.contextType = AppContext;

export default DataEntry;
