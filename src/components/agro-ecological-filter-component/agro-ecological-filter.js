import React, { Component } from "react";
import { Table, Form } from "react-bootstrap";

import agroEcoData from "./agro-ecological-data";

import "./agro-ecological-filter.css";

class AgroEco extends Component {
    constructor(props) {
        super(props);

        this.state = agroEcoData;
    }

    componentDidMount() {
        console.log(this.state);
    }

    componentDidUpdate() {
        console.log(this.state);
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

    tableBody = () => {
        return (
            <tbody>
                {this.state.biofilters.map((biofilter) => {
                    return (
                        <tr key={"agro-eco-table" + biofilter.label}>
                            <td>{biofilter.name}</td>
                            <td>
                                <Form.Control
                                    type="number"
                                    defaultValue={biofilter.value}
                                    onClick={(event) => {
                                        this.handleChange(event, biofilter);
                                    }}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    handleChange = (event, biofilter) => {
        const bioFiltersArray = this.state.biofilters;

        if (
            event.target.value < biofilter.minValue ||
            event.target.value > biofilter.maxValue
        ) {
            alert("Outside of range");
            return;
        }

        bioFiltersArray.forEach((biofilterSubset, biofilterIndex) => {
            if (biofilterSubset === biofilter) {
                bioFiltersArray[biofilterIndex].value = parseInt(
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
                    <Table
                        striped
                        bordered
                        hover
                        className="agro-eco-table-style"
                    >
                        <this.tableHeader />

                        <this.tableBody />
                    </Table>
                </div>
            </div>
        );
    }
}

export default AgroEco;
