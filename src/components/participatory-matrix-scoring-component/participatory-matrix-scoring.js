import React from "react";
import _ from "lodash";

import "./participatory-matrix-scoring.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { MatrixData } from "./participatory-matrix-data";

import AppContext from "../../AppContext";

class ParticipatoryMatrix extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = _.cloneDeep(MatrixData);

        this.addFarmer = this.addFarmer.bind(this);
        this.farmEntryFields = this.farmEntryFields.bind(this);
        this.farmerNameInput = this.farmerNameInput.bind(this);
        this.scoringInput = this.scoringInput.bind(this);
        this.farmerDetailsSelectInput = this.farmerDetailsSelectInput.bind(
            this
        );
        this.updateFarmerScore = this.updateFarmerScore.bind(this);
        this.updateTotal = this.updateTotal.bind(this);
        this.updateFarmerName = this.updateFarmerName.bind(this);
        this.updateFarmerDetailesSelect = this.updateFarmerDetailesSelect.bind(
            this
        );
        this.tableHeader = this.tableHeader.bind(this);
        this.tableRows = this.tableRows.bind(this);
    }

    componentDidMount() {
        if (this.context.participatoryMatrixScores !== undefined) {
            const newState = this.context.participatoryMatrixScores;
            this.setState(newState);
        } else {
            const newContext = this.state;
            this.context.participatoryMatrixScores = newContext;
        }
        //console.log(this.state);
        //this.addFarmer();
    }

    componentDidUpdate() {
        const newContext = this.state;
        this.context.participatoryMatrixScores = newContext;

        //console.log(this.state);
    }

    addFarmer = () => {
        //This is so important to make sure that we are creating a clean copy
        //Deep cloning
        let farmersArray = _.cloneDeep(this.state.farmers);
        let number = farmersArray.length + 1;

        let newfarmertoAdd = _.cloneDeep(this.state.blankFarmer);
        newfarmertoAdd.number = number;

        farmersArray.push(newfarmertoAdd);

        this.setState(
            {
                farmers: farmersArray,
            },
            () => {
                this.updateTotal();
                this.updateFarmerSummary();
            }
        );
    };

    farmEntryFields = (props) => {
        //console.log(props);

        if (props.attribute.label === "selections") {
            return this.scoringInput(props);
        } else {
            if (props.attribute.label === "name") {
                return this.farmerNameInput(props);
            } else {
                return this.farmerDetailsSelectInput(props);
            }
        }
    };

    farmerNameInput = (props) => {
        return (
            <td>
                <FormControl
                    value={props.farmer.name}
                    type="text"
                    onChange={(event) => this.updateFarmerName(event, props)}
                />
            </td>
        );
    };

    scoringInput = (props) => {
        return (
            <td>
                <FormControl
                    defaultValue={props.legumeFunctions.score}
                    type="number"
                    onChange={(event) => this.updateFarmerScore(event, props)}
                />
            </td>
        );
    };

    farmerDetailsSelectInput = (props) => {
        return (
            <td>
                <FormControl
                    as="select"
                    defaultValue={props.farmer[props.attribute.label]}
                    onChange={(event) =>
                        this.updateFarmerDetailesSelect(event, props)
                    }
                >
                    {this.state[props.attribute.label].map((attribute) => {
                        return (
                            <option
                                key={
                                    "form-option-" +
                                    props.attribute.label +
                                    "-" +
                                    props.farmer.number +
                                    "-" +
                                    attribute.label
                                }
                            >
                                {attribute.name}
                            </option>
                        );
                    })}
                </FormControl>
            </td>
        );
    };

    updateFarmerScore = (event, props) => {
        let farmersArray = [...this.state.farmers];

        //console.log(farmersArray);
        //console.log(props);
        // Finding which farmer to subset
        let whichFarmer = "";
        farmersArray.forEach((farmer, farmerIndex) => {
            if (farmer.number === props.farmer.number) {
                whichFarmer = farmerIndex;
            }
        });

        let legumefuncs = this.state.legumeFunctions;
        let whichValue = "";
        // Finding which value to update
        legumefuncs.forEach((funct, funcIndex) => {
            if (funct.label === props.legumeFunctions.label) {
                whichValue = funcIndex;
            }
        });

        let newScore = { ...farmersArray[whichFarmer].selections[whichValue] };
        newScore.score = parseInt(event.target.value);
        farmersArray[whichFarmer].selections[whichValue] = newScore;
        this.setState({
            farmers: farmersArray,
        });

        this.updateTotal();
        this.updateFarmerSummary();
    };

    updateTotal = () => {
        const farmers = this.state.farmers;

        farmers.map((farmer) => {
            farmer.total = 0;

            farmer.selections.map((selection) => {
                farmer.total += selection.score;
            });
        });

        this.setState({
            farmers: farmers,
        });
    };

    updateFarmerName = (event, props) => {
        let farmersArray = [...this.state.farmers];

        farmersArray.forEach((farmer, farmerIndex) => {
            if (farmer.number === props.farmer.number) {
                farmersArray[farmerIndex].name = event.target.value;
            }
        });
        this.setState({ farmers: farmersArray });
    };

    updateFarmerDetailesSelect = (event, props) => {
        let farmersArray = [...this.state.farmers]; // making a shallow copy
        farmersArray.forEach((farmer, farmerIndex) => {
            if (farmer.number === props.farmer.number) {
                farmersArray[farmerIndex][props.attribute.label] =
                    event.target.value;
            }
        });
        this.setState({ farmers: farmersArray });
        this.updateFarmerSummary();
    };

    tableHeader = () => {
        if (this.state !== null) {
            return (
                <thead>
                    <tr>
                        <th rowSpan="2">Farmer Number</th>
                        <th rowSpan="2">Farmer Name</th>
                        <th rowSpan="2">Gender</th>
                        <th rowSpan="2">Typology</th>
                        <th rowSpan="1" colSpan="6">
                            Functions
                        </th>
                        <th rowSpan="2">Total</th>
                    </tr>
                    <tr>
                        {this.state.legumeFunctions.map((funct) => {
                            return (
                                <th
                                    key={
                                        "participatory-matrix-head-" +
                                        funct.label
                                    }
                                >
                                    {funct.name}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
            );
        } else {
            return <h1>Null State</h1>;
        }
    };

    tableRows = () => {
        if (this.state !== null) {
            return this.state.farmers.map((farmer) => {
                return (
                    <tr key={"participatory-matrix-body-" + farmer.number}>
                        {this.state.farmerAttributes.map((attribute) => {
                            // Returning a value for each of the potential selections
                            if (attribute.label === "selections") {
                                return farmer.selections.map((selection) => {
                                    return this.farmEntryFields({
                                        key:
                                            "participatory-matrix-body-" +
                                            farmer.number +
                                            selection.label,
                                        attribute: attribute,
                                        farmer: farmer,
                                        legumeFunctions: selection,
                                        farmer: farmer,
                                    });
                                });

                                // Return the farmers number for the row number
                            } else if (attribute.label === "number") {
                                return (
                                    <td
                                        key={
                                            "select-input" +
                                            farmer.number +
                                            "-" +
                                            attribute.label
                                        }
                                    >
                                        {farmer.number}
                                    </td>
                                );
                                // Return the total score for that particular farmer
                            } else if (attribute.label === "total") {
                                return (
                                    <td
                                        key={
                                            "select-input" +
                                            farmer.number +
                                            "-" +
                                            attribute.label
                                        }
                                    >
                                        {farmer.total}
                                    </td>
                                );
                            } else {
                                return this.farmEntryFields({
                                    key:
                                        "farmEntry-field-" +
                                        attribute.label +
                                        "-" +
                                        farmer.number,
                                    attribute: attribute,
                                    farmer: farmer,
                                });
                            }
                        })}
                    </tr>
                );
            });
        } else {
            return <h1>Null State</h1>;
        }
    };

    calculateAttributeRank = () => {
        const scoresIndividual = _.cloneDeep(
            this.state.summary.scoresIndividual
        );

        // Initialise the ranks
        scoresIndividual.forEach((individualScore) => {
            // Setting rank to zero
            individualScore.scores[2].score = 1;
        });

        // Actually ranking the scores (draws included)
        scoresIndividual.forEach((firstScore) => {
            scoresIndividual.forEach((secondScore) => {
                if (firstScore.scores[1].score > secondScore.scores[1].score) {
                    firstScore.scores[2].score = firstScore.scores[2].score;
                }
                if (firstScore.scores[1].score < secondScore.scores[1].score) {
                    firstScore.scores[2].score += 1;
                }
            });
        });

        // Averaging the ranks based on number of ties
        const numberOfScores = this.state.legumeFunctions.length;
        const numberOfOccurences = [];
        for (let i = 0; i < numberOfScores; i++) {
            numberOfOccurences[i] = {
                number: i + 1,
                occurences: 0,
                conversion: i + 1,
            };
        }

        // Finding out how to convert to ranking average
        scoresIndividual.forEach((firstScore) => {
            numberOfOccurences.forEach((rank) => {
                if (firstScore.scores[2].score == rank.number) {
                    rank.occurences += 1;
                    rank.conversion =
                        (rank.occurences + 2 * rank.number - 1) / 2;
                }
            });
        });

        //applying ranking average conversion
        scoresIndividual.forEach((firstScore) => {
            numberOfOccurences.forEach((rank) => {
                if (firstScore.scores[2].score == rank.number) {
                    firstScore.scores[2].score = rank.conversion;
                }
            });
        });

        this.setState((prevState) => {
            return {
                ...prevState,
                summary: {
                    ...prevState.summary,
                    scoresIndividual: scoresIndividual,
                },
            };
        });
    };

    // Return a score from the farmer if they match the correct criteria
    mapThroughFarmers(props) {
        const farmers = _.cloneDeep(this.state.farmers);

        let scoreSum = 0;
        let relevantFarmers = 0;

        farmers.map((farmer, farmerIndex) => {
            farmer.selections.map((farmerSelection, farmerSelectionIndex) => {
                // If the farmer has the correct gender
                // If the farmer is selecting the correct attribute
                // return Score
                // else
                // return 0

                if (props.variable === "typology") {
                    if (
                        props.typology.toLowerCase() ===
                            farmer.typology.toLowerCase() &&
                        props.selection.label === farmerSelection.label
                    ) {
                        relevantFarmers += 1;
                        scoreSum += parseInt(farmerSelection.score);
                    }
                }
                if (props.variable === "gender") {
                    if (
                        props.gender.toLowerCase() ===
                            farmer.gender.toLowerCase() &&
                        props.selection.label === farmerSelection.label
                    ) {
                        relevantFarmers += 1;
                        scoreSum += parseInt(farmerSelection.score);
                    }
                }
            });
        });

        if (relevantFarmers > 0) {
            return parseFloat(scoreSum / relevantFarmers).toFixed(2);
        }

        return parseFloat(scoreSum).toFixed(2);
    }

    // updateGenderScore = () => {
    //     const summary = _.cloneDeep(this.state.summary.scoresIndividual);

    //     summary.map((scoresByLegumeFunction) => {
    //         scoresByLegumeFunction.scores.map((individualScores) => {
    //             if (individualScores.type === "gender") {
    //                 individualScores.score = this.mapThroughFarmers({
    //                     variable: "gender",
    //                     gender: individualScores.label,
    //                     selection: scoresByLegumeFunction.legumeFunction,
    //                 });
    //             }
    //         });
    //     });

    //     this.setState((prevState) => {
    //         return {
    //             ...prevState,
    //             summary: {
    //                 ...prevState.summary,
    //                 scoresIndividual: summary,
    //             },
    //         };
    //     });
    // };

    updateTypologyScore = () => {
        const summary = _.cloneDeep(this.state.summary.scoresIndividual);

        summary.map((scoresByLegumeFunction) => {
            scoresByLegumeFunction.scores.map((individualScores) => {
                if (individualScores.type === "typology") {
                    individualScores.score = this.mapThroughFarmers({
                        variable: "typology",
                        typology: individualScores.label,
                        selection: scoresByLegumeFunction.legumeFunction,
                    });
                }
                if (individualScores.type === "gender") {
                    individualScores.score = this.mapThroughFarmers({
                        variable: "gender",
                        gender: individualScores.label,
                        selection: scoresByLegumeFunction.legumeFunction,
                    });
                }
            });
        });

        this.setState(
            (prevState) => {
                return {
                    ...prevState,
                    summary: {
                        ...prevState.summary,
                        scoresIndividual: summary,
                    },
                };
            },
            () => {
                this.calculateAttributeRank();
            }
        );
    };

    updateFarmerSummary = () => {
        const summary = _.cloneDeep(this.state.summary.scoresIndividual);
        const farmers = _.cloneDeep(this.state.farmers);
        // Update total score per attribute
        summary.forEach((summaryscore, summaryScoreIndex) => {
            summary[summaryScoreIndex].scores[0].score = 0;
            let totalScoreTemp = _.cloneDeep(
                summary[summaryScoreIndex].scores[0].score
            );
            farmers.forEach((farmer) => {
                farmer.selections.forEach((farmerSelection, selectionIndex) => {
                    if (
                        farmerSelection.label ==
                        summaryscore.legumeFunction.label
                    ) {
                        // Setting total score

                        totalScoreTemp +=
                            farmerSelection.score / farmers.length;

                        summary[summaryScoreIndex].scores[0].score = parseFloat(
                            parseFloat(totalScoreTemp).toFixed(2)
                        );
                        // Setting 0-5 score
                        summary[summaryScoreIndex].scores[1].score = parseFloat(
                            parseFloat((totalScoreTemp * 5) / 20).toFixed(2)
                        );
                    }
                });
            });
        });

        this.setState(
            (prevState) => {
                return {
                    ...prevState,
                    summary: {
                        ...prevState.summary,
                        scoresIndividual: summary,
                    },
                };
            },
            () => {
                //this.updateGenderScore();
                this.updateTypologyScore();
            }
        );
    };

    resultsTable = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th rowSpan="2">Summary Type</th>
                        <th
                            rowSpan="1"
                            colSpan={this.state.legumeFunctions.length}
                        >
                            Function
                        </th>
                    </tr>

                    <tr>
                        {this.state.legumeFunctions.map((funct) => {
                            return (
                                <th
                                    key={
                                        "participatory-matrix-head-" +
                                        funct.label
                                    }
                                >
                                    {funct.name}
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                <tbody>
                    {this.state.summary.scoreTypes.map(
                        (type, scoreTypeIndex) => {
                            return (
                                <tr>
                                    <td>{type.name}</td>
                                    {this.state.summary.scoresIndividual.map(
                                        (individualScore) => {
                                            return (
                                                <td>
                                                    {
                                                        individualScore.scores[
                                                            scoreTypeIndex
                                                        ].score
                                                    }
                                                </td>
                                            );
                                        }
                                    )}
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </Table>
        );
    };

    render() {
        return (
            <div>
                <h2>Participatory Matrix Scoring</h2>
                <p>
                    Complete participatory matrix scoring exercise. Each
                    individual has 20 beans which they can distribute across
                    legume functions. Use the "Add Farmer" button to add as many
                    farmers as you need for the exercises. These scores are
                    averaged and automatically transcribed into Legume Option
                    Scores.
                </p>
                <Form>
                    <Table striped bordered hover>
                        {this.tableHeader()}
                        <tbody>{this.tableRows()}</tbody>
                    </Table>
                    <Button className="float-right" onClick={this.addFarmer}>
                        Add Farmer
                    </Button>
                </Form>

                {this.resultsTable()}
            </div>
        );
    }
}

export default ParticipatoryMatrix;
