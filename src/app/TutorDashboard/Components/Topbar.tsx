"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { fetchInstructorInfo } from "@/api/instructor";
import { IInstructorInfo } from "@/types/types";
const Topbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState<IInstructorInfo | null>(null);

    useEffect(() => {
        const getUserProfile = async () => {
            const profile = await fetchInstructorInfo();
            setUser(profile);
        };

        getUserProfile();
    }, []);

    // Function to get initials (e.g., "John Doe" -> "JD")
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="flex justify-end items-center p-4 bg-white shadow-md">
            <div className="relative px-8">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    {user?.profile_picture ? (
                        <Image
                            src={user.profile_picture}
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    ) : (
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1B09A2] text-white font-bold">
                            {user ? getInitials(`${user.firstname} ${user.lastname}`) : "?"}
                        </div>
                    )}

                    <span>{user ? `${user.firstname} ${user.lastname}` : "Loading..."}</span>
                    <FiChevronDown />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                        <button
                            className="flex items-center gap-2 p-3 hover:bg-gray-100 w-full text-left"
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topbar;
