import React, { Component } from "react";
import _ from "lodash";

import axios from "axios";

import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

import { Button } from "react-bootstrap";

import AppContext from "../../AppContext";

class SubmitData extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        console.log(AppContext);

        this.state = {
            currentProject: {},
            previousProjects: [],
        };
    }

    componentDidMount() {
        this.initialiseContext();
        //console.log(navigator.onLine);
    }
    componentDidUpdate() {
        console.log(this.state);
    }

    initialiseContext = () => {
        const appNames = {};

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

        this.setState({ currentProject: appData });
    };

    submitData = () => {
        const dataToSubmit = _.cloneDeep(this.state.currentProject);
        console.log(dataToSubmit);
        axios({
            method: "post",
            url: "https://l-gorman.com/api/projects/submit-data/",
            data: dataToSubmit,
            headers: {
                accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    retrieveProjects = () => {
        axios({
            method: "get",
            url: "https://l-gorman.com/api/projects/get-projects/",
            headers: {
                accept: "application/json",
            },
        })
            .then((response) => {
                this.setState({
                    previousProjects: response.data,
                });
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // offlineResults = () => {
    //     if (!navigator.onLine) {
    //         return (
    //             <h1>
    //                 Offline: Wait for internet connection before submitting data
    //                 or viewing previous projects
    //             </h1>
    //         );
    //     }
    // };

    render() {
        return (
            <div>
                <h1>App Context</h1>
                <Button onClick={this.submitData}>Submit</Button>
                <Button onClick={this.retrieveProjects}>
                    Get all Projects
                </Button>
                <h1>Current Project</h1>
                <pre>{JSON.stringify(this.state.currentProject, null, 2)}</pre>
                <h1>Fetched projects</h1>
                <pre>
                    {JSON.stringify(this.state.previousProjects, null, 2)}
                </pre>
            </div>
        );
    }
}

export default SubmitData;
