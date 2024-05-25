// importing from react
import { Outlet } from "react-router";
// importing components
import { Navbar } from "@/components/navbar/navbar";

export default function Layout() {
    return (
        <>
            {/* navbar acts as a header on every page */}
            <Navbar />
            {/* Outlet to render other pages below this page */}
            <Outlet />
        </>
    );
};
