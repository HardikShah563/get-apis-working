import { createBrowserRouter } from "react-router-dom"
// importing components
// importing pages
import Layout from "@/pages/Layout";
import Home from "@/pages/Home";

import Shawn from "@/pages/Shawn";
import Adarsh from "@/pages/Adarsh";
import Advait from "@/pages/Advait";
import Mohit from "@/pages/Mohit";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            }, {
                path: "/shawn",
                element: <Shawn />
            }, {
                path: "/adarsh",
                element: <Adarsh />
            }, {
                path: "/advait",
                element: <Advait />
            }, {
                path: "/mohit",
                element: <Mohit />
            }
        ]
    }
]);

export default router;