import React from "react";

/* This is the main component for loading the application. It can be split into two primary components 
1. We have the sidebar component, (found in the components folder). This includes the sidebar, and the topbar. It stays 
fixed on the page.
2. We have the page component. This is a space which is preserved for loading each of the individual pages as they are loaded.*/

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
    render() {
        return (
            <Router>
                <div>
                    {/* Context provider specifies which components should have access to the context */}
                    <AppContext.Provider value={{}}>
                        <Sidebar />
                        <div className="outer-page-container">
                            <div className="inner-page-container">
                                <Switch>
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
                                    <Redirect exact from="/" to="/info" />
                                </Switch>
                            </div>
                        </div>
                    </AppContext.Provider>
                </div>
            </Router>
        );
    }
}

App.contextType = AppContext;

export default App;
