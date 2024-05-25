// importing from react
import { RouterProvider } from "react-router-dom";
// importing router
import router from "@/router/router";

export default function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};
