import React from "react";

import "./data-entry-component.css";

// These are all of the subcomponents used for data-enetry
import AgroEco from "../agro-ecological-filter-component/agro-ecological-filter";
import ContextScore from "../context-scores-component/context-scores-component";
import ParticipatoryMatrix from "../participatory-matrix-scoring-component/participatory-matrix-scoring";
import PairwiseRanking from "../pairwise-ranking-component/pairwise-ranking-component";

import AppContext from "../../AppContext";

/* This component simply calls all of the smaller subcomponents
required for data-entry*/

class DataEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [
                <ContextScore key="contextScore" />,
                <PairwiseRanking key="pairwise" />,
                <ParticipatoryMatrix key="matrix" />,
                <AgroEco key="agroeco" />,
            ],
        };
    }

    componentDidMount() {
        // Ensures the user arrives at the top of the page
        window.scrollTo(0, 0);
    }

    renderComponents = () => {};
    render() {
        return (
            <div>
                <div className="data-entry-container">
                    {/* Renders each of the individual components with a map function */}
                    {this.state.components.map((component) => {
                        return component;
                    })}
                    ;
                </div>
            </div>
        );
    }
}

DataEntry.contextType = AppContext;

export default DataEntry;
