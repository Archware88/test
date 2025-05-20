"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import Layout from "@/components/GeneralComponents/GeneralLayout";
import { fetchProfileInfo } from "@/api/student";
import { updateUserProfile } from "@/api/auth";
import { IUserUpdateData } from "@/types/types";
import { BASE_URL } from "@/api/constants";

const ProfileSettings = () => {
    const [formData, setFormData] = useState<IUserUpdateData>({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        password: "",
        password_confirmation: "",
        profile_picture: "",
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadProfile = async () => {
            const userInfo = await fetchProfileInfo();
            if (userInfo) {
                setFormData({
                    firstname: userInfo.firstname || "",
                    lastname: userInfo.lastname || "",
                    email: userInfo.email || "",
                    phonenumber: userInfo.phonenumber || "",
                    password: "",
                    password_confirmation: "",
                    profile_picture: userInfo.profile_picture || "",
                });
                setPreviewImage(userInfo.profile_picture || "/profile-photo.jpg");
            }
        };
        loadProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData((prev) => ({ ...prev, profile_picture: base64String }));
                setPreviewImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await updateUserProfile(formData);
            if (response) {
                alert("Profile updated successfully!");
                const updatedProfile = await fetchProfileInfo();
                if (updatedProfile) {
                    localStorage.setItem("userData", JSON.stringify({
                        ...updatedProfile,
                        email: updatedProfile.email || "",
                    }));
                }
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("An error occurred while updating your profile.");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
                <Sidebar />

                <div className="flex-1 p-4 md:p-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {/* Profile Photo Section */}
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                    src={
                                        previewImage?.startsWith('data:image')
                                            ? previewImage
                                            : previewImage
                                                ? `${BASE_URL}/${previewImage}`
                                                : "/profile-photo.jpg"
                                    }
                                    alt="Profile Photo"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-gray-700">Profile Photo</p>
                                <p className="text-gray-700 text-sm mb-2">
                                    This image will be displayed on your profile
                                </p>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-[#1B09A2] text-white rounded-md cursor-pointer text-sm"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Change Photo
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Personal Information Form */}
                        <form onSubmit={handleSubmit} className="mt-6 border-t pt-4">
                            <h2 className="text-lg font-semibold">Personal Information</h2>
                            <p className="text-sm text-gray-500 mb-4">
                                Update your personal details here
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phonenumber"
                                        value={formData.phonenumber}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-6 px-6 py-2 bg-[#1B09A2] text-white rounded-md cursor-pointer w-full md:w-auto"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileSettings;