import {
    Avatar,
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

const NavbarComponent = () => {
    return (
        <header className="shadow-md mb-4">
            <Navbar className="max-width" fluid rounded>
                <Link className="flex items-center" href="/">
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
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded
                            />
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">
                                name@flowbite.com
                            </span>
                        </DropdownHeader>
                        <DropdownItem>Dashboard</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Earnings</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem>Sign out</DropdownItem>
                    </Dropdown>
                </div>
                <NavbarCollapse className="[&_.active]:text-blue-500 [&_ul]:space-x-0">
                    <NavLink href="/menu">Menu</NavLink>

                    <NavLink href="/book">Book</NavLink>

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
