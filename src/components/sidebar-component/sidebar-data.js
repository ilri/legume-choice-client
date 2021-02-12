import React, { Component } from "react";

import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";

const iconSize = 30;

const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiFillHome size={iconSize} />,
        cName: "sidebar-nav-link",
    },
    {
        title: "Admin",
        path: "/admin",
        icon: <RiUserSettingsLine size={iconSize} />,
        cName: "sidebar-nav-link",
    },
    {
        title: "Login",
        path: "/login",
        icon: <VscAccount size={iconSize} />,
        cName: "sidebar-nav-link",
    },
];

export default SidebarData;
