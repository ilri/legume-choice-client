import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

import "./login-component.css";

class Login extends Component {
    /////////////////////////////////////////////////////////////////////////////////
    // Initialising variables
    /////////////////////////////////////////////////////////////////////////////////
    constructor(props) {
        super(props);
        console.log("Constructor");
        this.state = {
            users: [],
            formEntry: {
                username: "",
                email: "",
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    /////////////////////////////////////////////////////////////////////////////////
    // Loaded when the page loads. Fetches entries from the database
    /////////////////////////////////////////////////////////////////////////////////
    componentDidMount() {
        axios({
            method: "get",
            url: "https://l-gorman.com/api/users",
            headers: {
                accept: "application/json",
            },
        })
            .then((response) => {
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /////////////////////////////////////////////////////////////////////////////////
    // Function for adding user
    /////////////////////////////////////////////////////////////////////////////////
    addUser = (event) => {
        event.preventDefault();
        console.log("About to update state");
        const prevUsers = this.state.users;
        const newUser = this.state.formEntry;
        const usernameNew = this.state.formEntry.username;
        const emailNew = this.state.formEntry.email;

        // Checking if the username exists already
        if (prevUsers.some((user) => user.username === usernameNew)) {
            alert("Username already exists");
            return;
        }

        // Checking if the email exists already
        if (prevUsers.some((user) => user.email === emailNew)) {
            alert("email already registered");
            return;
        }

        // Updating state
        this.setState({
            users: [...prevUsers, newUser],
            formEntry: {
                username: "",
                email: "",
            },
        });

        // Sending the update values to the database
        axios({
            method: "post",
            url: "https://l-gorman.com/api/users",
            data: newUser,
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

    handleChange = (event) => {
        event.preventDefault();
        const name = [event.target.name];
        const value = event.target.value;
        this.setState((prevState) => ({
            formEntry: {
                ...prevState.formEntry,
                [name]: value,
            },
        }));
    };
    /////////////////////////////////////////////////////////////////////////////////
    // Function for deleting user
    /////////////////////////////////////////////////////////////////////////////////
    deleteUser = (event, params = {}) => {
        event.preventDefault();

        const oldUsers = this.state.users;
        const newUser = oldUsers.filter(
            (user) =>
                user.email !== params.email || user.username !== params.username
        );
        console.log(newUser);

        this.setState((prevState) => ({
            users: newUser,
            formEntry: {
                ...prevState,
            },
        }));

        /*axios({
            method: "post",
            url: "https://l-gorman.com/api/users/delete/" + params.id,
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
            });*/
    };

    /////////////////////////////////////////////////////////////////////////////////
    // Checking if the component has updated
    /////////////////////////////////////////////////////////////////////////////////
    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1>Welcome to the login component</h1>
                <div className="form-container">
                    <h2>New Users</h2>
                    <Form onSubmit={this.addUser}>
                        <Form.Group controlId="basicusername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                name="username"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="basicemail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Button
                            className="delete-button"
                            variant="primary"
                            type="submit"
                        >
                            Add User
                        </Button>
                    </Form>
                </div>
                <div className="form-container">
                    <h2>Users</h2>
                    {this.state.users.map((user, index) => {
                        return (
                            <div
                                className="user-container"
                                key={"user " + user.email + " " + user.username}
                            >
                                {index + 1}. {user.username} ({user.email})
                                <div className="deleteButton">
                                    <Button
                                        onClick={(e) =>
                                            this.deleteUser(e, {
                                                id: user._id,
                                                username: user.username,
                                                email: user.email,
                                            })
                                        }
                                    >
                                        Delete User
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                    <div className="user-container">
                        <Button className="deleteButton">Submit</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
