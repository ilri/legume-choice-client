import React, { Component } from "react";
import legumesData from "./legume-data";
class Legumes extends Component {
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
                <h1>Legumes</h1>
            </div>
        );
    }
}

export default Legumes;
