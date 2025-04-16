"use client";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import { useMemo } from "react";

interface CourseCardProps {
    title?: string | null;
    status: "Draft" | "Live" | "In Review";
    students: number;
    rating: number;
    reviews: number;
    image?: string | null;
}

const CourseCard = ({
    title = "Untitled Course",
    status = "Draft",
    students = 0,
    rating = 0,
    reviews = 0,
    image = null
}: CourseCardProps) => {
    // Generate initials from title with null checks
    const initials = useMemo(() => {
        const safeTitle = title || "Untitled Course";
        const words = safeTitle.split(' ').filter(word => word.length > 0);
        return words.slice(0, 3).map(word => word[0]?.toUpperCase() || '').join('');
    }, [title]);

    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mt-4 hover:shadow-md transition-shadow">
            {/* Course Image or Initials */}
            <div className="w-16 h-16 relative flex-shrink-0">
                {image ? (
                    <Image
                        src={image}
                        alt="Course Thumbnail"
                        fill
                        className="rounded-md object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={10}
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full rounded-md bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{initials}</span>
                    </div>
                )}
            </div>

            {/* Course Details */}
            <div className="ml-4 flex-grow min-w-0">
                <h3 className="text-lg font-semibold truncate">{title || "Untitled Course"}</h3>
                <div className="flex items-center mt-1">
                    <div className={`px-2 py-1 text-xs font-medium rounded-md ${status === 'Live' ? 'bg-green-100 text-green-800' :
                            status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                        }`}>
                        {status}
                    </div>
                </div>
            </div>

            {/* Students */}
            <div className="hidden md:block px-4">
                <p className="text-sm text-gray-600">
                    {students.toLocaleString()} Students
                </p>
            </div>

            {/* Rating */}
            <div className="hidden md:block px-4">
                <p className="text-sm text-gray-600">
                    ⭐ {rating.toFixed(1)} ({reviews.toLocaleString()} Reviews)
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-4">
                <button className="p-2 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors">
                    <FiEdit className="text-blue-500" />
                </button>
                <button className="p-2 border border-red-500 rounded-md hover:bg-red-50 transition-colors">
                    <FiTrash2 className="text-red-500" />
                </button>
            </div>
        </div>
    );
};

export default CourseCard;