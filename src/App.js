import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Sidebar from "./components/sidebar-component/sidebar-component";

// In this location, we have all of the details of each of the individual components
import SidebarData from "./components/sidebar-component/sidebar-data";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <Router basename="legume-choice-client">
            <div>
                <Sidebar />
                <div className="outer-page-container">
                    <div className="inner-page-container">
                        <Switch>
                            {SidebarData.map((item) => {
                                // A function to return each of the components
                                // Each component, and all of its
                                return (
                                    <Route
                                        exact
                                        path={item.path}
                                        key={item.routeKey}
                                    >
                                        {item.component}
                                    </Route>
                                );
                            })}
                            <Redirect exact from="/" to="/home" />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
