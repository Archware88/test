"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname(); // Get current path

    // Define sidebar links
    const links = [
        { href: "/AccountSettings/ProfileSettings", label: "Profile Settings" },
        { href: "/AccountSettings/PaymentSettings", label: "Payment Settings" },
        // { href: "/AccountSettings/NotificationSettings", label: "Notification Settings" },
        // { href: "/AccountSettings/SecuritySettings", label: "Security Settings" },
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 pl-6">Account Settings</h2>
            <div className="w-64 h-[80vh] p-5 border-r-2 mt-8">

                <ul className="space-y-4">
                    {links.map((link) => {
                        const isActive = pathname === link.href; // Check if current route matches

                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`block  p-2  border-l-4 ${isActive ? "border-[#88D613] text-black" : "border-transparent text-gray-700"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
