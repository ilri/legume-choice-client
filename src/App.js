import React from "react";

import "./App.css";

import Home from "./components/home-component/home-component";
import Sidebar from "./components/sidebar-component/sidebar-component";
import Admin from "./components/admin-component/admin-component";
function App() {
    return (
        <div className="full-height row-containers">
            <Sidebar />
            <div className="page-container">
                <Home />
            </div>
        </div>
    );
}

export default App;
