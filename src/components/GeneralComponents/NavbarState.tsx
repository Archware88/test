// components/GeneralComponents/Navbar.tsx

"use client";

import { useEffect, useState } from "react";
import GuestNavbar from "./GuestNavbar";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token);
    }, []);

    return isAuthenticated ? <UserNavbar /> : <GuestNavbar />;
};

export default Navbar;
