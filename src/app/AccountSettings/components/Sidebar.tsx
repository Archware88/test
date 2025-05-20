"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = [
        { href: "/AccountSettings/ProfileSettings", label: "Profile Settings" },
        { href: "/AccountSettings/PaymentSettings", label: "Payment Settings" },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
                <h2 className="text-xl font-semibold">Account Settings</h2>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-gray-700"
                >
                    {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Sidebar - Hidden on mobile unless menu is open */}
            <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 bg-white md:h-[80vh] p-5 border-r-2`}>
                <h2 className="text-2xl font-semibold mb-4 pl-6 hidden md:block">Account Settings</h2>
                <ul className="space-y-4">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`block p-2 border-l-4 ${isActive
                                            ? "border-[#88D613] text-black font-medium"
                                            : "border-transparent text-gray-700"
                                        } hover:bg-gray-50 rounded-r-md`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default Sidebar;