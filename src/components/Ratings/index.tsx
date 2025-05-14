import React from "react";

const Ratings = ({
    children,
    element,
    className,
    count,
    rating,
}: {
    children: React.ReactElement<any, any>;
    element?: React.ReactElement<any, any>;
    className?: string;
    count: number;
    rating: number;
}) => {
    return (
        <>
            {Array.from({ length: count }).map((_, idx) => (
                <span key={idx}>
                    {React.cloneElement(
                        idx < rating ? element ?? children : children,
                        {
                            className:
                                idx < rating
                                    ? element?.props.className ?? className
                                    : children.props.className,
                        }
                    )}
                </span>
            ))}
        </>
    );
};

export default Ratings;
