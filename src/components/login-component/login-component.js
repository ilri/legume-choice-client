import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import "./login-component.css";

class Login extends Component {
    /////////////////////////////////////////////////////////////////////////////////
    // Initialising variables
    /////////////////////////////////////////////////////////////////////////////////
    constructor(props) {
        super(props);
        //console.log("Constructor");

        this.state = {
            user: "",
        };
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <Form>
                    <Form.Control type="text" />
                    <Button>Login</Button>
                </Form>
            </div>
        );
    }
}

export default Login;
