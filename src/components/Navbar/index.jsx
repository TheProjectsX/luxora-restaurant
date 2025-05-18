"use client";

import {
    Avatar,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarCollapse,
    NavbarToggle,
} from "flowbite-react";
import NavLink from "../NavLink";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const NavbarComponent = () => {
    const { data: session, update } = useSession();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/admin") {
            update();
        }
    }, [pathname]);

    return (
        <header className="shadow-md mb-4">
            <Navbar className="max-width" fluid rounded>
                <Link
                    className="flex items-center hover:underline underline-offset-4"
                    href="/"
                >
                    <img
                        src="/favicon.png"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite React Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Luxora
                    </span>
                </Link>
                <div className="flex md:order-2 gap-2">
                    <NavbarToggle />
                    {session?.user && (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    alt="User settings"
                                    img="https://i.ibb.co/jkQk36Kg/2.jpg"
                                    rounded
                                />
                            }
                        >
                            <DropdownHeader>
                                <span className="block text-sm">
                                    {session?.user?.name}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {session?.user?.email}
                                </span>
                            </DropdownHeader>
                            <Link href="/admin">
                                <DropdownItem>Dashboard</DropdownItem>
                            </Link>
                            <DropdownDivider />
                            <DropdownItem onClick={() => signOut()}>
                                Sign out
                            </DropdownItem>
                        </Dropdown>
                    )}
                    {session !== undefined && !session && (
                        <Link href="/signin">
                            <Button>Sign In</Button>
                        </Link>
                    )}
                </div>
                <NavbarCollapse className="[&_.active]:text-blue-500 [&_ul]:space-x-0">
                    <NavLink href="/menu">Menu</NavLink>

                    <NavLink href="/reservation">Reserve</NavLink>

                    <NavLink href="/testimonials">Testimonials</NavLink>

                    <NavLink href="/events">Events</NavLink>

                    <NavLink href="/gallery">Gallery</NavLink>

                    <NavLink href="/contact">Contact</NavLink>
                </NavbarCollapse>
            </Navbar>
        </header>
    );
};

export default NavbarComponent;
