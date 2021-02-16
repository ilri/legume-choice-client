import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import "./sidebar-component.css";
import SidebarData from "./sidebar-data";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        // Setting the initial state to closed
        this.state = { open: false };
    }

    // When this function is trigered, state of the side-bar is change, which triggers a change in the css
    toggleSidebar = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    render() {
        return (
            <div className="container_row">
                <div className="menu-button">
                    <a onClick={this.toggleSidebar}>
                        <AiOutlineMenu size={50} color="black" />
                    </a>
                </div>

                <div
                    className={
                        this.state.open
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
