import React, { Component } from "react";

import { AiOutlineDatabase, AiFillHome, AiOutlineSend } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { FaLeaf, FaDatabase } from "react-icons/fa";
import { GoGraph, GoSettings } from "react-icons/go";
import Home from "../home-component/home-component";
import Admin from "../admin-data-entry-component/admin-data-entry-component";
import Login from "../login-component/login-component";
import DataEntry from "../data-entry-component/data-entry-component";
import Results from "../results-component/results-component";
import ViewContext from "../view-context-component/view-context-component";
import ProjectInformation from "../project-information-component/project-information-component";
import ManageData from "../submit-data-component/submit-data-component";
import LegumesComponent from "../legumes-component/legumes-component";

// Set the icon size for the imported icons
const iconSize = 30;

const sidebarlinkcName = "sidebar-nav-link";

const SidebarData = [
    {
        title: "1. Information",
        routeKey: "information-route",
        component: <Home />,
        path: "/info",
        icon: <IoIosInformationCircleOutline size={iconSize} />,
        cName: sidebarlinkcName,
    },
    {
        title: "2. Project Information",
        routeKey: "project-info-route",
        component: <ProjectInformation />,
        path: "/project-info",

        icon: <GoSettings size={iconSize} />,
        cName: sidebarlinkcName,
    },
    {
        title: "3. Legumes",
        routeKey: "legume-route",
        component: <LegumesComponent />,
        path: "/legumes",

        icon: <FaLeaf size={iconSize} />,
        cName: sidebarlinkcName,
    },
    {
        title: "4. Data Entry",
        routeKey: "data-entry-route",
        component: <DataEntry />,
        path: "/data-entry",

        icon: <AiOutlineDatabase size={iconSize} />,
        cName: sidebarlinkcName,
    },

    {
        title: "5. Results",
        routeKey: "results-route",
        component: <Results />,
        path: "/results",

        icon: <GoGraph size={iconSize} />,
        cName: sidebarlinkcName,
    },

    {
        title: "6. Manage Data",
        routeKey: "manage-data-route",
        component: <ManageData />,
        path: "/manage-data",
        icon: <BsFolder size={iconSize} />,
        cName: sidebarlinkcName,
    },

    // {
    //     title: "View App Data",
    //     routeKey: "app-data-route",
    //     component: <ViewContext />,
    //     path: "/app-data",
    //     icon: <FaDatabase size={iconSize} />,
    //     cName: sidebarlinkcName,
    // },
];

export default SidebarData;
