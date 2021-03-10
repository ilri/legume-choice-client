import React, { Component } from "react";
import _ from "lodash";

import AppContext from "../../AppContext";

class ViewContext extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        console.log(AppContext);

        this.state = {};
    }

    componentDidMount() {
        this.initialiseContext();
    }

    initialiseContext = () => {
        const appVariables = [
            "agroEcoData",
            "contextScores",
            "location",
            "pairWiseScores",
            "participatoryMatrixScores",
            "projectInfo",
            "results",
            "user",
        ];

        const appData = {};

        appVariables.map((variable) => {
            if (this.context[variable] !== undefined) {
                appData[variable] = _.cloneDeep(this.context[variable]);
            }
        });

        this.setState(appData);
    };

    render() {
        return (
            <div>
                <h1>App Context</h1>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        );
    }
}

export default ViewContext;
