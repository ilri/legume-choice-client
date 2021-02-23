import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import AgroEcoData from "./agro-ecological-data";

import "./agro-ecological-filter.css";

import AppContext from "../../AppContext";

class AgroEco extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = AgroEcoData;
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
                                <FormControl
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
                    <Form>
                        <Table striped bordered hover>
                            <this.tableHeader />

                            <this.tableBody />
                        </Table>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AgroEco;
