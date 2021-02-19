import React, { Component } from "react";
import { Table, Form } from "react-bootstrap";

import agroEcoData from "./agro-ecological-data";

import "./agro-ecological-filter.css";

class AgroEco extends Component {
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
                        <thead>
                            <tr>
                                <th>Biofilters</th>
                                <th>Site Values</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rainfall (mm/year)</td>
                                <td>
                                    <Form.Control type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td>Temperature (mean °C/month) </td>
                                <td>
                                    <Form.Control type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td>Altitude (average masl)</td>
                                <td>
                                    <Form.Control type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td>Soil pH (average)</td>
                                <td>
                                    <Form.Control type="number" />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default AgroEco;
