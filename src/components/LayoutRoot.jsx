import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

/**
 * username: ZZDiamond
 * password: dinamond@123
 */

export default function LayoutRoot() {
    const navigate = useNavigate();

    useEffect( () => {
        const userStorage = localStorage.getItem("user");
        if (!userStorage) {
            navigate("/sign-in");
        }
    })


    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}