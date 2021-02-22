import React, { Component } from "react";
import ContextScores from "./context-scores-data";
import { Table, Form } from "react-bootstrap";

import "./context-scores-component.css";

import AppContext from "../../AppContext";

class ContextScore extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = ContextScores;
    }

    componentDidMount() {
        //console.log(this.state);
        if (this.context.contextScores !== undefined) {
            const newState = this.context.contextScores;
            this.setState(newState);
        } else {
            const newContext = this.state;
            this.context.contextScores = newContext;
        }
    }

    componentDidUpdate() {
        const newContext = this.state;
        this.context.contextScores = newContext;

        console.log(this.context);

        //console.log(this.state);
    }

    handleChange = (event, props) => {
        props.score = parseInt(event.target.value); // Ensuring that the entered value is an integer
        const scoresArray = this.state.scores;

        this.changeIndividualScores(scoresArray, props);
        this.changeAverages(scoresArray, props);

        this.setState({
            scores: scoresArray,
        });
    };

    // Change individual scores in an array through filtering
    changeIndividualScores = (arr, query) => {
        arr.forEach((element, index) => {
            if (
                element.participant === query.participant &&
                element.attribute === query.attribute &&
                element.typology === query.typology
            ) {
                arr[index].score = query.score;
            }
        });
    };

    changeAverages = (arr) => {
        arr.forEach((element, index) => {
            if (element.scoreType === "average") {
                let average = this.averageAttribute(arr, element.attribute);
                arr[index].score = average;
            }
        });
    };

    // Update Averages after we see a score change
    averageAttribute = (arr, attributetoAverage) => {
        //axisToAverage.forEach((element, index) => {});
        const scores = [];
        arr.forEach((element, index) => {
            if (
                element.attribute === attributetoAverage &&
                element.scoreType === "individual"
            ) {
                scores.push(arr[index].score);
            }
        });

        const total = scores.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
        const average = total / scores.length;
        return average;
    };

    renderRowAverage = (props) => {
        return (
            <td>
                {this.averageAttribute(
                    this.state.scores,
                    props.attribute
                ).toFixed(2)}
            </td>
        );
    };

    renderDefaultValue = (props) => {
        {
            const valueToReturn = this.state.scores.filter((element, index) => {
                if (
                    element.scoreType === "individual" &&
                    element.attribute === props.attribute &&
                    element.participant === props.participant &&
                    element.typology === props.typology
                ) {
                    return true;
                }
            });

            return valueToReturn[0].score;
        }
    };

    // A function for generating a row in the input table
    contextRow = (props) => {
        return (
            <tr key={"row-" + props.attribute.name}>
                <td key={"row-name-" + props.attribute.name}>
                    {props.attribute.name}
                </td>
                {this.state.typologies.map((typology) => {
                    return this.state.participants.map((participant) => {
                        return (
                            <td
                                key={
                                    "table-entry-" +
                                    typology.name +
                                    "-" +
                                    participant.name +
                                    "-" +
                                    props.attribute.name
                                }
                            >
                                <Form.Control
                                    as="select"
                                    defaultValue={this.renderDefaultValue({
                                        typology: typology,
                                        participant: participant,
                                        attribute: props.attribute,
                                    })}
                                    onChange={(event) =>
                                        this.handleChange(
                                            event,
                                            (props = {
                                                typology: typology,
                                                participant: participant,
                                                attribute: props.attribute,
                                            })
                                        )
                                    }
                                    key={
                                        "form-control-" +
                                        typology.name +
                                        "-" +
                                        participant.name +
                                        "-" +
                                        props.attribute.name
                                    }
                                >
                                    {[0, 1, 2, 3, 4].map((score) => {
                                        return (
                                            <option
                                                key={
                                                    "form-option-" +
                                                    typology.name +
                                                    "-" +
                                                    participant.name +
                                                    "-" +
                                                    props.attribute.name +
                                                    "-" +
                                                    score
                                                }
                                            >
                                                {score}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </td>
                        );
                    });
                })}
                <this.renderRowAverage attribute={props.attribute} />
            </tr>
        );
    };

    // Using the contextRow and map functions to generate all of the rows in the table
    allRows = () => {
        return this.state.attributes.map((attribute) => {
            return (
                <this.contextRow
                    attribute={attribute}
                    key={"context-row-" + attribute.name}
                />
            );
        });
    };

    // Creating the header for the table. This is a split header which accounts for typologies and participants
    tableHeader = () => {
        return (
            <thead key="table-header">
                {/* Adding The typology Headers */}
                <tr key="typology-header-row">
                    <th key="blank-column-head" rowSpan="2"></th>
                    {this.state.typologies.map((typology) => {
                        return (
                            <th
                                key={"typology-header" + typology.name}
                                colSpan="2"
                            >
                                Typology - {typology.name}
                            </th>
                        );
                    })}
                    {/* Adding The Average Score Headers */}

                    <th key="average-header" rowSpan="2">
                        Mean Score (0-4)
                    </th>
                </tr>
                {/* Adding The Participant Headers */}
                <tr key="participant-header-row">
                    {this.state.typologies.map((typology) => {
                        return this.state.participants.map((participant) => {
                            return (
                                <th
                                    key={
                                        "participant-header" + participant.name
                                    }
                                >
                                    {participant.name}
                                </th>
                            );
                        });
                    })}
                </tr>
            </thead>
        );
    };

    render() {
        return (
            <div key="context-score-div">
                <h2>Context Scoring</h2>
                <Table striped bordered hover key="table">
                    <this.tableHeader key="all-table-headers" />
                    <tbody key="table-body">
                        <this.allRows key="all-rows" />
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ContextScore;
