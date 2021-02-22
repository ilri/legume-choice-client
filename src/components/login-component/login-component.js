import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import AppContext from "../../AppContext";

import "./login-component.css";

class Login extends React.Component {
    // Initialising context
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            projectID: "",
            password: "",
            authenticated: false,
        };
    }

    componentDidMount() {
        if (this.context.user !== undefined) {
            const newState = this.context.user;
            this.setState(newState);
        }
    }
    componentDidUpdate() {
        const newContext = this.state;
        this.context.user = newContext;
        console.log(this.context);
    }

    handleChange = (event, props) => {
        this.setState({
            [props.variable]: event.target.value,
        });

        this.context.user = this.state;
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
                <h1>Project Information</h1>
                <Form>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={this.state.username}
                        onChange={(event) =>
                            this.handleChange(event, { variable: "username" })
                        }
                    />
                    <Form.Label>Project ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={this.state.projectID}
                        onChange={(event) =>
                            this.handleChange(event, { variable: "projectID" })
                        }
                    />
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

export default Login;
