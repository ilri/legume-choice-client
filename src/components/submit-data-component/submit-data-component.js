import React, { Component } from "react";
import _ from "lodash";

import axios from "axios";

// import { TiTick } from "react-icons/ti";
// import { ImCross } from "react-icons/im";

import { Button, FormFile, Card } from "react-bootstrap";

import AppContext from "../../AppContext";

import "./submit-data-component.css";

import { v4 as uuidv4 } from "uuid";


const projectSecret = uuidv4();
class ManageData extends Component {
    //static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            secretKey: projectSecret
        };

        this.fileOnload = this.fileOnload.bind(this);
    }

    componentDidMount() {
        //this.initialiseState();

        console.log(this.context);
        //console.log(navigator.onLine);
    }
    componentDidUpdate() {
        //const newContext = _.cloneDeep(this.state.currentProject);
        //this.context = newContext;
        //console.log(this.context);
    }

    checkAllFieldsComplete = () => {
        if (this.context.currentProject === undefined) {
            this.context.currentProject = {};
        }

        if (
            this.context.currentProject.agroEcoData !== undefined &&
            this.context.currentProject.contextScores !== undefined &&
            this.context.currentProject.location !== undefined &&
            this.context.currentProject.pairWiseScores !== undefined &&
            this.context.currentProject.participatoryMatrixScores !==
            undefined &&
            this.context.currentProject.projectInfo !== undefined &&
            this.context.currentProject.results !== undefined
        ) {
            return true;
        } else {
            return false;
        }
    };

    submitData = () => {
        const dataToSubmit = _.cloneDeep(this.context.currentProject);
        // console.log(dataToSubmit);
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
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // retrieveProjects = () => {
    //     axios({
    //         method: "get",
    //         url: "https://l-gorman.com/api/projects/get-projects/",
    //         headers: {
    //             accept: "application/json",
    //         },
    //     })
    //         .then((response) => {
    //             this.setState({
    //                 previousProjects: response.data,
    //             });
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

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
            // Good tutorial on file upload
            <div>
                {/* <input type="file" name="file" onChange={this.fileUploader} />
                <div> */}
                <FormFile
                    className="button-primary"
                    onChange={this.fileUploadButton}
                />
                {/* </div> */}
            </div>
        );
    };

    fileOnload = (event) => {
        // The file's text will be printed here
        // console.log(JSON.parse(event.target.result));
        const jsonFile = JSON.parse(event.target.result);
        this.context.currentProject = {};
        this.context.currentProject = _.cloneDeep(jsonFile);

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
                                into csv format. Follow this &nbsp;
                                <a
                                    href="https://l-gorman.com/LegumeCHOICE/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    link
                                </a>
                                &nbsp; to access publicly available legume
                                CHOICE projects. To find data from your own
                                project, go to "IndividualProjects" and search
                                for the folder which matches your project ID.{" "}
                                <br />
                                <br /> You cannot submit data unless data has
                                been entered, project information has been
                                entered, and results have been viewed.
                            </Card.Text>
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
