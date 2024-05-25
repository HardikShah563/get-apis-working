import { useEffect, useState } from "react";

import CryptoJS from 'crypto-js';

// creating time stamp
export const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// creating signature
export const generateBokunSignature = (httpMethod: string, requestPath: string, date: string, accessKey: string): string => {
    // creating api string
    const stringToSign = `${date}${accessKey}${httpMethod}${requestPath}`;
    // secret key
    const secretkey = 'efcafcc620294a10895bc25790625734';
    const hash = CryptoJS.HmacSHA1(stringToSign, secretkey);
    const base64EncodedSignature = CryptoJS.enc.Base64.stringify(hash);
    return base64EncodedSignature;
};

export default function ApiCall() {
    const [data, setData] = useState(null);

    const httpMethod = 'GET';
    const requestPath = '/language.json/findAll';
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
        const result = await response.json();
        setData(result);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1 className="text-xl font-bold my-2">Languages Data</h1>
            {data ? JSON.stringify(data) : <>Loading...</>}
        </>
    );
};
