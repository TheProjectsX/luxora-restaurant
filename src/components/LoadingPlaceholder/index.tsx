import { Spinner } from "flowbite-react";
import React from "react";

const LoadingPlaceholder = () => {
    return (
        <div className="flex items-center justify-center py-10">
            <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingPlaceholder;
