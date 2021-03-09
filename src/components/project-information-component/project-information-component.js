import React, { Component } from "react";
import AppContext from "../../AppContext";

import MapPolygon from "../map-polygon-component/map-polygon-component";

import { countryList } from "./countries-list";
import {
    Button,
    Form,
    FormControl,
    FormLabel,
    FormGroup,
} from "react-bootstrap";

let countryNames = [];

countryList.forEach((country) => {
    countryNames.push(country.name);
});

class ProjectInformation extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            userLocationFound: false,
            userLocation: {},
            projectName: "",
            projectID: "",
            country: "",
            countryNames: countryNames,
        };
    }

    componentDidMount() {
        if (this.context.projectInfo === undefined) {
            const newContext = this.state;
            this.context = newContext;
        }
        if (this.context.projectInfo !== undefined) {
            const newState = this.context.projectInfo;
            this.setState(newState);
        }

        console.log(this.state);
        console.log(this.state.countryNames);
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
    }

    render() {
        return (
            <div>
                <h1>Project info</h1>
                <Form>
                    <FormGroup>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl></FormControl>
                        <Form.Text className="text-muted">
                            A memorable name for your project.
                        </Form.Text>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Project ID</FormLabel>
                        <FormControl></FormControl>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Country</FormLabel>
                        <FormControl as="select">
                            {this.state.countryNames.map((country) => {
                                return <option>{country}</option>;
                            })}
                        </FormControl>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Major Region</FormLabel>
                        <FormControl></FormControl>
                        <Form.Text className="text-muted">
                            e.g. state/province
                        </Form.Text>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Minor Region</FormLabel>
                        <FormControl></FormControl>
                        <Form.Text className="text-muted">
                            e.g. county
                        </Form.Text>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Community Name</FormLabel>
                        <FormControl></FormControl>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Community Type</FormLabel>
                        <FormControl></FormControl>
                        <Form.Text className="text-muted">
                            e.g. village/sub-village
                        </Form.Text>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Meeting Date</FormLabel>
                        <FormControl></FormControl>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl as="textarea" rows={4}></FormControl>
                    </FormGroup>
                </Form>
                <h2>Geolocation</h2>
                <MapPolygon />
            </div>
        );
    }
}

export default ProjectInformation;
