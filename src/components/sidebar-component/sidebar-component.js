import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import "./sidebar-component.css";
import SidebarData from "./sidebar-data";

import _ from "lodash";
import AppContext from "../../AppContext";

/*
This sidebar renders depending on the contents of sidebar-data. The top-bar renders 
depending on the app context (which is shared through out all of the components).
In order for the top-bar to update, the menu button has to be pressed
*/

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        // Setting the initial state to closed
        this.state = {
            sideBarOpen: false,
            project: "?",
            projectInformationComplete: false,
            legumesComplete: false,
            dataEntryComplete: false,
            resultsComplete: false,
        };
    }

    /* This updates the top-bar variables based on the context. It checks to see if each of the individual
    context items are defined*/
    initialiseContext() {
        let newProject = "?";
        console.log(this.context);
        if (this.context.currentProject === undefined) {
            this.context.currentProject = {};
        }
        if (this.context.currentProject.projectInfo !== undefined) {
            newProject = _.cloneDeep(
                this.context.currentProject.projectInfo.projectName
            );
        }

        let projectInfoState = false;
        if (this.context.currentProject.projectInfo !== undefined) {
            projectInfoState = true;
        }

        let legumeState = false;
        if (this.context.currentProject.legumeData !== undefined) {
            legumeState = true;
        }

        let dataEntryState = false;
        if (
            this.context.currentProject.contextScores !== undefined &&
            this.context.currentProject.agroEcoData !== undefined &&
            this.context.currentProject.pairWiseScores !== undefined &&
            this.context.currentProject.participatoryMatrixScores !== undefined
        ) {
            dataEntryState = true;
        }
        let resultsState = false;
        if (this.context.currentProject.results !== undefined) {
            resultsState = true;
        }

        this.setState({
            project: newProject,
            dataEntryComplete: dataEntryState,
            projectInformationComplete: projectInfoState,
            resultsComplete: resultsState,
            legumesComplete: legumeState,
        });
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

    // All of the information for the top-bar
    returnTopBarInformation = () => {
        return (
            <div className="top-bar-items">
                <p className="top-bar-text">Project: {this.state.project}</p>

                <p className="top-bar-text">
                    Project Information:{" "}
                    {this.state.projectInformationComplete ? (
                        <BsCheck size={40} />
                    ) : (
                        "?"
                    )}
                </p>
                <p className="top-bar-text">
                    Legume Information:{" "}
                    {this.state.legumesComplete ? <BsCheck size={40} /> : "?"}
                </p>
                <p className="top-bar-text">
                    Data Entry:{" "}
                    {this.state.dataEntryComplete ? <BsCheck size={40} /> : "?"}
                </p>
                <p className="top-bar-text">
                    Results:{" "}
                    {this.state.resultsComplete ? <BsCheck size={40} /> : "?"}
                </p>
            </div>
        );
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

                    <div>
                        <ul className="sidebar-list">
                            {SidebarData.map((item, index) => {
                                return (
                                    <Link
                                        key={index + "-link-item"}
                                        className={item.cName}
                                        to={item.path}
                                        onClick={this.toggleSidebar}
                                    >
                                        <div>
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

Sidebar.contextType = AppContext;

export default Sidebar;
