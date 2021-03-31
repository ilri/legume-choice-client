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

// This project ID is loaded when the component is first called
const projectID = uuidv4();

/* This is the main component for all of the metadata. There are two primary sub-components.
1. The meta-data form, a basic form component to enter user information and project information.
2. The mapping component. Most of which was adapted from the draggable marker example in the react-leaflet documentation. */

class ProjectInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: "",
                surname: "",
                email: "",
                institution: "",
            },
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
        // Ensuring the window starts at the top (It was starting at the map componenent originally)
        window.scrollTo(0, 0);

        /* Checking whether previous context exists. If the context exists then
        replace the current state with the context*/

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
    }

    componentDidUpdate() {
        // Updating context based on new state
        const newContext = _.cloneDeep(this.state);
        this.context.currentProject.projectInfo = newContext;
    }

    render() {
        return (
            <div className="project-info-container">
                {/* USER FORM */}
                <div className="card-container">
                    <Card>
                        <Card.Header className="bg-dark text-white">
                            <h2>User Information</h2>
                        </Card.Header>
                    </Card>
                </div>

                <Form className="form-display">
                    <FormGroup className="short-form-entry">
                        <FormLabel>First Name</FormLabel>
                        <FormControl
                            type="text"
                            value={this.state.user.firstname}
                            onChange={(event) =>
                                this.setState((prevState) => {
                                    return {
                                        ...prevState,
                                        user: {
                                            ...prevState.user,
                                            firstname: event.target.value,
                                        },
                                    };
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup className="short-form-entry">
                        <FormLabel>Surname</FormLabel>
                        <FormControl
                            type="text"
                            value={this.state.user.surname}
                            onChange={(event) =>
                                this.setState((prevState) => {
                                    return {
                                        ...prevState,
                                        user: {
                                            ...prevState.user,
                                            surname: event.target.value,
                                        },
                                    };
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup className="short-form-entry">
                        <FormLabel>Institution</FormLabel>
                        <FormControl
                            type="text"
                            value={this.state.user.institution}
                            onChange={(event) =>
                                this.setState((prevState) => {
                                    return {
                                        ...prevState,
                                        user: {
                                            ...prevState.user,
                                            institution: event.target.value,
                                        },
                                    };
                                })
                            }
                        />
                        <FormText>
                            The organisation responsible for data collection
                        </FormText>
                    </FormGroup>
                    <FormGroup className="short-form-entry">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
                            value={this.state.user.email}
                            onChange={(event) =>
                                this.setState((prevState) => {
                                    return {
                                        ...prevState,
                                        user: {
                                            ...prevState.user,
                                            email: event.target.value,
                                        },
                                    };
                                })
                            }
                        />
                    </FormGroup>
                </Form>
                {/* PROJECT INFORMATION FORM */}
                <div className="card-container">
                    <Card>
                        <Card.Header className="bg-dark text-white">
                            <h2>Project Metadata</h2>
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
                {/* lOCATION INFORMATION  */}

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
