import "./globals.css";

import FooterComponent from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Bounce, ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
    title: "Luxora - Your Luxury Restaurant",
    description: "Luxora - Your Luxury Restaurant",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.png" />
            </head>
            <SessionProvider>
                <body className={`font-ubuntu flex flex-col min-h-screen`}>
                    <NextTopLoader showSpinner={false} color="dodgerblue" />
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                    />
                    <NavbarComponent />
                    <main className="flex-1 w-full max-width mb-10 relative">
                        {children}
                    </main>
                    <FooterComponent />
                </body>
            </SessionProvider>
        </html>
    );
}
