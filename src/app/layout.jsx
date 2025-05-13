import FooterComponent from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`font-ubuntu flex flex-col min-h-screen`}>
                <NavbarComponent />
                <main className="flex-1">{children}</main>
                <FooterComponent />
            </body>
        </html>
    );
}
