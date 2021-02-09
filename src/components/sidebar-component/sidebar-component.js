import React from "react";
import { Link } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

import "./sidebar-component.css";

function SidebarOpen() {
    return (
        <div className="sidebar-container">
            <div className="header-container">
                <h1>LegumeCHOICE</h1>
                <Link>
                    <BsArrowBarLeft size={40} />
                </Link>
            </div>

            <div className="link-container">
                <ul>
                    <li>
                        <Link className="sidebar-nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="sidebar-nav-link" to="/admin">
                            Admin
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function SidebarClosed() {
    return (
        <Link>
            <AiOutlineMenu size={40} style={{ padding: "2em" }} />
        </Link>
    );
}

function Sidebar() {
    return <SidebarOpen />;
}

export default Sidebar;
