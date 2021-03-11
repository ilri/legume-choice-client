import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import AppContext from "../../AppContext";

import _ from "lodash";

import "./login-component.css";

class Login extends React.Component {
    // Initialising context
    //static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            authenticated: false,
        };
    }

    componentDidMount() {
        if (this.context.user !== undefined) {
            const newState = _.cloneDeep(this.context.user);
            this.setState(newState);
        }

        if (this.context.user === undefined) {
            const newContext = _.cloneDeep(this.state);
            this.context.user = newContext;
        }
    }
    componentDidUpdate() {
        const newContext = _.cloneDeep(this.state);
        this.context.user = newContext;
    }

    handleChange = (event, props) => {
        this.setState({
            [props.variable]: event.target.value,
        });

        this.context.user = _.cloneDeep(this.state);
    };

    authenticateUser = (event) => {
        event.preventDefault();
        this.setState({
            authenticated: true,
        });
    };

    render() {
        return (
            <div className="form-container">
                <h1>Login</h1>
                <Form>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={this.state.username}
                        onChange={(event) =>
                            this.handleChange(event, { variable: "username" })
                        }
                    />
                    {/* <Form.Label>Project ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={this.state.projectID}
                        onChange={(event) =>
                            this.handleChange(event, { variable: "projectID" })
                        }
                    /> */}
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={this.state.password}
                        onChange={(event) =>
                            this.handleChange(event, { variable: "password" })
                        }
                    />

                    <Button
                        className="submitButton"
                        type="submit"
                        onClick={this.authenticateUser}
                    >
                        Authenticate
                    </Button>
                </Form>
            </div>
        );
    }
}

Login.contextType = AppContext;

export default Login;
