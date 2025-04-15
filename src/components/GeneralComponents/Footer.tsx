import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-[#FFFCF5] py-8 px-20 border-t border-black">
            <div className=" mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Logo */}
                    <div className="col-span-1 flex items-center">
                        <Image src="/assets/images/ArchwareLogo.svg" alt="Archware Logo" className="w-40" height={40} width={40} />
                    </div>

                    {/* Our Company */}
                    <div>

                        <ul className="space-y-2 text-gray-800">
                            <h4 className="font-semibold text-[16px] mb-3">Our Company</h4>
                            <li><a href="#" className="hover:underline text-[black]">All courses</a></li>
                            <li><a href="/Tutor/Home" className="hover:underline text-[black]">Become a tutor</a></li>
                            <li><a href="#" className="hover:underline text-[black]">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Legal & Accessibility */}
                    <div>

                        <ul className="space-y-2 text-gray-800">
                            <h4 className="font-semibold text-[16px] mb-3">Legal & Accessibility</h4>
                            <li><a href="#" className="hover:underline text-[black]">Accessibility statement</a></li>
                            <li><a href="#" className="hover:underline text-[black]">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:underline text-[black]">Site map</a></li>
                        </ul>
                    </div>

                    {/* Our Socials */}
                    <div>

                        <ul className="space-y-2 text-gray-800">
                            <h4 className="font-semibold text-[16px] mb-3">Our Socials</h4>
                            <li><a href="#" className="hover:underline text-[black]">Twitter</a></li>
                            <li><a href="#" className="hover:underline text-[black]">LinkedIn</a></li>
                            <li><a href="#" className="hover:underline text-[black]">YouTube</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="-ml-16 -mt-3">
                        <p className="text-[14px] mb-3">
                            Join our newsletter to stay up to date on features and releases.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 mb-2 text-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none mx-auto"
                            />
                            <button className="bg-[#1B09A2] text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
                                Subscribe
                            </button>
                        </div>
                        <p className="font-semibold text-[10.1px] text-gray-500">
                            By subscribing you agree with our {" "}
                            <a href="#" className="underline text-[#88D613]">Privacy Policy</a>, and you consent to receive updates from our company.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-black w-full" />

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row items-center justify-between text-gray-800 text-sm">
                    <p>© 2025 Archware Institute. All rights reserved.</p>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;