import React, { Component } from "react";
import AppContext from "../../AppContext";

import MapPolygon from "../map-polygon-component/map-polygon-component";

import { v4 as uuidv4 } from "uuid";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./project-information-component.css";

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
    static contextType = AppContext;

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
        if (this.context.projectInfo === undefined) {
            const newContext = this.state;
            this.context.projectInfo = newContext;
        }
        if (this.context.projectInfo !== undefined) {
            const newState = this.context.projectInfo;
            this.setState(newState);
        }

        console.log(this.state);
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
        console.log(this.state);
        const newContext = this.state;
        this.context.projectInfo = newContext;
    }

    render() {
        return (
            <div>
                <h1>Project info</h1>
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
                        <FormControl as="select">
                            {this.state.countryNames.map((country) => {
                                return <option>{country}</option>;
                            })}
                        </FormControl>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Major Region</FormLabel>
                        <FormControl></FormControl>
                        <FormText className="text-muted">
                            e.g. state/province
                        </FormText>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Minor Region</FormLabel>
                        <FormControl></FormControl>
                        <FormText className="text-muted">e.g. county</FormText>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Community Name</FormLabel>
                        <FormControl></FormControl>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Community Type</FormLabel>
                        <FormControl></FormControl>
                        <FormText className="text-muted">
                            e.g. village/sub-village
                        </FormText>
                    </FormGroup>

                    <FormGroup className="short-form-entry">
                        <FormLabel>Date</FormLabel>
                        <DatePicker
                            selected={this.state.date}
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

                <div className="map-container">
                    <h2>Geolocation</h2>
                    <MapPolygon />
                </div>
            </div>
        );
    }
}

export default ProjectInformation;
