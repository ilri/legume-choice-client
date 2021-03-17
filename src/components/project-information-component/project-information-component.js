import React, { Component } from "react";
import AppContext from "../../AppContext";

import MapPolygon from "../map-polygon-component/map-polygon-component";

import { v4 as uuidv4 } from "uuid";
import { Card } from "react-bootstrap";
import _ from "lodash";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./project-information-component.css";
import "../../App.css";
import { countryList } from "./countries-list";
import {
    Button,
    Form,
    FormControl,
    FormText,
    FormLabel,
    FormGroup,
} from "react-bootstrap";

let countryNames = [];

countryList.forEach((country) => {
    countryNames.push(country.name);
});

const projectID = uuidv4();
class ProjectInformation extends Component {
    //static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            userLocationFound: false,
            userLocation: {},
            projectName: "",
            projectID: projectID,
            country: "",
            majorRegion: "",
            minorRegion: "",
            communityName: "",
            communityType: "",
            description: "",
            date: new Date(),
            countryNames: countryNames,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.context.currentProject === undefined) {
            this.context.currentProject = {};
        }
        if (this.context.currentProject.projectInfo === undefined) {
            const newContext = _.cloneDeep(this.state);
            this.context.currentProject.projectInfo = newContext;
        }
        if (this.context.currentProject.projectInfo !== undefined) {
            const newState = _.cloneDeep(
                this.context.currentProject.projectInfo
            );
            this.setState(newState);
        }

        // console.log(this.state.countryNames);
    }

    // geoLocate = () => {
    //     let userlocation = {};
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition(function (
    //             position
    //         ) {
    //             userlocation = {
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude,
    //             };

    //             console.log(userlocation);
    //             return userlocation;
    //             //console.log("Longitude is :", );
    //         });
    //         console.log("Available");
    //         this.setState({
    //             userLocationFound: true,
    //             userLocation: userlocation,
    //         });
    //     } else {
    //         //console.log("Not Available");
    //     }
    // };

    componentDidUpdate() {
        //console.log(this.state);
        const newContext = _.cloneDeep(this.state);
        this.context.currentProject.projectInfo = newContext;
    }

    render() {
        return (
            <div className="project-info-container">
                <div className="card-container">
                    <Card>
                        <Card.Header className="bg-dark text-white">
                            <h2>Meta Data</h2>
                        </Card.Header>
                    </Card>
                </div>
                <Form className="form-display">
                    <FormGroup className="short-form-entry">
                        <FormLabel>Project Name</FormLabel>
                        <FormControl
                            type="text"
                            value={this.state.projectName}
                            onChange={(event) =>
                                this.setState({
                                    projectName: event.target.value,
                                })
                            }
                        />
                        <FormText className="text-muted">
                            A memorable name for your project.
                        </FormText>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Project ID</FormLabel>
                        <FormControl
                            type="text"
                            placeholder={this.state.projectID}
                            readOnly
                        />
                        <FormText className="text-muted">
                            A universally unique identifier (uuid) for your
                            project.
                        </FormText>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Country</FormLabel>
                        <FormControl
                            as="select"
                            value={this.state.country}
                            onChange={(event) => {
                                this.setState({ country: event.target.value });
                            }}
                        >
                            {this.state.countryNames.map((country) => {
                                return <option>{country}</option>;
                            })}
                        </FormControl>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Major Region</FormLabel>
                        <FormControl
                            value={this.state.majorRegion}
                            onChange={(event) =>
                                this.setState({
                                    majorRegion: event.target.value,
                                })
                            }
                        ></FormControl>
                        <FormText className="text-muted">
                            e.g. state/province
                        </FormText>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Minor Region</FormLabel>
                        <FormControl
                            value={this.state.minorRegion}
                            onChange={(event) =>
                                this.setState({
                                    minorRegion: event.target.value,
                                })
                            }
                        ></FormControl>
                        <FormText className="text-muted">e.g. county</FormText>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Community Name</FormLabel>
                        <FormControl
                            value={this.state.communityName}
                            onChange={(event) =>
                                this.setState({
                                    communityName: event.target.value,
                                })
                            }
                        ></FormControl>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Community Type</FormLabel>
                        <FormControl
                            value={this.state.communityType}
                            onChange={(event) =>
                                this.setState({
                                    communityType: event.target.value,
                                })
                            }
                        ></FormControl>
                        <FormText className="text-muted">
                            e.g. village/sub-village
                        </FormText>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Date</FormLabel>
                        <DatePicker
                            selected={Date.parse(this.state.date)}
                            onChange={(date) => this.setState({ date: date })}
                        />
                        <FormText className="text-muted">
                            The date the data-collection ended
                        </FormText>
                    </FormGroup>

                    <FormGroup className="long-form-entry">
                        <FormLabel>Project Description</FormLabel>
                        <FormControl
                            as="textarea"
                            rows={4}
                            value={this.state.description}
                            onChange={(event) =>
                                this.setState({
                                    description: event.target.value,
                                })
                            }
                        ></FormControl>
                    </FormGroup>
                </Form>

                <div className="card-container">
                    <Card>
                        <Card.Header className="bg-dark text-white">
                            <h2>Mapping</h2>
                        </Card.Header>
                        <Card.Body>
                            The map below can be used to select your study
                            region. We recommend that you set the approximate
                            study location before going to the field. That way,
                            the some information from the map can be cached for
                            offline use. If there are any problems collecting
                            geolocation offline, collect the rest of the data
                            needed, save your progress, and fill in the mapping
                            information when you once again have access to
                            internet
                        </Card.Body>
                    </Card>
                </div>
                <div className="map-container">
                    <MapPolygon />
                </div>
            </div>
        );
    }
}

ProjectInformation.contextType = AppContext;

export default ProjectInformation;
