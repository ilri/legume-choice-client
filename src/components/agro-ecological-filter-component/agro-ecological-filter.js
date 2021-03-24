// Component to render the "agro-ecological-filter" for data entry
// This component allows users to specify the context for their study

import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import { Card } from "react-bootstrap";

import _ from "lodash";
import { AgroEcoData } from "./agro-ecological-data";

import "./agro-ecological-filter.css";
import "../data-entry-component/data-entry-component.css";
import AppContext from "../../AppContext";

class AgroEco extends React.Component {
    //static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = _.cloneDeep(AgroEcoData);
    }

    componentDidMount() {
        if (this.context.currentProject.agroEcoData !== undefined) {
            const newState = _.cloneDeep(
                this.context.currentProject.agroEcoData
            );
            this.setState(newState);
        } else {
            const newContext = _.cloneDeep(this.state);
            this.context.currentProject.agroEcoData = newContext;
        }
    }

    componentDidUpdate() {
        const newContext = _.cloneDeep(this.state);
        this.context.currentProject.agroEcoData = newContext;
        console.log(this.context.currentProject.agroEcoData);
    }
    tableHeader = () => {
        return (
            <thead>
                <tr>
                    <th>Biofilters</th>
                    <th>Site Values</th>
                    <th>Validity</th>
                </tr>
            </thead>
        );
    };

    renderDefaultValue = (props) => {
        return props.value;
    };
    tableBody = () => {
        return (
            <tbody>
                {this.state.biofilters.map((biofilter, index) => {
                    return (
                        <tr key={"agro-eco-table" + biofilter.label}>
                            <td>{biofilter.name}</td>
                            <td>
                                <FormControl
                                    type="number"
                                    value={this.renderDefaultValue({
                                        value: biofilter.value,
                                    })}
                                    onChange={(event) => {
                                        this.handleChange(event, {
                                            biofilter: biofilter,
                                        });
                                    }}
                                />
                            </td>
                            <td>{biofilter.validity}</td>
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    handleChange = (event, props) => {
        const bioFiltersArray = _.cloneDeep(this.state.biofilters);

        let validity = "Valid";
        bioFiltersArray.forEach((biofilterSubset, biofilterIndex) => {
            if (biofilterSubset.label === props.biofilter.label) {
                if (event.target.value < biofilterSubset.minValue) {
                    validity = "Too low";
                }
                if (event.target.value > biofilterSubset.maxValue) {
                    validity = "Too high";
                }
                bioFiltersArray[biofilterIndex].value = parseFloat(
                    event.target.value
                );
                bioFiltersArray[biofilterIndex].validity = validity;
            }
        });

        this.setState({
            biofilters: bioFiltersArray,
        });
    };

    render() {
        return (
            <div className="table-container">
                <div className="card-container">
                    <Card>
                        <Card.Header className="bg-dark text-white">
                            <h2>Agroecological Filter</h2>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Using your own knowledge of the field site fill
                                the green cells with representative data. These
                                data are used to assess agro-ecological
                                suitability of the field site for different
                                legume options in the Legume Option Scores
                                sheet.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Form>
                        <Table striped bordered hover>
                            {this.tableHeader()}

                            {this.tableBody()}
                        </Table>
                    </Form>
                </div>
            </div>
        );
    }
}

AgroEco.contextType = AppContext;

export default AgroEco;
