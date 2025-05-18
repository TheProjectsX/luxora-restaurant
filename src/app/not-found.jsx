import Link from "next/link";
import React from "react";
import { ReactHead } from "@/components/ReactHead";

const NotFound = () => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <ReactHead>
                <title>404 - Luxora Restaurant</title>
                <meta
                    name="description"
                    content="The page you are looking for does not exist."
                />
            </ReactHead>
            <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
            <p className="text-gray-600 text-lg mb-6">
                Sorry, the page you are looking for doesn't exist.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
