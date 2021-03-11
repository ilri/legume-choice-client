import React from "react";
import { ContextScoreData } from "./context-scores-data";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

import _ from "lodash";

import "./context-scores-component.css";

import AppContext from "../../AppContext";

class ContextScore extends React.Component {
    //static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = ContextScoreData;

        this.handleChange = this.handleChange.bind(this);
        this.changeIndividualScores = this.changeIndividualScores.bind(this);
        this.changeAverages = this.changeAverages.bind(this);
        this.averageAttribute = this.averageAttribute.bind(this);
        this.renderRowAverage = this.renderRowAverage.bind(this);
        this.renderDefaultValue = this.renderDefaultValue.bind(this);
        this.contextRow = this.contextRow.bind(this);
        this.allRows = this.allRows.bind(this);
        this.tableHeader = this.tableHeader.bind(this);
        this.renderRadarChart = this.renderRadarChart.bind(this);
    }

    componentDidMount() {
        //console.log("Component did mount!");

        if (this.context.currentProject.contextScores !== undefined) {
            let newState = _.cloneDeep(
                this.context.currentProject.contextScores
            );
            this.setState(newState);
            // console.log("Set state with old context");
        }
        if (this.context.currentProject.contextScores === undefined) {
            let newContext = _.cloneDeep(this.state);
            this.context.currentProject.contextScores = newContext;
            // console.log("Set context with new state");
        }
    }

    componentDidUpdate() {
        let newContext = _.cloneDeep(this.state);
        this.context.currentProject.contextScores = newContext;

        console.log(this.context.currentProject);

        console.log(this.state);
    }

    renderRadarChart = () => {
        const avergeScores = {};
        const scoreLabels = {};
        this.state.scores.forEach((score) => {
            if (score.scoreType === "average") {
                avergeScores[score.attribute.label] = score.score / 4;
                scoreLabels[score.attribute.label] = score.attribute.name;
            }
        });

        const radarData = [
            {
                data: avergeScores,
                meta: {
                    class: "radar-style",
                    color: "green",
                },
            },
        ];

        const noSmoothing = (points) => {
            let d =
                "M" + points[0][0].toFixed(4) + "," + points[0][1].toFixed(4);
            for (let i = 1; i < points.length; i++) {
                d +=
                    "L" +
                    points[i][0].toFixed(4) +
                    "," +
                    points[i][1].toFixed(4);
            }
            return d + "z";
        };

        const defaultOptions = {
            size: 200,
            axes: true, // show axes?
            scales: 5, // show scale circles?
            captions: true, // show captions?
            captionMargin: 10,
            dots: true, // show dots?
            zoomDistance: 1.2, // where on the axes are the captions?
            setViewBox: (options) =>
                `-${options.captionMargin} 0 ${
                    options.size + options.captionMargin * 2
                } ${options.size}`, // custom viewBox ?
            smoothing: noSmoothing, // shape smoothing function
            axisProps: () => ({ className: "axis" }),
            scaleProps: () => ({ className: "scale", fill: "none" }),
            shapeProps: () => ({ className: "shape" }),
            captionProps: () => ({
                className: "caption",
                textAnchor: "middle",
                fontSize: 10,
                fontFamily: "sans-serif",
            }),
            dotProps: () => ({
                className: "dot",
                mouseEnter: (dot) => {
                    console.log(dot);
                },
                mouseLeave: (dot) => {
                    console.log(dot);
                },
            }),
        };

        return (
            <div className="radar-container">
                <RadarChart
                    captions={scoreLabels}
                    data={radarData}
                    size={450}
                    options={defaultOptions}
                />
            </div>
        );
    };

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

    // Ensuring that the correct values are preselected in the table
    renderDefaultValue = (props) => {
        {
            // const valueToReturn = this.state.scores.filter((element, index) => {
            //     if (
            //         element.scoreType === "individual" &&
            //         element.attribute === props.attribute &&
            //         element.participant === props.participant &&
            //         element.typology === props.typology
            //     ) {
            //         return true;
            //     }
            // });
            const scores = _.cloneDeep(this.state.scores);
            let valueToReturn = "";
            scores.forEach((score) => {
                if (
                    score.scoreType === "individual" &&
                    score.attribute.label === props.attribute.label &&
                    score.participant.label === props.participant.label &&
                    score.typology.label === props.typology.label
                ) {
                    //console.log("found it: " + score.score);
                    valueToReturn = score.score;
                }
            });

            return valueToReturn;

            // console.log(props);
            // console.log(scores);
            //console.log(this.state.scores);
            //return 999;
            //return valueToReturn[0].score;
        }
    };

    // A function for generating a row in the input table
    contextRow = (props) => {
        const rowAttribute = props.attribute;
        //console.log("---------------Row--------------------");

        return (
            <tr>
                {/* Mapping across the different attributes to return a form to enter score (0-4).
                e.g 
                - Typology-low-> Farmer -> Land score
                - Typology-high -> Expert -> Seed score*/}
                <td>{rowAttribute.name}</td>
                {this.state.typologies.map((rowTypology) => {
                    return this.state.participants.map((rowParticipant) => {
                        const defaultValue = this.renderDefaultValue({
                            typology: rowTypology,
                            participant: rowParticipant,
                            attribute: rowAttribute,
                        });
                        return (
                            <td
                                key={
                                    "table-entry-" +
                                    rowTypology.name +
                                    "-" +
                                    rowParticipant.name +
                                    "-" +
                                    rowAttribute.name
                                }
                            >
                                <FormControl
                                    as="select"
                                    key={props.key}
                                    value={defaultValue}
                                    onChange={(event) =>
                                        this.handleChange(
                                            event,
                                            (props = {
                                                typology: rowTypology,
                                                participant: rowParticipant,
                                                attribute: rowAttribute,
                                            })
                                        )
                                    }
                                    key={
                                        "form-control-" +
                                        rowTypology.name +
                                        "-" +
                                        rowParticipant.name +
                                        "-" +
                                        rowAttribute.name
                                    }
                                >
                                    {[0, 1, 2, 3, 4].map((score) => {
                                        return (
                                            <option
                                                key={
                                                    "form-option-" +
                                                    rowTypology.name +
                                                    "-" +
                                                    rowParticipant.name +
                                                    "-" +
                                                    rowAttribute.name +
                                                    "-" +
                                                    score
                                                }
                                            >
                                                {score}
                                            </option>
                                        );
                                    })}
                                </FormControl>
                            </td>
                        );
                    });
                })}
                {this.renderRowAverage({ attribute: rowAttribute })}
            </tr>
        );
    };

    // Using the contextRow and map functions to generate all of the rows in the table
    allRows = () => {
        if (this.state !== null) {
            // console.log("rendering all rows");
            return this.state.attributes.map((attribute) => {
                return this.contextRow({
                    attribute: attribute,
                    key: "context-row-" + attribute.name,
                });
            });
        } else {
            return <h1>Null State</h1>;
        }
    };

    // Creating the header for the table. This is a split header which accounts for typologies and participants
    tableHeader = () => {
        if (this.state !== null) {
            // console.log("Header rendering");
            return (
                <thead>
                    {/* Adding The typology Headers */}
                    <tr>
                        <th rowSpan="2"></th>
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
                            return this.state.participants.map(
                                (participant) => {
                                    return (
                                        <th
                                            key={
                                                "participant-header" +
                                                participant.name
                                            }
                                        >
                                            {participant.name}
                                        </th>
                                    );
                                }
                            );
                        })}
                    </tr>
                </thead>
            );
        } else {
            return <h1>Null State</h1>;
        }
    };

    render() {
        return (
            <div>
                <h2>Context Scoring</h2>
                <Form>
                    <Table striped bordered hover>
                        {this.tableHeader()}
                        <tbody>{this.allRows()}</tbody>
                    </Table>
                </Form>
                {this.renderRadarChart()}
            </div>
        );
    }
}
ContextScore.contextType = AppContext;

export default ContextScore;
