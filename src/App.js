import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Home from "./components/home-component/home-component";
import Sidebar from "./components/sidebar-component/sidebar-component";
import Admin from "./components/admin-component/admin-component";
import Login from "./components/login-component/login-component";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <Router basename="legume-choice-client">
            <div className="full-height row-containers">
                <Sidebar />
                <div className="outer-page-container">
                    <div className="inner-page-container">
                        <Switch>
                            <Redirect exact from="/" to="/home" />
                            <Route exact path="/home">
                                <Home />
                            </Route>
                            <Route exact path="/admin">
                                <Admin />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
