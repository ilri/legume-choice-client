import React, { Component } from "react";
import PairwiseRankingData from "./pairwise-ranking-data";

class PairwiseRanking extends Component {
    constructor(props) {
        super(props);

        this.state = PairwiseRankingData;
    }

    componentDidMount() {
        //console.log(this.state.pairwiseScores.individual);
    }

    render() {
        return (
            <div>
                <h2>Pairwise Component Ranking</h2>
            </div>
        );
    }
}

export default PairwiseRanking;
