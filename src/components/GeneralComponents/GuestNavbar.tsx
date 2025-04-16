"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiSearch, FiShoppingCart, FiX } from "react-icons/fi";
import AuthContainer from "../AuthComponents/AuthContainer";
import Image from "next/image";

const GuestNavbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authDefaultStep, setAuthDefaultStep] = useState<"login" | "signup">("login");

  const openSignupModal = () => {
    setAuthDefaultStep("signup");
    setShowAuth(true);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-20">
      <div className="bg-gray-100 py-4 px-6 flex items-center justify-between w-full relative border-b border-gray-300">
        {/* Mobile View */}
        <div
          className={`md:hidden flex items-center w-full ${menuOpen ? "justify-start" : "justify-between"
            }`}
        >
          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black text-2xl"
          >
            <FiMenu />
          </button>

          {/* Logo (Moves to top right when menu opens) */}
          {!menuOpen ? (
            <div className="logo flex items-center mx-auto">
              <Image
                src="/assets/images/ArchwareLogo.svg"
                className="h-8"
                alt="Archware Logo"
                width={100}
                height={100}
              />
            </div>
          ) : (
            <div className="absolute top-6 right-6">
              <Image
                src="/assets/images/ArchwareLogo.svg"
                className="h-8"
                alt="Archware Logo"
                width={100}
                height={100}
              />
            </div>
          )}

          {/* Icons: Search & Cart */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-black text-2xl"
            >
              {searchOpen ? <FiX /> : <FiSearch />}
            </button>

            {/* Cart Icon */}
            <Link href="/cart" className="text-black text-2xl">
              <FiShoppingCart />
            </Link>
          </div>
        </div>
        {/* Full-screen Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white text-black flex flex-col z-50  border-b border-gray-300">
            {/* Close Button */}

            <div className="bg-gray-100 py-4 px-6 flex items-center justify-between w-full relative border-b border-gray-300">
              <div className="flex items-center">
                <Image
                  src="/assets/images/ArchwareLogo.svg"
                  className="h-8"
                  alt="Archware Logo"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className=" text-3xl"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Top Links */}
            <div className="flex flex-col space-y-8 mt-12 px-6">
              <Link href="/AllCourses" className="px-3 text-[#0A1532]">
                Explore Categories
              </Link>
              <div className="w-full border-b border-gray-300 text-[#0A1532]"></div>
              <Link href="/Tutor/Home" className="px-3">
                Become a Tutor
              </Link>
              <div className="w-full border-b border-gray-300"></div>
              <Link href="/contact" className="px-3">
                Contact Us
              </Link>
              <div className="w-full border-b border-gray-300"></div>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-col items-center space-y-4 mt-auto mb-6 px-6">
              <button
                onClick={openSignupModal}
                className="bg-[#1B09A2] border border-[#1B09A2] text-white py-2 px-6 rounded-lg w-full text-center"
              >
                Get Started
              </button>
              <button
                onClick={() => setIsAuthOpen(true)}
                className="border-2 border-[#1B09A2] text-[#1B09A2] py-2 px-6 rounded-lg w-full text-center"
              >
                Login
              </button>
              <div className="w-3/4 border-b border-gray-300 mt-4"></div>
              <h3 className="text-lg mt-2">Talk to Us</h3>
              <p className="text-sm border-2 border-gray-300 p-2 rounded-sm">
                help@archwareinstitute.com
              </p>
            </div>
          </div>
        )}
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center w-full">
          {/* Logo */}
          <div className="logo flex items-center">
            <Image
              src="/assets/images/ArchwareLogo.svg"
              className="h-8"
              alt="Archware Logo"
              width={100}
              height={100}
            />
          </div>

          <div className="relative w-1/3">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search for courses"
              className="bg-white rounded-lg py-2 pl-10 pr-5 w-full outline-none border-2 border-gray-300"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link href="/AllCourses" className="text-[#0A1532]">
              Explore Categories
            </Link>
            <Link href="/Tutor/Home" className="text-[#0A1532]">
              Become a Tutor
            </Link>
          </div>

          {/* Auth Buttons */}
          <div>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="border-2 border-[#1B09A2] text-[#1B09A2] text-sm py-2 px-7 rounded-lg"
            >
              Login
            </button>
            <button
              onClick={openSignupModal}
              className="bg-[#1B09A2] border-2 border-[#1B09A2] text-sm text-white py-2 px-4 rounded-lg ml-4"
            >
              Get Started
            </button>
          </div>
        </div>
        {/* Mobile Search Bar (Toggles Open) */}
        {searchOpen && (
          <div className="absolute top-14 left-0 w-full px-6 md:hidden">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search for courses"
              className="bg-white rounded-lg py-2 pl-10 pr-5 w-full outline-none border-2 border-gray-300"
            />
          </div>
        )}
        {/* Login Modal */}
        {isAuthOpen && <AuthContainer onClose={() => setIsAuthOpen(false)} />}
        {showAuth && (
          <AuthContainer
            onClose={() => setShowAuth(false)}
            defaultStep={authDefaultStep}
          />
        )}
      </div>
    </div>
  );
};

export default GuestNavbar;
