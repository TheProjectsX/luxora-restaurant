import React from "react";

const EmptyLabel = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full py-10 flex flex-col items-center justify-center text-center text-gray-500 ">
            <h3 className="text-lg font-semibold">No items to show</h3>
        </div>
    );
};

export default EmptyLabel;
