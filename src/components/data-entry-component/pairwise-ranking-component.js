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
    componentDidUpdate() {
        console.log(this.state);
    }

    updateSelections = (event, props) => {
        if (event.target.value == "") {
            alert("Must not select empty value");
            return;
        }
        // Converting legume function name into legume function item
        let selectedValue = "";

        if (event.target.value === props.funct1.name) {
            selectedValue = props.funct1;
        }
        if (event.target.value === props.funct2.name) {
            selectedValue = props.funct2;
        }

        let selectionArr = this.state.pairwiseSelection;
        selectionArr.forEach((selectionItem, selectionIndex) => {
            if (
                selectionItem.funct1 === props.funct1 &&
                selectionItem.funct2 === props.funct2
            ) {
                selectionArr[selectionIndex].value = selectedValue;
                //console.log(selectionArr);
            }
        });

        this.setState({
            pairwiseSelection: selectionArr,
        });

        this.upDateTotalScore();
    };

    upDateTotalScore = () => {
        const totalsArray = this.state.totals;
        totalsArray.forEach((totalsItem, totalsIndex) => {
            totalsArray[totalsIndex].value = 0;
            this.state.pairwiseSelection.forEach((selectionItem) => {
                if (selectionItem.value === totalsItem.attribute) {
                    totalsArray[totalsIndex].value++;
                }
            });
        });
        this.setState({
            totals: totalsArray,
        });
    };

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
                    {this.state.pairwiseSelection.map((item) => {
                        return (
                            <tr>
                                <td>
                                    {item.funct1.name +
                                        " vs " +
                                        item.funct2.name}
                                </td>
                                <td>
                                    <Form.Control
                                        as="select"
                                        onChange={(
                                            event,
                                            props = {
                                                funct1: item.funct1,
                                                funct2: item.funct2,
                                            }
                                        ) =>
                                            this.updateSelections(event, props)
                                        }
                                    >
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
