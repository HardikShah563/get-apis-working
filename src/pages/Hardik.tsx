import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentDateTime, generateBokunSignature } from "@/lib/ApiCall";

// Define the interface for the product and photo objects
interface Product {
    id: number;
    title: string;
    description: string;
    flags: any[];
    size: number;
    children: Product[];
    keyPhoto: {
        id: number;
        originalUrl: string;
        description: string | null;
        alternateText: string | null;
        height: string;
        width: string;
        flags: any[];
        derived: {
            name: string;
            url: string;
            cleanUrl: string;
        }[];
        fileName: string;
    } | null;
    photos: {
        id: number;
        originalUrl: string;
        description: string | null;
        alternateText: string | null;
        height: string | null;
        width: string | null;
        flags: any[];
        derived: {
            name: string;
            url: string;
            cleanUrl: string;
        }[];
        fileName: string;
    }[];
}

export default function Hardik() {
    const [products, setProducts] = useState<Product>();

    const httpMethod = 'GET';
    const requestPath = '/product-list.json/list';
    const date = getCurrentDateTime();
    const accessKey = '380b5c5a141b43aea56d567e447061f1';

    async function getData() {
        const signature = generateBokunSignature(httpMethod, requestPath, date, accessKey);

        const response = await fetch(`https://api.bokun.io${requestPath}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-Bokun-Date': date,
                'X-Bokun-Signature': signature,
                'X-Bokun-AccessKey': accessKey
            } as HeadersInit,
        });
        const result: Product[] = await response.json();
        setProducts(result[0]);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Hello Hardik</h1>

            {/* {products[0].children.map(product => (
                <li key={product.title}>{product.title}</li>
            ))} */}

            {products && products.children.map((child) => (
                <div className="">
                    <h1 className="text-xl font-semibold">{child.title}</h1>
                    <p>{child.description}</p>
                    {/* <div className="flex">
                        {child.photos.map((photo) => (
                            <div key={photo.id}>
                                <img src={photo.derived[1].url} alt="" width={"200px"} />
                            </div>
                        ))}
                    </div> */}

                    <div className="grid grid-cols-2 w-[400px]">
                        <img src={child.keyPhoto?.derived[1].url} alt="key photo" className="h-full w-auto" />

                        <div className="">
                            <img src={child.photos[1]?.derived[1].url} alt="" />
                            <img src={child.photos[2]?.derived[1].url} alt="" />
                        </div>
                    </div>

                    {child.photos.length > 1 ? (
                        <div className="grid grid-cols-2 w-[400px]">
                            {/* <img src={child.keyPhoto?.derived[1].url} alt="key photo" className="h-full w-auto" /> */}
                            <img src={child.photos[0]?.derived[1].url} alt="" />

                            <div className="">
                                <img src={child.photos[1]?.derived[1].url} alt="" />
                                <img src={child.photos[2]?.derived[1].url} alt="" />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <img src={child.photos[0]?.derived[1].url} alt="" />
                        </div>
                    )}

                    <div>{child.size} Experience{child.size > 1 ? "s" : ""}</div>
                    <div>
                        <Link to={`/products/${child.id}`}>Lesgoo</Link>
                    </div>
                </div>
            ))}

            {/* {products && JSON.stringify(products.children)} */}
        </>
    );
};
