import React from "react";

const EmptyLabel = ({ children }: { children: React.ReactNode }) => {
    return <div className="text-center text-gray-500">{children}</div>;
};

export default EmptyLabel;
