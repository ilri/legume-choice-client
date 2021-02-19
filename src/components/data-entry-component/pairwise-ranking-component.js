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
        //console.log(this.state);
    }
    componentDidUpdate() {
        //console.log(this.state);
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

        let selectionArr = this.state[props.gender].pairwiseSelection;
        selectionArr.forEach((selectionItem, selectionIndex) => {
            if (
                selectionItem.funct1 === props.funct1 &&
                selectionItem.funct2 === props.funct2
            ) {
                selectionArr[selectionIndex].value = selectedValue;
                //console.log(selectionArr);
            }
        });

        const gender = props.gender;
        this.setState((prevState) => ({
            [gender]: {
                ...prevState[gender],
                pairfemalewiseSelection: selectionArr,
            },
        }));

        this.upDateTotalScore(gender);
    };

    upDateTotalScore = (gender) => {
        const totalsArray = this.state[gender].totals;
        totalsArray.forEach((totalsItem, totalsIndex) => {
            totalsArray[totalsIndex].value = 0;
            this.state[gender].pairwiseSelection.forEach((selectionItem) => {
                if (selectionItem.value === totalsItem.attribute) {
                    totalsArray[totalsIndex].value++;
                }
            });
        });
        this.setState((prevState) => ({
            [gender]: {
                ...prevState[gender],
                totals: totalsArray,
            },
        }));
    };

    pairWiseTable = (props) => {
        const tableGender = props.gender;
        return (
            <Table className="table-style" striped bordered hover>
                <thead>
                    <tr>
                        <th>Pair</th>
                        <th>Selection Female</th>
                        <th>Selection Male</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state[props.gender].pairwiseSelection.map((item) => {
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
                                                gender: "female",
                                            }
                                        ) =>
                                            this.updateSelections(event, props)
                                        }
                                    >
                                        <option value="" selected disabled>
                                            Please select
                                        </option>
                                        <option>{item.funct1.name}</option>
                                        <option>{item.funct2.name}</option>
                                    </Form.Control>
                                </td>
                                <td>
                                    <Form.Control
                                        as="select"
                                        onChange={(
                                            event,

                                            props = {
                                                funct1: item.funct1,
                                                funct2: item.funct2,
                                                gender: "male",
                                            }
                                        ) =>
                                            this.updateSelections(event, props)
                                        }
                                    >
                                        <option value="" selected disabled>
                                            Please select
                                        </option>{" "}
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

    pairWiseResultsTable = (props) => {
        return (
            <Table striped bordered hover className="table-style">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Count Female</th>
                        <th>Count Male</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.legumeFunctions.map((item, index) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{this.state.female.totals[index].value}</td>
                                <td>{this.state.male.totals[index].value}</td>
                            </tr>
                        );
                    })}
                    {/*this.state[props.gender].totals.map((item) => {
                        return (
                            <tr>
                                <td>{item.attribute.name}</td>
                                <td>{item.value}</td>
                            </tr>
                        );
                    })*/}
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
                    <this.pairWiseTable key="pairwise-table" gender="female" />
                    <this.pairWiseResultsTable
                        key="pairwise-results-table"
                        gender="female"
                        className="results-table-pairwise"
                    />
                </div>

                <div className="table-container"></div>
            </div>
        );
    }
}
export default PairwiseRanking;
