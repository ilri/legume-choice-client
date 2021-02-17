import React, { Component } from "react";
import PairwiseRankingData from "./pairwise-ranking-data";

import "./pairwise-ranking-component.css";

import { Table, Form } from "react-bootstrap";

class PairwiseRanking extends Component {
    constructor(props) {
        super(props);

        this.state = PairwiseRankingData;
    }

    componentDidMount() {
        console.log(this.state);
    }

    pairWiseTable = () => {
        return (
            <Table className="table-style" striped bordered hover>
                <thead>
                    <tr>
                        <th>Pair</th>
                        <th>Selection</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.pairwiseScores.individual.map((item) => {
                        return (
                            <tr>
                                <td>
                                    {item.funct1.name +
                                        " vs " +
                                        item.funct2.name}
                                </td>
                                <td>
                                    <Form.Control as="select">
                                        <option></option>
                                        <option>{item.funct1.name}</option>
                                        <option>{item.funct2.name}</option>
                                    </Form.Control>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    };

    pairWiseResultsTable = () => {
        return (
            <Table striped bordered hover className="table-style">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.totals.map((item) => {
                        return (
                            <tr>
                                <td>{item.attribute.name}</td>
                                <td>{item.value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    };

    render() {
        return (
            <div>
                <h2>Pairwise Component Ranking</h2>
                <p>
                    Select the most important attribute out of the following
                    pairs
                </p>
                <div className="table-container">
                    <this.pairWiseTable key="pairwise-table" />
                    <this.pairWiseResultsTable key="pairwise-results-table" />
                </div>
            </div>
        );
    }
}

export default PairwiseRanking;
