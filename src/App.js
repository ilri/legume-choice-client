import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/home-component/home-component";
import Sidebar from "./components/sidebar-component/sidebar-component";
import Admin from "./components/admin-component/admin-component";
function App() {
    return (
        <Router>
            <div className="full-height row-containers">
                <Sidebar />
                <div className="page-container">
                    <Switch>
                        <Route path="/admin">
                            <Admin />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
