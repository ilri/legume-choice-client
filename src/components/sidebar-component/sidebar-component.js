import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import "./sidebar-component.css";
import SidebarData from "./sidebar-data";

import AppContext from "../../AppContext";

class Sidebar extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);

        // Setting the initial state to closed

        this.state = {
            sideBarOpen: false,
            user: "",
            project: "",
        };
    }

    componentDidMount() {
        if (
            (this.context.user !== undefined) &
            (this.context.projectInfo !== undefined)
        ) {
            this.setState(
                {
                    user: this.context.user.username,
                    project: this.context.projectInfo.projectName,
                },
                () => console.log(this.state)
            );
        }
    }

    componentDidUpdate() {}

    initialiseContext() {
        if (
            (this.context.user !== undefined) &
            (this.context.projectInfo !== undefined)
        ) {
            this.setState(
                {
                    user: this.context.user.username,
                    project: this.context.projectInfo.projectName,
                },
                () => console.log(this.state)
            );
        }
    }

    // When this function is trigered, state of the side-bar is change, which triggers a change in the css
    toggleSidebar = () => {
        this.setState(
            {
                sideBarOpen: !this.state.sideBarOpen,
            },
            () => this.initialiseContext()
        );
    };

    returnTopBarInformation = () => {
        if ((this.state.user === "") | (this.state.project === "")) {
            return (
                <div className="top-bar-items">
                    <p className="top-bar-text">User:</p>
                    <p className="top-bar-text">Project:</p>
                </div>
            );
        }

        if ((this.state.user !== "") & (this.state.project !== "")) {
            return (
                <div className="top-bar-items">
                    <p className="top-bar-text">User: {this.state.user}</p>
                    <p className="top-bar-text">
                        Project: {this.state.project}
                    </p>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="container_row">
                <div className="top-bar">
                    <a onClick={this.toggleSidebar}>
                        <AiOutlineMenu size={50} color="white" />
                    </a>
                    {this.returnTopBarInformation()}
                </div>

                <div
                    className={
                        this.state.sideBarOpen
                            ? "sidebar-container active"
                            : "sidebar-container"
                    }
                >
                    <div
                        key="sidebar-header "
                        className="sidebar-header-container"
                    >
                        <h2>LegumeCHOICE</h2>

                        <a onClick={this.toggleSidebar}>
                            <div className="close-menu-icon">
                                <IoIosArrowBack size={40} color="white" />
                            </div>
                        </a>
                    </div>

                    <div className="link-container">
                        <ul>
                            {SidebarData.map((item, index) => {
                                return (
                                    <Link
                                        key={index + "-link-item"}
                                        className={item.cName}
                                        to={item.path}
                                        onClick={this.toggleSidebar}
                                    >
                                        <div className="sidebar-list-item">
                                            <li
                                                className="sidebar-list-item"
                                                key={index + "-list-item"}
                                            >
                                                <span className="side-bar-link-icon">
                                                    {item.icon}
                                                </span>
                                                <span className="side-bar-link-text">
                                                    {item.title}
                                                </span>
                                            </li>
                                        </div>
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
