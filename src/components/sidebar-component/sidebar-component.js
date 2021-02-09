import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import "./sidebar-component.css";
import SidebarData from "./sidebar-data";

/*function SidebarOpen(props) {
    return (
        <div
            className={
                props.status ? "sidebar-container active" : "sidebar-container"
            }
        >
            <div className="header-container">
                <h1>LegumeCHOICE</h1>
                <a href="#">
                    <IoIosArrowBack size={30} color="white" />
                </a>
            </div>

            <div className="link-container">
                <ul>
                    {SidebarData.map((item, index) => {
                        return (
                            <Link className={item.cName} to={item.path}>
                                <li key={index}>
                                    {item.icon}
                                    {item.title}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}*/

/*function SidebarClosed(props) {
    return (
        <div className="menu-button">
            <a href="#">
                <AiOutlineMenu size={40} style={{ padding: "2em" }} />
            </a>
            <SidebarOpen status={false} />
        </div>
    );
}*/

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    toggleSidebar = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    render() {
        return (
            <div className="container_row">
                <div className="menu-button">
                    <a onClick={this.toggleSidebar} href="#">
                        <AiOutlineMenu size={40} style={{ padding: "2em" }} />
                    </a>
                </div>
                <div
                    className={
                        this.state.open
                            ? "sidebar-container active"
                            : "sidebar-container"
                    }
                >
                    <div className="header-container">
                        <h1>LegumeCHOICE</h1>
                        <a onClick={this.toggleSidebar} href="#">
                            <IoIosArrowBack size={30} color="white" />
                        </a>
                    </div>

                    <div className="link-container">
                        <ul>
                            {SidebarData.map((item, index) => {
                                return (
                                    <Link className={item.cName} to={item.path}>
                                        <li key={index}>
                                            {item.icon}
                                            {item.title}
                                        </li>
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {console.log(this.state.open)}
            </div>
        );
    }
}

export default Sidebar;
