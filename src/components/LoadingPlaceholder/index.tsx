import { Spinner } from "flowbite-react";
import React from "react";

const LoadingPlaceholder = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner light size="md" />
        </div>
    );
};

export default LoadingPlaceholder;
