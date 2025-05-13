"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { UrlObject } from "url";

const NavLink = ({
    children,
    className,
    href,
    label,
    Icon,
}: {
    children?: React.ReactNode;
    href: string | UrlObject;
    label?: string | React.ReactElement;
    Icon?: IconType;
    className?: string;
}) => {
    const currentPathname = usePathname();

    return (
        <Link
            href={href}
            className={`flex items-center gap-2 px-5 py-2.5 hover:bg-slate-100 rounded-sm active:scale-95 transition-all duration-300 md:duration-100 ${
                href === currentPathname ? "active" : ""
            } ${className ?? ""}`}
        >
            {Icon && (
                <span className="w-6">
                    <Icon className="text-xl" />
                </span>
            )}
            <span className="text-sm">{children ?? label}</span>
        </Link>
    );
};

export default NavLink;
