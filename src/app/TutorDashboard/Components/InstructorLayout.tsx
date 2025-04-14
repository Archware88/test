"use client";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 bg-gray-100">
                <Topbar />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default InstructorLayout;
