import React, { Component } from "react";

import { AiOutlineDatabase, AiFillHome } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";

import Home from "../home-component/home-component";
import Admin from "../admin-data-entry-component/admin-data-entry-component";
import Login from "../login-component/login-component";
import DataEntry from "../data-entry-component/data-entry-component";

// Set the icon size for the imported icons
const iconSize = 30;

const sidebarlinkcName = "sidebar-nav-link";

const SidebarData = [
    {
        title: "Home",
        component: <Home />,
        path: "/home",
        icon: <AiFillHome size={iconSize} />,
        cName: sidebarlinkcName,
    },
    {
        title: "Data Entry",
        component: <DataEntry />,
        path: "/data-entry",
        icon: <AiOutlineDatabase size={iconSize} />,
        cName: sidebarlinkcName,
    },
    {
        title: "Admin",
        component: <Admin />,
        path: "/admin",
        icon: <RiUserSettingsLine size={iconSize} />,
        cName: sidebarlinkcName,
    },
    {
        title: "Login",
        component: <Login />,
        path: "/login",
        icon: <VscAccount size={iconSize} />,
        cName: sidebarlinkcName,
    },
];

export default SidebarData;
