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
                    newcontextscore.score = contextscore.score;
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
        let legumecontext = props.legumecontext;
        let formcontext = props.formcontext;
        let scoreToReturn = 0;
        if (
            legumecontext - formcontext > -0.5 &&
            legumecontext - formcontext <= 0
        ) {
            scoreToReturn = 4 + (legumecontext - formcontext) / 2;
        }
        if (
            legumecontext - formcontext < 0.5 &&
            legumecontext - formcontext >= 0
        ) {
            scoreToReturn = 4 - (legumecontext - formcontext) / 2;
        }
        if (legumecontext > formcontext) {
            scoreToReturn = 4 - (legumecontext - formcontext) * 2;
        }
        if (formcontext > legumecontext) {
            scoreToReturn = 4;
        }

        if (scoreToReturn < 0) {
            return 0;
        } else {
            return scoreToReturn;
        }
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
        console.log(props.legumeMin);
        console.log(props.legumeMax);
        console.log(props.formvalue);

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
                            console.log(legumeContextScore);
                            console.log(contextAttribute);

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
        console.log(this.context);

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
            return <td>{parseFloat(props.item.overallRank).toFixed(2)}</td>;
        }
    };

    renderLegumeResults = () => {
        return (
            <div>
                <h1>AgroEco Fit</h1>
                <Table striped bordered hover>
                    <thead>
                        <th>Legume Name</th>
                        {this.state.agroEcoFilters.map((agroEcoFilter) => {
                            return <th>{agroEcoFilter.label}</th>;
                        })}
                        <th>total score</th>
                        <th>overall rank</th>
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
                        <th>Legume Name</th>
                        {this.state.attributes.map((attribute) => {
                            return <th>{attribute.label}</th>;
                        })}
                        <th>total score</th>
                        <th>overall rank</th>
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
                        <th>Legume Name</th>
                        {this.state.legumeFunctions.map((legumeFunction) => {
                            return <th>{legumeFunction.label}</th>;
                        })}
                        <th>total score</th>
                        <th>overall rank</th>
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
