// Component to render the "agro-ecological-filter" for data entry
// This component allows users to specify the context for their study

import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import _ from "lodash";
import { AgroEcoData } from "./agro-ecological-data";

import "./agro-ecological-filter.css";

import AppContext from "../../AppContext";

class AgroEco extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = _.cloneDeep(AgroEcoData);
    }

    componentDidMount() {
        if (this.context.agroEcoData !== undefined) {
            const newState = this.context.agroEcoData;
            this.setState(newState);
        } else {
            const newContext = this.state;
            this.context.agroEcoData = newContext;
        }
    }

    componentDidUpdate() {
        const newContext = this.state;
        this.context.agroEcoData = newContext;
        console.log(this.context.agroEcoData);
    }
    tableHeader = () => {
        return (
            <thead>
                <tr>
                    <th>Biofilters</th>
                    <th>Site Values</th>
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
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    handleChange = (event, props) => {
        const bioFiltersArray = this.state.biofilters;

        // if (
        //     event.target.value < biofilter.minValue ||
        //     event.target.value > biofilter.maxValue
        // ) {
        //     alert("Outside of range");
        //     return;
        // }

        bioFiltersArray.forEach((biofilterSubset, biofilterIndex) => {
            if (biofilterSubset.label === props.biofilter.label) {
                bioFiltersArray[biofilterIndex].value = parseFloat(
                    event.target.value
                );
            }
        });

        this.setState({
            biofilters: bioFiltersArray,
        });
    };

    render() {
        return (
            <div>
                <h2>Agroecological Filter</h2>

                <div className="table-container">
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

export default AgroEco;
