import FooterComponent from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";

export const metadata = {
    title: "Luxo - Your Luxury Restaurant",
    description: "Luxo - Your Luxury Restaurant",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.png" />
            </head>
            <SessionProvider>
                <body className={`font-ubuntu flex flex-col min-h-screen`}>
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
                    <main className="flex-1 w-full max-width mb-10">
                        {children}
                    </main>
                    <FooterComponent />
                </body>
            </SessionProvider>
        </html>
    );
}
