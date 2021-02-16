import React, { Component } from "react";
import ContextScores from "./context-scores-data";
import { Table } from "react-bootstrap";
class ContextScore extends Component {
    constructor(props) {
        super(props);

        this.state = ContextScores;
    }

    componentDidMount() {
        console.log(this.state);
    }

    contextRow = (props) => {
        return (
            <tr>
                <td>{props.attribute}</td>
                {this.state.typologies.map((typology) => {
                    return this.state.participants.map((participant) => {
                        return <td>{typology.name + participant.name}</td>;
                    });
                })}
            </tr>
        );
    };

    allRows = () => {
        return this.state.attributes.map((attribute) => {
            return <this.contextRow attribute={attribute.name} />;
        });
    };

    tableHeader = () => {
        return (
            <thead>
                {/* Adding The typology Headers */}
                <tr key="typology-header">
                    <th rowSpan="2">#</th>
                    {this.state.typologies.map((typology) => {
                        return (
                            <th
                                key={"typology-header" + typology.name}
                                colSpan="2"
                            >
                                Typology - {typology.name}
                            </th>
                        );
                    })}
                </tr>
                {/* Adding The Participant Headers */}
                <tr>
                    {this.state.typologies.map((typology) => {
                        return this.state.participants.map((participant) => {
                            return (
                                <th
                                    key={
                                        "participant-header" + participant.name
                                    }
                                >
                                    {participant.name}
                                </th>
                            );
                        });
                    })}
                </tr>
            </thead>
        );
    };

    render() {
        return (
            <div>
                <h1>Context Scoring</h1>
                <Table striped bordered hover>
                    <this.tableHeader />
                    <tbody>
                        <this.allRows />
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ContextScore;
