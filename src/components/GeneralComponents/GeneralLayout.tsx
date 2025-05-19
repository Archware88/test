import Navbar from "./NavbarState";
import Footer from "./Footer";
import { ReactNode } from "react";
import { CartProvider } from "@/contexts/CartContext";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <CartProvider>
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 mt-20">{children}</main>
            <Footer />
        </div>
        </CartProvider>
    );
};

export default Layout;
