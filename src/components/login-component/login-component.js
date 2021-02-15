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
            usersLocal: [],
            usersOnline: [],

            formEntry: {
                username: "",
                email: "",
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.addUserlocal = this.addUserlocal.bind(this);
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
                this.setState({
                    usersLocal: response.data,
                    usersOnline: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /////////////////////////////////////////////////////////////////////////////////
    // Function for adding user
    /////////////////////////////////////////////////////////////////////////////////
    addUserlocal = (event) => {
        event.preventDefault();
        console.log("About to update state");
        const prevUsers = this.state.usersLocal;
        const newUser = this.state.formEntry;

        // Checking if the username exists already
        if (newUser.username === "") {
            alert("No username entered");
            return;
        }
        if (prevUsers.some((user) => user.username === newUser.username)) {
            alert("Username already exists");
            return;
        }

        // Checking if the email exists already
        if (prevUsers.some((user) => user.email === newUser.email)) {
            alert("email already registered");
            return;
        }

        // Updating state
        this.setState({
            usersLocal: [...prevUsers, newUser],
            formEntry: {
                username: "",
                email: "",
            },
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

        const oldUsers = this.state.usersLocal;
        const newUser = oldUsers.filter(
            (user) =>
                user.email !== params.email || user.username !== params.username
        );
        console.log(newUser);

        this.setState((prevState) => ({
            usersLocal: newUser,
        }));
    };

    /////////////////////////////////////////////////////////////////////////////////
    // Subset Arrays
    /////////////////////////////////////////////////////////////////////////////////

    subsetArrays = (array, variable) => {
        return array.map((item) => {
            return item[variable];
        });
    };

    /////////////////////////////////////////////////////////////////////////////////
    // Making Changes to Db
    /////////////////////////////////////////////////////////////////////////////////
    saveChanges = (event) => {
        //event.preventDefault();

        const usersLocal = this.state.usersLocal;
        const usersOnline = this.state.usersOnline;

        //console.log(this.subsetArrays(usersOnline, "email"));
        let usersToAdd = [];
        let usersToDelete = [];

        usersToAdd = usersLocal.filter(
            (localusers) =>
                !this.subsetArrays(usersOnline, "email").includes(
                    localusers.email
                ) &&
                !this.subsetArrays(usersOnline, "username").includes(
                    localusers.username
                )
        );

        usersToDelete = usersOnline.filter(
            (localusers) =>
                !this.subsetArrays(usersLocal, "email").includes(
                    localusers.email
                ) &&
                !this.subsetArrays(usersLocal, "username").includes(
                    localusers.username
                )
        );

        console.log(usersToDelete);

        //console.log(usersToDelete);

        if (usersToAdd.length > 0) {
            axios({
                method: "post",
                url: "https://l-gorman.com/api/users/insertmany/",
                data: { newUsers: usersToAdd },
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
        }

        if (usersToDelete.length > 0) {
            axios({
                method: "post",
                url: "https://l-gorman.com/api/users/deletemany/",
                data: { deleteUsers: usersToDelete },
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
        }

        this.setState(() => ({
            usersOnline: usersLocal,
        }));
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
                <h1>Login component</h1>
                <div className="form-container">
                    <h2>New Users</h2>
                    <Form onSubmit={this.addUserlocal}>
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
                                type="email"
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
                    {this.state.usersLocal.map((user, index) => {
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
                        <Button
                            onClick={this.saveChanges}
                            className="deleteButton"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
