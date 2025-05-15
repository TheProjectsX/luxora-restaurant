import { Spinner } from "flowbite-react";
import React from "react";

const LoadingPlaceholder = () => {
    return (
        <div className="flex items-center justify-center py-10">
            <Spinner light size="lg" />
        </div>
    );
};

export default LoadingPlaceholder;
