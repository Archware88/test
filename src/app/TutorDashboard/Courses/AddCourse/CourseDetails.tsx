"use client";
import { FiPlus, FiX } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { createCourseLanding } from "@/api/course-setup";
import { fetchCategories } from "@/api/courses";
import { ICategory } from "@/types/types";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CourseDetails = ({ currentStep, nextStep, prevStep }: { currentStep: number, nextStep: () => void, prevStep: () => void }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [level, setLevel] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const getCategories = async () => {
            setLoadingCategories(true);
            const data = await fetchCategories();
            if (data) {
                setCategories(data);
            }
            setLoadingCategories(false);
        };
        getCategories();
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setSelectedFileName(file.name);
        }
    };

    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedVideo(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    const removeVideo = () => {
        setSelectedVideo(null);
        if (videoInputRef.current) {
            videoInputRef.current.value = "";
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (!category) {
            alert("Please select a category.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("category_id", category);
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("taught_in_course", description);
        formData.append("course_level", level);

        if (videoInputRef.current?.files?.[0]) {
            formData.append("course_video_link", videoInputRef.current.files[0]);
        }

        if (imageInputRef.current?.files?.[0]) {
            formData.append("course_image", imageInputRef.current.files[0]);
        }

        try {
            const response = await createCourseLanding(formData);
            if (response?.status && response.course_id) {
                // Update URL with course ID using router.push
                router.push(`?courseId=${response.course_id}`, { scroll: false });

                // Proceed to next step
                nextStep();
            } else {
                alert(response?.message || "Error creating course.");
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Failed to create course. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className=" bg-white rounded-lg shadow">
            <h1 className="text-xl font-medium mb-4 px-6 pt-6">Course Details</h1>

            <div className="border  border-gray-400 mb-4"></div>

            <div className="px-6 pb-6 pt-6">

                {/* Course Title & Subtitle */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block font-medium mb-2 ">Course Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a course title here" className="w-full p-2 border border-[#2D2D2D80] rounded text-sm" />
                    </div>
                    <div>
                        <label className="block font-medium mb-2">Course Subtitle</label>
                        <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Enter a course subtitle here" className="w-full p-2 border border-[#2D2D2D80] rounded text-sm" />
                    </div>
                </div>

                {/* Course Description */}
                <div className="mb-4">
                    <label className="block font-medium mb-2 mt-8 ">Course Description</label>
                    <textarea placeholder="Write course description here" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-4 border border-[#2D2D2D80] rounded h-24 text-sm"></textarea>
                </div>

                {/* Course Language, Level, Category */}

                <div className="grid grid-cols-3 gap-4 mb-4 mt-8">
                    {/* Course Language */}
                    <div>
                        <label className="block font-medium mb-2">Course Language</label>
                        <div className="relative border border-gray-300 rounded flex items-center">
                            <select
                                className={`w-full p-2 text-sm border-none rounded appearance-none pr-10 
                        ${!language ? "text-gray-400" : "text-gray-900"}`}
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="" disabled hidden>Choose language</option>
                                <option className="text-gray-800" value="English">English</option>
                                <option className="text-gray-800" value="Spanish">Spanish</option>
                                <option className="text-gray-800" value="French">French</option>
                            </select>
                            {/* Custom Dropdown Icon */}
                            <FiChevronDown className="absolute right-3 text-gray-500" />
                        </div>
                    </div>

                    {/* Course Level */}
                    <div>
                        <label className="block font-medium mb-2">Course Level</label>
                        <div className="relative border border-gray-300 rounded flex items-center">
                            <select
                                className={`w-full p-2 text-sm border-none rounded appearance-none pr-10  
                        ${!level ? "text-gray-400" : "text-gray-900"}`}
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                            >
                                <option value="" disabled hidden>Select level</option>
                                <option className="text-gray-800" value="Beginner">Beginner</option>
                                <option className="text-gray-800" value="Intermediate">Intermediate</option>
                                <option className="text-gray-800" value="Advanced">Advanced</option>
                            </select>
                            <FiChevronDown className="absolute right-3 text-gray-500" />
                        </div>
                    </div>

                    {/* Course Category */}
                    <div>
                        <label className="block font-medium mb-2">Course Category</label>
                        <div className="relative border border-gray-300 rounded flex items-center">
                            <select
                                className={`w-full p-2 text-sm border-none rounded appearance-none pr-10 
                        ${!category ? "text-gray-400" : "text-gray-900"}`}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                disabled={loadingCategories || categories.length === 0}
                            >
                                <option value="">
                                    {loadingCategories ? "Loading categories..." : categories.length > 0 ? "Select category" : "No categories available"}
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id} className="text-gray-800">
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <FiChevronDown className="absolute right-3 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Course Image</label>
                    <div className="flex space-x-5">
                        {/* Image Upload Box */}
                        <div
                            className="relative w-1/2 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center h-80 cursor-pointer"
                            onClick={() => imageInputRef.current?.click()}
                        >
                            {selectedImage ? (
                                <div className="relative w-full h-full">
                                    <Image src={selectedImage} alt="Selected Image" className="h-full w-full object-cover rounded-lg" width={100} height={100} />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeImage();
                                        }}
                                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                                    >
                                        <FiX className="text-red-500 text-lg" />
                                    </button>
                                </div>
                            ) : (
                                <FiPlus className="text-gray-400 text-3xl" />
                            )}
                        </div>

                        {/* File Name + Select Button */}
                        <div className="w-1/2 flex flex-col ">
                            <p>
                                Upload your course image here. It must meet our course image quality standards to be accepted.
                                Important guidelines: 500x350 pixels; .jpg, .jpeg, .gif, or .png. No text on the image.
                            </p>

                            {/* File Name Display + Button Container */}
                            <div className="flex  rounded px-3 py-2 mt-5">
                                {/* Show File Name if Selected */}
                                <span className="text-gray-600 text-sm truncate border border-gray-400 p-2 rounded-sm w-10/12">
                                    {selectedFileName || "No file selected"}
                                </span>

                                {/* Select Photo Button (pushed to end) */}
                                <button
                                    onClick={() => imageInputRef.current?.click()}
                                    className="ml-auto px-4 py-2 bg-[#1B09A2] text-white rounded text-sm"
                                >
                                    Select Photo
                                </button>
                            </div>

                            <input
                                type="file"
                                id="imageUpload"
                                ref={imageInputRef}
                                accept="image/png, image/jpeg, image/gif"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Video Upload */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Promo Video</label>
                    <div className="flex space-x-5">
                        <div
                            className="relative w-1/2 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center h-80 cursor-pointer"
                            onClick={() => videoInputRef.current?.click()}
                        >
                            {selectedVideo ? (
                                <div className="relative w-full h-full">
                                    <video src={selectedVideo} controls className="h-full w-full object-cover rounded-lg" />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeVideo();
                                        }}
                                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                                    >
                                        <FiX className="text-red-500 text-lg" />
                                    </button>
                                </div>
                            ) : (
                                <FiPlus className="text-gray-400 text-3xl" />
                            )}
                        </div>
                        <div className="w-1/2">
                            <p>
                                Your promo video is a quick and compelling way for students to preview what they`&apos;`ll learn in your course.
                                Students considering your course are more likely to enroll if your promo video is well-made.
                            </p>
                            <input
                                type="file"
                                id="videoUpload"
                                ref={videoInputRef}
                                accept="video/mp4, video/webm, video/ogg"
                                className="hidden"
                                onChange={handleVideoChange}
                            />
                            <button
                                onClick={() => videoInputRef.current?.click()}
                                className="mt-2 px-4 py-2 bg-[#1B09A2] text-white rounded text-sm"
                            >
                                Upload Video
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#1B09A2] text-white rounded-lg disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Next"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CourseDetails;