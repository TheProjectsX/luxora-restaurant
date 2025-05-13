import {
    Footer,
    FooterCopyright,
    FooterDivider,
    FooterLinkGroup,
} from "flowbite-react";
import Link from "next/link";

const FooterComponent = () => {
    return (
        <Footer container>
            <div className="w-full text-center max-width">
                <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                    <div>
                        <Link
                            href="/"
                            className="mb-4 flex items-center sm:mb-0"
                        >
                            <img
                                alt="Luxora Logo"
                                className="mr-3 h-8"
                                src="/favicon.png"
                            />
                            <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white">
                                Luxora
                            </span>
                        </Link>
                    </div>
                    <FooterLinkGroup className="space-x-2">
                        <li>
                            <Link
                                href="/about"
                                className="hover:underline underline-offset-2 px-2"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/services"
                                className="hover:underline underline-offset-2 px-2"
                            >
                                Services
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/contact"
                                className="hover:underline underline-offset-2 px-2"
                            >
                                Contact
                            </Link>
                        </li>
                    </FooterLinkGroup>
                </div>
                <FooterDivider />
                <FooterCopyright
                    href="/"
                    by="Luxora"
                    year={new Date().getFullYear()}
                />
            </div>
        </Footer>
    );
};

export default FooterComponent;
