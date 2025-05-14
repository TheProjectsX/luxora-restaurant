import React from "react";

const Heading = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <h2
            className={`text-2xl font-bold mb-6 pb-1 border-b-4 border-blue-500 w-fit ${
                className ?? ""
            }`}
        >
            {children}
        </h2>
    );
};

export default Heading;
