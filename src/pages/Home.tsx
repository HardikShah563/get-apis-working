import { useState, useEffect } from "react";
import ApiCall from "@/lib/ApiCall";

export default function Home() {
    const [data, setData] = useState(null);


    return (
        <>
            <section className="p-2">
                <div className="p-2">
                    <ApiCall />
                </div>
            </section>
        </>
    );
};
