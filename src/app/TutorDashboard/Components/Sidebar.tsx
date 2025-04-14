"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiMessageSquare, FiSettings, FiUser } from "react-icons/fi";
import Image from "next/image";

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: "Courses", path: "/TutorDashboard/Courses", icon: <FiHome /> },
        { name: "Messages", path: "/TutorDashboard/Messages", icon: <FiMessageSquare /> },
        { name: "Settings", path: "/TutorDashboard/Settings", icon: <FiSettings /> },
        { name: "Profile", path: "/TutorDashboard/Profile", icon: <FiUser /> },
    ];

    return (
        <aside className="w-64 bg-[#09092A] h-screen text-white flex flex-col">
            <div className="logo flex items-center mx-auto">
                <Image
                    src="/assets/images/Logo 2.svg"
                    className="h-12 mt-4"
                    alt="Archware Logo"
                    width={200}
                    height={200}
                />
            </div>
            <div className="border-b border-gray-300 my-2" />

            <nav className="flex-1 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.path); // Highlight for active pages
                    return (
                        <Link key={item.path} href={item.path}>
                            <div
                                className={`flex items-center ml-9 text-sm px-8 gap-3 mb-5 py-2 cursor-pointer transition relative
                                    ${isActive
                                    ? "border-l-4 border-[#A6CE39]  bg-[#09092A] text-[#A6CE39]" // Left border for active item
                                        : "hover:bg-[#1B09A2] "
                                    }`}
                            >
                                <div className="text-xl">{item.icon}</div>
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;

