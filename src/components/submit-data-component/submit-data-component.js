import React, { Component } from "react";
import _ from "lodash";

import axios from "axios";

// import { TiTick } from "react-icons/ti";
// import { ImCross } from "react-icons/im";

import {
    Button,
    FormFile,
    Form,
    FormGroup,
    FormCheck,
    FormControl,
    Card,
    FormLabel,
} from "react-bootstrap";

import AppContext from "../../AppContext";

import "./submit-data-component.css";

import { v4 as uuidv4 } from "uuid";

const projectSecret = uuidv4();
class ManageData extends Component {
    //static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            secretKey: projectSecret,
            dataAvailability: "Private",
            realOrTestProject: "Test",
            dateAvailable: "",
        };

        this.fileOnload = this.fileOnload.bind(this);
    }

    componentDidMount() {
        //this.initialiseState();

        if (this.context.currentProject === undefined) {
            this.context.currentProject = {};
        }

        if (this.context.currentProject.projectSecret === undefined) {
            const newContext = _.cloneDeep(this.state);
            this.context.currentProject.projectSecret = newContext;
        }
        if (this.context.currentProject.projectSecret !== undefined) {
            const newState = _.cloneDeep(
                this.context.currentProject.projectSecret
            );
            this.setState(newState);
        }

        console.log(this.state);
        //console.log(navigator.onLine);
    }
    componentDidUpdate() {
        console.log(this.state);
        const newContext = _.cloneDeep(this.state);
        this.context.currentProject.projectSecret = newContext;
    }

    makeDataPublic = () => {
        if (this.state.dataAvailability === "Share immediately") {
            let dateToSubmit = new Date();

            this.setState({
                dateAvailable: dateToSubmit,
            });
        }
        if (this.state.dataAvailability === "Share after one year") {
            let todaysDate = new Date();
            const year = todaysDate.getFullYear();
            const month = todaysDate.getMonth();
            const day = todaysDate.getDate();
            let dateToSubmit = new Date(year + 1, month, day);

            this.setState({
                dateAvailable: dateToSubmit,
            });
        }
    };

    checkAllFieldsComplete = () => {
        if (this.context.currentProject === undefined) {
            this.context.currentProject = {};
        }

        let agreeToSubmit = false;

        if (this.state.dataAvailability !== "Private") {
            agreeToSubmit = true;
        }

        if (
            // Making sure all data is filled in
            this.context.currentProject.agroEcoData !== undefined &&
            this.context.currentProject.contextScores !== undefined &&
            this.context.currentProject.location !== undefined &&
            this.context.currentProject.pairWiseScores !== undefined &&
            this.context.currentProject.participatoryMatrixScores !==
                undefined &&
            this.context.currentProject.projectInfo !== undefined &&
            this.context.currentProject.results !== undefined &&
            this.context.currentProject.projectSecret !== undefined &&
            // Making sure all conditions are agreed
            agreeToSubmit === true
        ) {
            return true;
        } else {
            return false;
        }
    };

    submitData = () => {
        const dataToSubmit = _.cloneDeep(this.context.currentProject);
        axios({
            method: "post",
            //url: "http://localhost:5000/api/projects/submit-data/",
            url: "https://l-gorman.com/api/projects/submit-data/",
            data: dataToSubmit,
            headers: {
                accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => {
                alert(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    downLoadData = () => {
        let dataToDownload = _.cloneDeep(this.context.currentProject);

        return (
            <a
                type="button"
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify(dataToDownload)
                )}`}
                download="filename.json"
            >
                <Button className="bg-light text-dark" variant="outline-dark ">
                    Save Progress
                </Button>
            </a>
        );
    };

    uploadData = () => {
        return (
            <div>
                <FormFile
                    className="button-primary"
                    onChange={this.fileUploadButton}
                />
            </div>
        );
    };

    fileOnload = (event) => {
        // The file's text will be printed here
        // console.log(JSON.parse(event.target.result));
        const jsonFile = JSON.parse(event.target.result);
        this.context.currentProject = {};
        this.context.currentProject = _.cloneDeep(jsonFile);

        const newState = _.cloneDeep(this.context.currentProject.projectSecret);

        this.setState(newState, () => {
            this.makeDataPublic();
        });

        console.log(this.context);
        // this.setState(
        //     { currentProject: jsonFile.currentProject },
        //     //() => (this.context.currentProject = jsonFile.currentProject)
        //     () => {
        //         this.setState(
        //             {
        //                 currentProject: jsonFile.cur,
        //             },
        //             () => {
        //                 this.setContext();
        //             }
        //         );
        //     }
        // );
    };

    fileUploadButton = (event) => {
        //console.log(event.target.files[0]);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = this.fileOnload;
        reader.readAsText(event.target.files[0]);
    };

    render() {
        return (
            <div>
                <h1>Manage Data</h1>
                <div className="cards-container">
                    <Card className="card-style ">
                        <Card.Header className="bg-dark text-white">
                            Save Project Progress
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                This application allows you to save your
                                progress as a JSON file. At any point, you can
                                upload this file into the application to
                                continue collecting/editing your data
                            </Card.Text>
                            {this.downLoadData()}
                        </Card.Body>
                    </Card>
                    <Card className="card-style">
                        <Card.Header className="bg-dark text-white">
                            Load Project
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Here you can load in data from a previously
                                saved project. This data must be stored as a
                                JSON file.
                            </Card.Text>
                            <footer>
                                <div className="upload-button">
                                    {this.uploadData()}
                                </div>
                            </footer>
                        </Card.Body>
                    </Card>

                    <Card className="card-style">
                        <Card.Header className="bg-dark text-white">
                            Submit Data
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Submit your data in order for it to be processed
                                into csv format. Follow this&nbsp;
                                <a
                                    href="https://l-gorman.com/LegumeCHOICE/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    link
                                </a>
                                &nbsp;to access publicly available legume CHOICE
                                projects. To find data from your own project, go
                                to "IndividualProjects" and search for the
                                folder which matches your project ID. <br />
                                <br /> Data can only be submitted under the
                                following conditions:
                                <ul>
                                    <li>
                                        Project information, legume-information,
                                        data-entry, and results have all been
                                        checked (see progress on top bar)
                                    </li>
                                    <li>
                                        You agree to make your data publicly
                                        available for research.
                                    </li>
                                </ul>
                            </Card.Text>
                            <Form>
                                <FormGroup>
                                    <FormLabel>
                                        Is this "test" data from app
                                        exploration, or "genuine" data collected
                                        from a focus group?
                                    </FormLabel>
                                    <FormControl
                                        as="select"
                                        value={this.state.realOrTestProject}
                                        onChange={(event) =>
                                            this.setState({
                                                realOrTestProject:
                                                    event.target.value,
                                            })
                                        }
                                    >
                                        <option>Test</option>
                                        <option>Genuine</option>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>
                                        Would you like to keep this data
                                        private, make the data publicly
                                        available immediately, or make it
                                        publicly available after 1 year? For
                                        data which is made publicly available,
                                        no sensitive information is shared
                                        (except with legumeCHOICE
                                        administrators).
                                    </FormLabel>
                                    <FormControl
                                        as="select"
                                        value={this.state.dataAvailability}
                                        onChange={(event) =>
                                            this.setState(
                                                {
                                                    dataAvailability:
                                                        event.target.value,
                                                },
                                                () => {
                                                    this.makeDataPublic();
                                                }
                                            )
                                        }
                                    >
                                        <option>Private</option>
                                        <option>Share immediately</option>
                                        <option>Share after one year</option>
                                    </FormControl>
                                </FormGroup>
                            </Form>
                            {this.checkAllFieldsComplete() ? (
                                <Button
                                    className="bg-light text-dark"
                                    variant="outline-dark "
                                    onClick={this.submitData}
                                >
                                    Submit
                                </Button>
                            ) : (
                                <Button
                                    className="bg-light text-dark"
                                    variant="outline-dark "
                                    onClick={this.submitData}
                                    disabled={true}
                                >
                                    Project not yet complete
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}
ManageData.contextType = AppContext;

export default ManageData;
