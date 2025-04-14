"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import Layout from "@/components/GeneralComponents/GeneralLayout";
import { fetchProfileInfo } from "@/api/student";
import { updateUserProfile } from "@/api/auth";
import { 
    // IProfileInfo, 
    IUserUpdateData 
} from "@/types/types";
import { BASE_URL } from "@/api/constants";

const AccountSettings = () => {
    // const [profile, setProfile] = useState<IProfileInfo | null>(null);
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
    const fileInputRef = useRef<HTMLInputElement>(null); // For previewing image

    // Fetch profile data on mount
    useEffect(() => {
        const loadProfile = async () => {
            const userInfo = await fetchProfileInfo();
            if (userInfo) {
                // setProfile(userInfo);
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

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle image selection and convert to Base64
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

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await updateUserProfile(formData);
            if (response) {
                alert("Profile updated successfully!");
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
            <div className="flex  p-8">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 bg-white p-6 mt-8">
                    {/* Profile Photo Section */}
                    <div className="flex items-center gap-4">
                        <Image
                            src={previewImage ? `${BASE_URL}/${previewImage}` : "/profile-photo.jpg"}
                            alt="Profile Photo"
                            width={80}
                            height={80}
                            className="rounded-full"
                            unoptimized
                        />
                        <div>
                            <p className="text-gray-700">Profile Photo</p>
                            <p className="text-gray-700 text-sm">This image will be displayed on your profile</p>
                            <button
                                type="button"
                                className="mt-2 px-4 py-2 bg-[#1B09A2] text-white rounded-md"
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
                        <p className="text-sm text-gray-500">Update your personal details here</p>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="p-2 border rounded-md"
                            />
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="p-2 border rounded-md"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="p-2 border rounded-md"
                            />
                            <input
                                type="tel"
                                name="phonenumber"
                                value={formData.phonenumber}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="p-2 border rounded-md"
                            />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="New Password"
                                className="p-2 border rounded-md"
                            />
                            <input
                                type="password"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className="p-2 border rounded-md"
                            />
                        </div>

                        <button type="submit" className="mt-6 px-6 py-2 bg-[#1B09A2] text-white rounded-md">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AccountSettings;
