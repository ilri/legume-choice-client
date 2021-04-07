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
    };

    fileUploadButton = (event) => {
        //console.log(event.target.files[0]);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = this.fileOnload;
        reader.readAsText(event.target.files[0]);
    };

    GetCorrectURL = () => {
        // All the cases of potential undefined
        if (this.context === undefined) {
            return "https://l-gorman.com/LegumeCHOICE";
        }

        if (this.context.currentProject === undefined) {
            return "https://l-gorman.com/LegumeCHOICE";
        }

        if (this.context.currentProject.projectInfo === undefined) {
            return "https://l-gorman.com/LegumeCHOICE";
        }
        if (this.context.currentProject.projectInfo.projectName === undefined) {
            return "https://l-gorman.com/LegumeCHOICE";
        }

        if (this.context.currentProject.projectInfo.projectName !== undefined) {
            const projectName = this.context.currentProject.projectInfo
                .projectName;
            console.log("correct thing");

            const testOrGenuine = this.state.realOrTestProject;

            if (testOrGenuine == "Genuine") {
                return (
                    "https://l-gorman.com/LegumeCHOICE/IndividualProjects/" +
                    projectName
                );
            }
            if (testOrGenuine == "Test") {
                return (
                    "https://l-gorman.com/LegumeCHOICE/TestProjects/IndividualProjects/" +
                    projectName
                );
            }
        }
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
                            Submit Data (Internet required)
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Submit your data in order for it to be processed
                                into csv format.
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
                                When your data is public, you will be able to
                                download it in CSV format.
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
                                        publicly available after 1 year? To view
                                        what data is shared, we recommend that
                                        you share some test data first.
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

                    <Card className="card-style">
                        <Card.Header className="bg-dark text-white">
                            View Data (Internet required)
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h3>Public Data</h3>
                                Follow this&nbsp;
                                <a
                                    href="https://l-gorman.com/LegumeCHOICE/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    link
                                </a>
                                &nbsp;to access all publicly available legume
                                CHOICE projects. Follow these links to download
                                results merged from all publicly available
                                legumeCHOICE projects:
                                <ul>
                                    <li>
                                        <a
                                            href={
                                                "https://l-gorman.com/LegumeCHOICE/AggregatedProjects" +
                                                "/ContextData.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Context Data
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={
                                                "https://l-gorman.com/LegumeCHOICE/AggregatedProjects" +
                                                "/LegumeResults.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Legume Results
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={
                                                "https://l-gorman.com/LegumeCHOICE/AggregatedProjects" +
                                                "/PairwiseSelections.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Pairwise Selections
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={
                                                "https://l-gorman.com/LegumeCHOICE/AggregatedProjects" +
                                                "/PairwiseSummaryScores.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Pairwise Summary Scores
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={
                                                "https://l-gorman.com/LegumeCHOICE/AggregatedProjects" +
                                                "/ParticipatoryMatrixScores.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Participatory Matrix Scores
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={
                                                "https://l-gorman.com/LegumeCHOICE/AggregatedProjects" +
                                                "/agroEcoData.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Agroecological Data
                                        </a>
                                    </li>
                                </ul>
                                <h3>Project Data</h3>
                                To find data from your own project, data follow
                                this&nbsp;
                                <a
                                    href={this.GetCorrectURL()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    link.
                                </a>
                                &nbsp; Please note this link will only work once
                                your data is publicly available. Follow these
                                links to download your results directly:
                                <ul>
                                    <li>
                                        <a
                                            href={
                                                this.GetCorrectURL() +
                                                "/ContextData.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Context Data
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={
                                                this.GetCorrectURL() +
                                                "/LegumeResults.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Legume Results
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={
                                                this.GetCorrectURL() +
                                                "/PairwiseSelections.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Pairwise Selections
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={
                                                this.GetCorrectURL() +
                                                "/PairwiseSummaryScores.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Pairwise Summary Scores
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={
                                                this.GetCorrectURL() +
                                                "/ParticipatoryMatrixScores.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Participatory Matrix Scores
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={
                                                this.GetCorrectURL() +
                                                "/agroEcoData.csv"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Agroecological Data
                                        </a>
                                    </li>
                                </ul>
                            </Card.Text>
                        </Card.Body>{" "}
                    </Card>
                </div>
            </div>
        );
    }
}
ManageData.contextType = AppContext;

export default ManageData;
