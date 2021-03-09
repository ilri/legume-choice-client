import React from "react";

import {
    //BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Sidebar from "./components/sidebar-component/sidebar-component";

// In this location, we have all of the details of each of the individual components
import SidebarData from "./components/sidebar-component/sidebar-data";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppContext from "./AppContext";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = AppContext;
    }

    render() {
        {
            /*basename={process.env.PUBLIC_URL + "/"}*/
        }
        return (
            <Router>
                <div>
                    <AppContext.Provider value={this.state}>
                        <Sidebar />
                        <div className="outer-page-container">
                            <div className="inner-page-container">
                                <Switch>
                                    {/* Context provider specifies which components should have access to the context */}
                                    {SidebarData.map((item) => {
                                        // Return Each of the components and their specified routes
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
                    </AppContext.Provider>
                </div>
            </Router>
        );
    }
}

export default App;
