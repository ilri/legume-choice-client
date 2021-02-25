import React, { Component } from "react";

import legumesData from "../legumes-component/legume-data";

import "./results-component.css";

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = legumesData;
    }
    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1>Results</h1>
            </div>
        );
    }
}

export default Results;
