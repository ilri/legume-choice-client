import React, { Component } from "react";

import "./participatory-matrix-scoring.css";
import { Table, Button, Form } from "react-bootstrap";

import matrixdata from "./participatory-matrix-data";

class ParticipatoryMatrix extends Component {
    constructor(props) {
        super(props);

        this.state = matrixdata;
    }

    componentDidMount() {
        console.log(this.state);
        //this.addFarmer();
    }

    componentDidUpdate() {
        console.log(this.state.farmers);
    }

    addFarmer = () => {
        //This is so important to make sure that we are creating a clean copy
        //Deep cloning
        let farmersArray = JSON.parse(JSON.stringify(this.state.farmers));
        let number = farmersArray.length + 1;

        let newfarmertoAdd = JSON.parse(JSON.stringify(this.state.blankFarmer));
        newfarmertoAdd.number = number;

        farmersArray.push(newfarmertoAdd);

        this.setState(
            {
                farmers: farmersArray,
            },
            () => {
                this.updateTotal();
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
        //console.log("name input props-------------------");

        return (
            <td>
                <Form.Control
                    type="text"
                    onChange={(event) => this.updateFarmerName(event, props)}
                />
            </td>
        );
    };

    scoringInput = (props) => {
        console.log(props);

        return (
            <td key={props.attribute.name + props.farmer.number}>
                <Form.Control
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
                <Form.Control
                    as="select"
                    defaultValue={props.farmer[props.attribute.label]}
                    onChange={(event) =>
                        this.updateFarmerDetailesSelect(event, props)
                    }
                >
                    {this.state[props.attribute.label].map((attribute) => {
                        return <option>{attribute.name}</option>;
                    })}
                </Form.Control>
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
    };

    tableHeader = () => {
        return (
            <thead key="participatory-matrix-table-head">
                <tr key="participatory-matrix-table-head-row">
                    <th key="participatory-matrix-head-number" rowSpan="2">
                        Farmer Number
                    </th>
                    <th key="participatory-matrix-head-farmer-name" rowSpan="2">
                        Farmer Name
                    </th>
                    <th key="participatory-matrix-head-gender" rowSpan="2">
                        Gender
                    </th>
                    <th key="participatory-matrix-head-typology" rowSpan="2">
                        Typology
                    </th>
                    <th
                        key="participatory-matrix-head-functions"
                        rowSpan="1"
                        colSpan="6"
                    >
                        Functions
                    </th>
                    <th rowSpan="2" key="participatory-matrix-head-total">
                        Total
                    </th>
                </tr>
                <tr>
                    {this.state.legumeFunctions.map((funct) => {
                        return (
                            <th
                                key={"participatory-matrix-head-" + funct.label}
                            >
                                {funct.name}
                            </th>
                        );
                    })}
                </tr>
            </thead>
        );
    };

    tableRows = () => {
        return this.state.farmers.map((farmer) => {
            return (
                <tr key={"participatory-matrix-body-" + farmer.number}>
                    {this.state.farmerAttributes.map((attribute) => {
                        if (attribute.label === "selections") {
                            return farmer.selections.map((selection) => {
                                return (
                                    <this.farmEntryFields
                                        key={
                                            "participatory-matrix-body-" +
                                            farmer.number +
                                            selection.label
                                        }
                                        attribute={attribute}
                                        legumeFunctions={selection}
                                        farmer={farmer}
                                    />
                                );
                            });
                        } else if (attribute.label === "number") {
                            return <td>{farmer.number}</td>;
                        } else if (attribute.label === "total") {
                            return <td>{farmer.total}</td>;
                        } else {
                            return (
                                <this.farmEntryFields
                                    attribute={attribute}
                                    farmer={farmer}
                                />
                            );
                        }
                    })}
                </tr>
            );
        });
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
                <Table key="participatory-matrix-table" striped bordered hover>
                    <this.tableHeader />
                    <tbody key="participatory-matrix-table-body">
                        <this.tableRows />
                    </tbody>
                </Table>
                <Button
                    key="participatory-matrix-add-farmer-button"
                    className="float-right"
                    onClick={this.addFarmer}
                >
                    Add Farmer
                </Button>
            </div>
        );
    }
}

export default ParticipatoryMatrix;
