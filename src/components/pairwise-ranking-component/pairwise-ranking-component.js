import React, { Component } from "react";
import PairwiseRankingData from "./pairwise-ranking-data";

import "./pairwise-ranking-component.css";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import AppContext from "../../AppContext";

class PairwiseRanking extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = PairwiseRankingData;
    }

    componentDidMount() {
        //console.log(this.state);

        if (this.context.pairWiseScores !== undefined) {
            const newState = this.context.pairWiseScores;
            this.setState(newState);
        } else {
            const newContext = this.state;
            this.context.pairWiseScores = newContext;
        }
        this.upDateTotalScore("male");
        this.upDateTotalScore("female");
    }
    componentDidUpdate() {
        const newContext = this.state;
        this.context.pairWiseScores = newContext;
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

        this.updateAverage();
    };

    updateAverage = () => {
        const totalsArrayMale = this.state["male"].totals;
        const totalsArrayFemale = this.state["female"].totals;

        const newAverages = this.state.averages;

        newAverages.map((average, index) => {
            const newAverage =
                (totalsArrayMale[index].value +
                    totalsArrayFemale[index].value) /
                2;
            newAverages[index].value = newAverage;
            this.setState({
                averages: newAverages,
            });
        });
    };

    pairWiseTable = (props) => {
        const tableGender = props.gender;
        return (
            <Table striped bordered hover>
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
                            <tr
                                key={
                                    "pairwise-ranking-table-row" +
                                    item.funct1.name +
                                    item.funct2.name
                                }
                            >
                                <td
                                    key={
                                        "pairwise-ranking-table-item-name" +
                                        item.funct1.name +
                                        "-" +
                                        item.funct2.name
                                    }
                                >
                                    {item.funct1.name +
                                        " vs " +
                                        item.funct2.name}
                                </td>
                                <td
                                    key={
                                        "pairwise-ranking-table-item-form" +
                                        item.funct1.name +
                                        "-" +
                                        item.funct2.name +
                                        "-female"
                                    }
                                >
                                    <FormControl
                                        defaultValue={
                                            this.state["female"]
                                                .pairwiseSelection.value
                                        }
                                        key={
                                            "pairwise-ranking-table-form" +
                                            item.funct1.name +
                                            "-" +
                                            item.funct2.name +
                                            "-female"
                                        }
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
                                        <option>{item.funct1.name}</option>
                                        <option>{item.funct2.name}</option>
                                    </FormControl>
                                </td>
                                <td
                                    key={
                                        "pairwise-ranking-table-item-form" +
                                        item.funct1.name +
                                        "-" +
                                        item.funct2.name +
                                        "-male"
                                    }
                                >
                                    <FormControl
                                        as="select"
                                        defaultValue={
                                            this.state["male"].pairwiseSelection
                                                .value
                                        }
                                        key={
                                            "pairwise-ranking-table-form" +
                                            item.funct1.name +
                                            "-" +
                                            item.funct2.name +
                                            "-male"
                                        }
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
                                        <option>{item.funct1.name}</option>
                                        <option>{item.funct2.name}</option>
                                    </FormControl>
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
                        <th>Average Count</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.legumeFunctions.map((item, index) => {
                        return (
                            <tr key={"pairwise-results-table-row-" + item.name}>
                                <td
                                    key={
                                        "pairwise-results-table-row-item-" +
                                        item.name
                                    }
                                >
                                    {item.name}
                                </td>
                                <td
                                    key={
                                        "pairwise-results-table-row-item-female-" +
                                        item.name
                                    }
                                >
                                    {this.state.female.totals[index].value}
                                </td>
                                <td
                                    key={
                                        "pairwise-results-table-row-item-male-" +
                                        item.name
                                    }
                                >
                                    {this.state.male.totals[index].value}
                                </td>

                                <td
                                    key={
                                        "pairwise-results-table-row-item-average-" +
                                        item.name
                                    }
                                >
                                    {this.state.averages[index].value}
                                </td>
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
                    <Form className="table-container">
                        {this.pairWiseTable({ gender: "female" })}
                    </Form>
                    {this.pairWiseResultsTable({
                        gender: "female",
                        className: "results-table-pairwise",
                    })}
                </div>

                <div className="table-container"></div>
            </div>
        );
    }
}
export default PairwiseRanking;
