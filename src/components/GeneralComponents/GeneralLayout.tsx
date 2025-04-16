import Navbar from "./NavbarState";
// import Footer from "@/components/Footer";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 mt-20">{children}</main>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
