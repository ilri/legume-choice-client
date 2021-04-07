import React, { Component } from "react";

import {
    Form,
    FormGroup,
    FormLabel,
    FormControl,
    Table,
    Card,
    Button,
    FormText,
} from "react-bootstrap";

import "./legumes-component.css";

import _ from "lodash";

import AppContext from "../../AppContext";

import { legumesData } from "./legume-data";

class LegumesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = legumesData;
        this.state.filter = "Functions";
    }

    componentDidMount() {
        if (this.context.currentProject === undefined) {
            this.context.currentProject = {};
        }
        if (this.context.currentProject.legumeData !== undefined) {
            const newState = _.cloneDeep(
                this.context.currentProject.legumeData
            );
            this.setState(newState);
        } else {
            const newContext = _.cloneDeep(this.state);
            this.context.currentProject.legumeData = newContext;
        }

        console.log(this.state);
        console.log(this.context);
    }
    componentDidUpdate() {
        const newContext = _.cloneDeep(this.state);
        this.context.currentProject.legumeData = newContext;

        console.log(this.state);
        console.log(this.context);
    }

    LegumeFunctionsTable = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <th>Name</th>
                    {this.state.provisionData.map((provisionVariable) => {
                        return <th>{provisionVariable.name}</th>;
                    })}
                </thead>
                <tbody>
                    {this.SortLegumes().map((legume) => {
                        return (
                            <tr>
                                <td>{legume.name}</td>
                                {this.state.provisionData.map(
                                    (provisionVariable) => {
                                        return (
                                            <td>
                                                {
                                                    legume[
                                                        provisionVariable.label
                                                    ]
                                                }
                                            </td>
                                        );
                                    }
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    };
    LegumeRequirementsTable = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <th>Name</th>
                    {this.state.requirements.map((requirement) => {
                        return <th>{requirement.name}</th>;
                    })}
                </thead>
                <tbody>
                    {this.SortLegumes().map((legume) => {
                        return (
                            <tr>
                                <td>{legume.name}</td>
                                {this.state.requirements.map((requirement) => {
                                    return <td>{legume[requirement.label]}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    };
    LegumeAgroEcoTable = () => {
        return (
            <Table className="legume-table" striped bordered hover>
                <thead>
                    <th>Name</th>
                    {this.state.agroEcoData.map((agroEcoVariable) => {
                        return (
                            <>
                                <th>{"Min " + agroEcoVariable.name}</th>
                                <th>{"Max " + agroEcoVariable.name}</th>
                            </>
                        );
                    })}
                </thead>

                <tbody>
                    {this.SortLegumes().map((legume) => {
                        return (
                            <tr>
                                <td>{legume.name}</td>
                                {this.state.agroEcoData.map(
                                    (agroEcoVariable) => {
                                        return (
                                            <>
                                                <td>
                                                    {
                                                        legume[
                                                            agroEcoVariable
                                                                .label
                                                        ][0].min
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        legume[
                                                            agroEcoVariable
                                                                .label
                                                        ][0].max
                                                    }
                                                </td>
                                            </>
                                        );
                                    }
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    };

    LegumeTableAll = () => {
        if (this.state.filter === "Functions") {
            return this.LegumeFunctionsTable();
        }
        if (this.state.filter === "Requirements") {
            return this.LegumeRequirementsTable();
        }
        if (this.state.filter === "AgroEcological") {
            return this.LegumeAgroEcoTable();
        }
    };

    addLegume = () => {
        const allLegumes = _.cloneDeep(this.state.allLegumes);
        const newLegume = _.cloneDeep(this.state.newLegume);
        const blankLegume = _.cloneDeep(this.state.blankLegume);
        allLegumes.push(newLegume);

        this.setState({
            allLegumes: allLegumes,
            newLegume: blankLegume,
        });

        console.log("add legume");
    };

    SortLegumes = () => {
        const legumesList = _.cloneDeep(this.state.allLegumes);
        const sortedLegumes = legumesList.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        });

        return sortedLegumes;
    };

    LegumeDetailsForm = () => {
        return (
            <Form className="form-display">
                <FormGroup className="short-form-entry">
                    <FormLabel>Legume Name</FormLabel>
                    <FormControl
                        type="text"
                        value={this.state.newLegume.name}
                        onChange={(event) =>
                            this.setState((prevState) => {
                                return {
                                    ...prevState,
                                    newLegume: {
                                        ...prevState.newLegume,
                                        name: event.target.value,
                                    },
                                };
                            })
                        }
                    />
                </FormGroup>
                <FormGroup className="short-form-entry">
                    <FormLabel>Legume Type</FormLabel>
                    <FormControl
                        as="select"
                        value={this.state.newLegume.type}
                        onChange={(event) =>
                            this.setState((prevState) => {
                                return {
                                    ...prevState,
                                    newLegume: {
                                        ...prevState.newLegume,
                                        type: event.target.value,
                                    },
                                };
                            })
                        }
                    >
                        {this.state.legumeTypes.map((legumetype) => {
                            return <option>{legumetype}</option>;
                        })}
                    </FormControl>
                </FormGroup>
                <FormGroup className="short-form-entry">
                    <FormLabel>Source of Information</FormLabel>
                    <FormControl
                        as="select"
                        value={this.state.newLegume.source}
                        onChange={(event) =>
                            this.setState((prevState) => {
                                return {
                                    ...prevState,
                                    newLegume: {
                                        ...prevState.newLegume,
                                        source: event.target.value,
                                    },
                                };
                            })
                        }
                    >
                        {this.state.sources.map((source) => {
                            return <option>{source}</option>;
                        })}
                    </FormControl>
                    <FormText>
                        Where you obtained your legume information
                    </FormText>
                </FormGroup>
            </Form>
        );
    };
    LegumeFunctionsForm = () => {
        return (
            <Form className="form-display">
                {this.state.provisionData.map((provisionType) => {
                    return (
                        <FormGroup className="short-form-entry">
                            <FormLabel>{provisionType.name}</FormLabel>
                            <FormControl
                                type="number"
                                value={
                                    this.state.newLegume[provisionType.label]
                                }
                                min={0}
                                max={4}
                                onChange={(event) =>
                                    this.setState((prevState) => {
                                        return {
                                            ...prevState,
                                            newLegume: {
                                                ...prevState.newLegume,
                                                [provisionType.label]: parseInt(
                                                    event.target.value
                                                ),
                                            },
                                        };
                                    })
                                }
                            />
                        </FormGroup>
                    );
                })}
            </Form>
        );
    };
    LegumeRequirmentsForm = () => {
        return (
            <Form className="form-display">
                {this.state.requirements.map((requirement) => {
                    return (
                        <FormGroup className="short-form-entry">
                            <FormLabel>{requirement.name}</FormLabel>
                            <FormControl
                                type="number"
                                value={this.state.newLegume[requirement.label]}
                                min={0}
                                max={4}
                                onChange={(event) =>
                                    this.setState((prevState) => {
                                        return {
                                            ...prevState,
                                            newLegume: {
                                                ...prevState.newLegume,
                                                [requirement.label]: parseInt(
                                                    event.target.value
                                                ),
                                            },
                                        };
                                    })
                                }
                            />
                        </FormGroup>
                    );
                })}
                ;
            </Form>
        );
    };

    changeAgroEcoValue = (event, props) => {
        console.log(props);
        const arrayToChange = _.cloneDeep(
            this.state.newLegume[props.variable.label]
        );
        arrayToChange[0][props.minmax] = parseFloat(event.target.value);

        console.log(arrayToChange);
        this.setState((prevState) => {
            return {
                ...prevState,
                newLegume: {
                    ...prevState.newLegume,
                    [props.variable.label]: arrayToChange,
                },
            };
        });
    };
    AgroEcoForm = () => {
        return (
            <Form className="form-display">
                {this.state.agroEcoData.map((agroEcovariable) => {
                    return (
                        <>
                            <FormGroup className="short-form-entry">
                                <FormLabel>
                                    Minimum {agroEcovariable.name}
                                </FormLabel>
                                <FormControl
                                    type="number"
                                    value={
                                        this.state.newLegume[
                                            agroEcovariable.label
                                        ][0].min
                                    }
                                    onChange={(event) => {
                                        this.changeAgroEcoValue(event, {
                                            minmax: "min",
                                            variable: agroEcovariable,
                                        });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="short-form-entry">
                                <FormLabel>
                                    Maximum {agroEcovariable.name}
                                </FormLabel>
                                <FormControl
                                    type="number"
                                    value={
                                        this.state.newLegume[
                                            agroEcovariable.label
                                        ][0].max
                                    }
                                    onChange={(event) =>
                                        this.changeAgroEcoValue(event, {
                                            minmax: "max",
                                            variable: agroEcovariable,
                                        })
                                    }
                                />
                            </FormGroup>
                        </>
                    );
                })}
                ;
            </Form>
        );
    };

    LegumeForm = () => {
        return (
            <div className="card-container">
                <h1>Add Legumes</h1>

                <Card>
                    <Card.Header className="bg-dark text-white">
                        <h4>Legume Details</h4>
                    </Card.Header>
                </Card>
                {this.LegumeDetailsForm()}
                <Card>
                    <Card.Header className="bg-dark text-white">
                        <h4>
                            Primary Legume Functions (0-4): 0 low provision, 4
                            high provision
                        </h4>
                    </Card.Header>
                </Card>

                {this.LegumeFunctionsForm()}
                <Card>
                    <Card.Header className="bg-dark text-white">
                        <h4>
                            Legume Requirments (0-4): 0 low requirments, 4 high
                            requirements
                        </h4>
                    </Card.Header>
                </Card>

                {this.LegumeRequirmentsForm()}
                <Card>
                    <Card.Header className="bg-dark text-white">
                        <h4>Agroecological Requirments</h4>
                    </Card.Header>
                </Card>

                {this.AgroEcoForm()}
                <Button
                    onClick={() => this.addLegume()}
                    className="legume-button"
                >
                    Add Legume
                </Button>
            </div>
        );
    };

    render() {
        return (
            <div>
                <div className="card-container">
                    {this.LegumeForm()}
                    <Card>
                        <Card.Header className="bg-dark text-white">
                            <h2>Legumes</h2>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <FormLabel>
                                    Filter Legume Characteristics
                                </FormLabel>
                                <FormControl
                                    as="select"
                                    onChange={(event) => {
                                        this.setState({
                                            filter: event.target.value,
                                        });
                                    }}
                                >
                                    <option>Functions</option>
                                    <option>Requirements</option>
                                    <option>AgroEcological</option>
                                </FormControl>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
                {this.LegumeTableAll()}
            </div>
        );
    }
}
LegumesComponent.contextType = AppContext;

export default LegumesComponent;
