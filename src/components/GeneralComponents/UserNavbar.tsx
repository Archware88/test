'use client';
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaGlobe, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { fetchProfileInfo } from "@/api/student";
import { IProfileInfo } from "@/types/types";
import { BASE_URL } from "@/api/constants";
import Link from "next/link";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle state
  const [profile, setProfile] = useState<IProfileInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfileInfo = async () => {
      setLoading(true);
      const data = await fetchProfileInfo();
      if (data) {
        setProfile(data);
      } else {
        setError("Failed to load profile information.");
      }
      setLoading(false);
    };

    getProfileInfo();
  }, []);

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="hidden md:block fixed w-full z-50 text-sm">
        <nav className="border-gray-300 py-3 px-12 flex items-center justify-between bg-[#FFFCF5]">
          {/* Left: Logo */}
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/assets/images/ArchwareLogo.svg"
                alt="ArchWare Logo"
                className="h-16"
                width={100}
                height={100}
              />
            </div>
          </Link>

          {/* Center: Search Bar */}
          <div className="flex-grow max-w-xl mx-6 relative">
            <input
              type="text"
              placeholder="Search for courses"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Explore Categories
            </a>
            <a href="/Tutor/Home" className="text-gray-600 hover:text-blue-600">
              Become a Tutor
            </a>
          </div>

          {/* Right: Nav Items */}
          <div className="flex items-center space-x-6 text-[#010101]">
            {/* Profile Dropdown */}
            <div className="relative">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Image
                    src={`${BASE_URL}/${profile?.profile_picture || "/assets/images/profile-image.png"}`}
                    alt="User"
                    className="h-10 w-10 rounded-full border"
                    width={100}
                    height={100}
                    unoptimized
                  />
                  <span className="ml-2 text-gray-700 text-sm">
                    Welcome, {profile?.firstname}!
                  </span>
                  <FaChevronDown className="ml-1 text-gray-500" />
                </div>
              )}

              {/* Dropdown Menu */}
              {isOpen && profile && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg  z-50 overflow-hidden">
                  {/* User Info */}
                  <div className="pt-4 text-center border-b border-gray-300">
                    <Image
                      src={`${BASE_URL}/${profile.profile_picture || "/assets/images/profile-image.png"}`}
                      alt="User"
                      className="h-14 w-14 rounded-full mx-auto border"
                      width={100}
                      height={100}
                      unoptimized
                    />
                    <p className="mt-2 pb-1">
                      {profile.firstname} {profile.lastname}
                    </p>
                    <p className=" text-xs pb-3">{profile.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2 my-1">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">My Courses</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">My Cart</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">My Saved Items</a>
                  </div>

                  <hr className="border-gray-300" />

                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Notifications</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Messages</a>
                  </div>

                  <hr className="border-gray-300" />

                  <div className="py-2">
                    <a href="/AccountSettings/ProfileSettings" className="block px-4 py-2 hover:bg-gray-100">
                      Profile Settings
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Account Settings</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Help and Support</a>
                  </div>

                  <hr className="border-gray-300" />

                  {/* Logout Button */}
                  <div className="pb-3">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-red-500">
                      Log out
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Icons */}
            <FaGlobe className="text-gray-600 text-lg cursor-pointer" />
            <FaShoppingCart className="text-gray-600 text-lg cursor-pointer" />
          </div>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-white shadow-md p-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link href="/">
          <>
            <Image
              src="/assets/images/ArchwareLogo.svg"
              alt="ArchWare Logo"
              width={80}
              height={80}
            />
          </>
        </Link>

        {/* Hamburger Icon */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-300 z-50">
          <div className="p-4 flex flex-col space-y-3">
            <a href="/AllCourses" className="text-gray-600 hover:text-blue-600">Explore Categories</a>
            <a href="/Tutor/Home" className="text-gray-600 hover:text-blue-600">Become a Tutor</a>
            <hr />
            <a href="#" className="text-gray-600 hover:text-blue-600">My Courses</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">My Cart</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">My Saved Items</a>
            <hr />
            <a href="/AccountSettings/ProfileSettings" className="text-gray-600 hover:text-blue-600">Profile Settings</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Account Settings</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Help and Support</a>
            <hr />
            <a href="#" className="text-red-500 hover:text-red-700">Log out</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
