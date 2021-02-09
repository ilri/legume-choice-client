import React from "react";
import "./sidebar-component.css";
function Sidebar(props) {
    return (
        <div className="sidebar-container">
            <h1>LegumeCHOICE</h1>
            <ul>
                <li>Home</li>
                <li>Form Component</li>
                <li>Administration</li>
            </ul>
        </div>
    );
}

export default Sidebar;
