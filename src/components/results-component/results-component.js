import React, { Component } from "react";

import { Table } from "react-bootstrap";

import _ from "lodash";
import "./results-component.css";

import { resultsData } from "./results-data";
import AppContext from "../../AppContext";

import { legumesData } from "../legumes-component/legume-data";

class Results extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = resultsData;

        this.initialiseResults = this.initialiseResults.bind(this);
        this.legumeContextScores = this.legumeContextScores.bind(this);
        this.legumeFunctionScores = this.legumeFunctionScores.bind(this);
        this.legumeAgroEcoScores = this.legumeAgroEcoScores.bind(this);
        this.calculateLegumeScores = this.calculateLegumeScores.bind(this);
        this.checkFormFilled = this.checkFormFilled.bind(this);
    }

    // Adding empty results attribute to fill for each of the legumes
    // Loading the results from the form and getting the correct averages

    initialiseResults = () => {
        // Adding empty results to each legume
        const newLegumes = _.cloneDeep(legumesData.allLegumes.slice(0, 10));
        newLegumes.map((newLegume) => {
            newLegume.results = _.cloneDeep(this.state.emptyScoresForLegume);
        });

        // Adding form Results

        // Not much editing for agroeco
        const agroEcoData = _.cloneDeep(this.context.agroEcoData);

        //Extract average scores for context
        const contextData = _.cloneDeep(this.context.contextScores.scores);
        const newContextAverages = _.cloneDeep(this.state.contextFitSummary);

        newContextAverages.map((newcontextscore) => {
            contextData.map((contextscore) => {
                if (
                    contextscore.scoreType === "average" &&
                    newcontextscore.attribute.label ===
                        contextscore.attribute.label
                ) {
                    newcontextscore.score = 4 - contextscore.score;
                }
            });
        });

        // For the functional summary, need to average results from the pairwise selections and
        // from the participatory score matching

        const pairWiseData = _.cloneDeep(this.context.pairWiseScores.averages);
        const participatoryMatrixData = _.cloneDeep(
            this.context.participatoryMatrixScores.summary.scoresIndividual
        );

        const newFunctionAverages = _.cloneDeep(this.state.functionFitSummary);

        newFunctionAverages.map((newfunction) => {
            pairWiseData.map((pairwisescoreaverages) => {
                if (
                    pairwisescoreaverages.attribute.label ===
                    newfunction.legumeFunction.label
                ) {
                    newfunction.pairwisescore = pairwisescoreaverages.value;
                }
            });
        });

        newFunctionAverages.map((newfunction) => {
            participatoryMatrixData.map((matrixscore) => {
                if (
                    matrixscore.legumeFunction.label ===
                    newfunction.legumeFunction.label
                ) {
                    newfunction.matrixscore = matrixscore.scores[1].score;
                }
            });
        });

        newFunctionAverages.map((newfunction) => {
            newfunction.score = parseFloat(
                (
                    newfunction.pairwisescore / 2 +
                    newfunction.matrixscore / 2
                ).toFixed(2)
            );
        });

        // Set initial state and then calculate initial results for legumes
        this.setState(
            {
                legumes: newLegumes,
                agroEcoFitSummary: agroEcoData.biofilters,
                contextFitSummary: newContextAverages,
                functionFitSummary: newFunctionAverages,
            },
            () => {
                this.calculateLegumeScores();
            }
        );
    };

    legumeContextScores = (props) => {
        // Context Scores
        // console.log("Legume Context: " + props.legumecontext);
        // console.log("Form Context: " + props.formcontext);

        let legumecontext = parseFloat(props.legumecontext);
        let formcontext = parseFloat(props.formcontext);
        // Condition 1
        if (
            legumecontext - formcontext > -0.5 &&
            legumecontext - formcontext <= 0
        ) {
            let scoreToReturn = 4 + (legumecontext - formcontext) / 2;
            if (scoreToReturn > 0) {
                return scoreToReturn;
            }
        }

        // Condition 2
        if (
            legumecontext - formcontext < 0.5 &&
            legumecontext - formcontext >= 0
        ) {
            let scoreToReturn = 4 - (legumecontext - formcontext) / 2;
            if (scoreToReturn > 0) {
                return scoreToReturn;
            }
        }

        // Condition 3
        if (legumecontext > formcontext) {
            let scoreToReturn = 4 - (legumecontext - formcontext) * 2;
            if (scoreToReturn > 0) {
                return scoreToReturn;
            }
        }

        // Condition 4
        if (formcontext > legumecontext) {
            return 4;
        }

        return 0;
    };

    legumeFunctionScores = (props) => {
        // Calculating the averages for each of the legumes
        // Function Scores

        let formfunction = props.formfunction;
        let legumefunction = props.legumefunction;
        if (formfunction === 0) {
            return 0;
        }
        if (legumefunction < formfunction) {
            return (legumefunction * formfunction) / 8;
        }
        return (legumefunction * formfunction) / 4;
    };

    legumeAgroEcoScores = (props) => {
        //console.log(props.legumeMin);
        //console.log(props.legumeMax);
        //console.log(props.formvalue);

        let legumeMin = props.legumeMin;
        let legumeMax = props.legumeMax;
        let formvalue = props.formvalue;

        if (formvalue >= legumeMin && formvalue <= legumeMax) {
            return 1;
        } else {
            return 0;
        }
    };

    calculateLegumeScores = () => {
        const newLegumeState = _.cloneDeep(this.state.legumes);

        newLegumeState.map((legume) => {
            // Set context scores
            // map through individual legumes
            legume.results.contextFit.map((legumeContextScore) => {
                // Map through the contextFit summaries
                this.state.contextFitSummary.map((contextAttribute) => {
                    if (legumeContextScore.attribute !== undefined) {
                        // Match the attribute in the legume to the attribute in the context fit sumary
                        if (
                            contextAttribute.attribute.label ===
                            legumeContextScore.attribute.label
                        ) {
                            // Assign the context score
                            // console.log(legumeContextScore);
                            // console.log(contextAttribute);
                            // console.log(
                            //     "Legume Attribute: " +
                            //         contextAttribute.attribute.label
                            // );
                            //console.log(legume);

                            legumeContextScore.score = this.legumeContextScores(
                                // Props to send to the function
                                {
                                    legumecontext:
                                        legume[
                                            contextAttribute.attribute.label
                                        ],
                                    formcontext: contextAttribute.score,
                                }
                            );
                            // console.log(legumeContextScore.score);
                        }
                    }
                });
            });

            // Set function scores
            legume.results.functionFit.map((legumeFunction) => {
                this.state.functionFitSummary.map((functionAttribute) => {
                    if (
                        functionAttribute.legumeFunction !== undefined &&
                        legumeFunction.legumeFunction !== undefined
                    ) {
                        if (
                            functionAttribute.legumeFunction.label ===
                            legumeFunction.legumeFunction.label
                        ) {
                            legumeFunction.score = this.legumeFunctionScores({
                                formfunction: functionAttribute.score,
                                legumefunction:
                                    legume[
                                        functionAttribute.legumeFunction.label
                                    ],
                            });
                        }
                    }
                });
            });

            // set agroeco scores
            legume.results.agroEcoFit.map((legumeAgroEco) => {
                this.state.agroEcoFitSummary.map((agroEcoSummary) => {
                    if (legumeAgroEco.agroEcoFilter !== undefined) {
                        if (
                            legumeAgroEco.agroEcoFilter.label ===
                            agroEcoSummary.label
                        ) {
                            legumeAgroEco.score = this.legumeAgroEcoScores({
                                legumeMin: legume[agroEcoSummary.label][0].min,
                                legumeMax: legume[agroEcoSummary.label][0].max,
                                formvalue: agroEcoSummary.value,
                            });
                            // console.log(legumeAgroEco);
                            // console.log(agroEcoSummary);
                            // console.log(legume[agroEcoSummary.label][0].min);
                            // console.log(legume[agroEcoSummary.label][0].max);
                        }
                    }
                });
            });
        });

        // Update overall scores
        newLegumeState.map((legume) => {
            // Sum agroEco Scores
            let agroecoscoreAccumulator = 0;
            legume.results.agroEcoFit.forEach((agroecoscore) => {
                if (agroecoscore.agroEcoFilter !== undefined) {
                    agroecoscoreAccumulator += agroecoscore.score;
                }
            });
            legume.results.agroEcoFit.forEach((agroecoscore) => {
                if (agroecoscore.overallFit !== undefined) {
                    agroecoscore.overallFit = agroecoscoreAccumulator;
                }
            });

            // Sum context Scores
            let contextAccumulator = 0;
            legume.results.contextFit.forEach((contextScore) => {
                if (contextScore.attribute !== undefined) {
                    contextAccumulator += contextScore.score;
                }
            });
            legume.results.contextFit.forEach((contextScore) => {
                if (contextScore.overallFit !== undefined) {
                    contextScore.overallFit = contextAccumulator;
                }
            });
            // Sum function scores
            let functionAccumulator = 0;
            legume.results.functionFit.forEach((functionScore) => {
                if (functionScore.legumeFunction !== undefined) {
                    functionAccumulator += functionScore.score;
                }
            });
            legume.results.functionFit.forEach((functionScore) => {
                if (functionScore.overallFit !== undefined) {
                    functionScore.overallFit = functionAccumulator;
                }
            });
        });

        // Set ranking the scores (draws included)
        newLegumeState.forEach((firstLegume) => {
            // Overall rank is the fifth item in the array
            firstLegume.results.agroEcoFit[5].overallRank = 1;
            let valuesEncountered = [];
            newLegumeState.forEach((secondLegume) => {
                //-------------------------------------------------------------------------------------------------
                // AgroEco Rank
                if (
                    // Overall rank is the fifth item in the array

                    firstLegume.results.agroEcoFit[4].overallFit <
                        secondLegume.results.agroEcoFit[4].overallFit &&
                    // Making sure the value has not been encountered before.
                    // If it has, there is no need to push the rank further down the list
                    !valuesEncountered.includes(
                        secondLegume.results.agroEcoFit[4].overallFit
                    )
                ) {
                    //
                    valuesEncountered.push(
                        secondLegume.results.agroEcoFit[4].overallFit
                    );
                    firstLegume.results.agroEcoFit[5].overallRank += 1;
                }
                //-------------------------------------------------------------------------------------------------
                // Context Rank
                if (
                    // Overall rank is the fifth item in the array

                    firstLegume.results.contextFit[7].overallFit <
                        secondLegume.results.contextFit[7].overallFit &&
                    // Making sure the value has not been encountered before.
                    // If it has, there is no need to push the rank further down the list
                    !valuesEncountered.includes(
                        secondLegume.results.contextFit[7].overallFit
                    )
                ) {
                    //
                    valuesEncountered.push(
                        secondLegume.results.contextFit[7].overallFit
                    );
                    firstLegume.results.contextFit[8].overallRank += 1;
                }
                // Function Rank
                //-------------------------------------------------------------------------------------------------
                if (
                    // Overall rank is the fifth item in the array

                    firstLegume.results.functionFit[6].overallFit <
                        secondLegume.results.functionFit[6].overallFit &&
                    // Making sure the value has not been encountered before.
                    // If it has, there is no need to push the rank further down the list
                    !valuesEncountered.includes(
                        secondLegume.results.functionFit[6].overallFit
                    )
                ) {
                    //
                    valuesEncountered.push(
                        secondLegume.results.functionFit[6].overallFit
                    );
                    firstLegume.results.functionFit[7].overallRank += 1;
                }
            });
        });

        this.setState({
            legumes: newLegumeState,
        });
    };

    checkFormFilled = () => {
        if (
            this.context.agroEcoData !== undefined &&
            this.context.contextScores !== undefined &&
            this.context.pairWiseScores !== undefined &&
            this.context.participatoryMatrixScores !== undefined
        ) {
            this.setState(
                {
                    formFilled: true,
                },
                () => {
                    this.initialiseResults();
                }
            );
        }
    };

    componentDidMount() {
        if (this.context.results !== undefined) {
            const newState = this.context.results;
            this.setState(newState);
        } else {
            const newContext = this.state;
            this.context.results = newContext;
        }
        //console.log(this.state);

        this.checkFormFilled();
    }
    componentDidUpdate() {
        const newContext = this.state;
        this.context.results = newContext;
        console.log(this.state);
    }

    returnResultsForSummaryTable = (props) => {
        if (props.item.score !== undefined) {
            return <td>{parseFloat(props.item.score).toFixed(2)}</td>;
        }
        if (props.item.overallFit !== undefined) {
            return <td>{parseFloat(props.item.overallFit).toFixed(2)}</td>;
        }
        if (props.item.overallRank !== undefined) {
            return <td>{parseInt(props.item.overallRank)}</td>;
        }
    };

    renderLegumeResults = () => {
        return (
            <div>
                <h1>AgroEco Fit</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Legume Name</th>
                            {this.state.agroEcoFilters.map((agroEcoFilter) => {
                                return <th>{agroEcoFilter.label}</th>;
                            })}
                            <th>total score</th>
                            <th>overall rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.legumes.map((legume) => {
                            return (
                                <tr>
                                    <td>{legume.name}</td>
                                    {legume.results.agroEcoFit.map(
                                        (agroEcoItem) => {
                                            return this.returnResultsForSummaryTable(
                                                {
                                                    item: agroEcoItem,
                                                }
                                            );
                                        }
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <h1>Context Fit</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Legume Name</th>
                            {this.state.attributes.map((attribute) => {
                                return <th>{attribute.label}</th>;
                            })}
                            <th>total score</th>
                            <th>overall rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.legumes.map((legume) => {
                            return (
                                <tr>
                                    <td>{legume.name}</td>
                                    {legume.results.contextFit.map(
                                        (contextItem) => {
                                            return this.returnResultsForSummaryTable(
                                                {
                                                    item: contextItem,
                                                }
                                            );
                                        }
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <h1>Functional Fit</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Legume Name</th>
                            {this.state.legumeFunctions.map(
                                (legumeFunction) => {
                                    return <th>{legumeFunction.label}</th>;
                                }
                            )}
                            <th>total score</th>
                            <th>overall rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.legumes.map((legume) => {
                            return (
                                <tr>
                                    <td>{legume.name}</td>
                                    {legume.results.functionFit.map(
                                        (functionItem) => {
                                            return this.returnResultsForSummaryTable(
                                                {
                                                    item: functionItem,
                                                }
                                            );
                                        }
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    };

    renderBody = () => {
        if (this.state.formFilled === false) {
            return <h1>No data entered yet. Please fill in data-entry form</h1>;
        }
        if (this.state.formFilled === true) {
            return this.renderLegumeResults();
        }
    };

    render() {
        return <div>{this.renderBody()}</div>;
    }
}

export default Results;
