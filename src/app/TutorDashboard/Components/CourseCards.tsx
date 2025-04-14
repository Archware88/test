"use client";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Image from "next/image";

interface CourseCardProps {
    title: string;
    status: "Draft" | "Live" | "In Review";
    students: number;
    rating: number;
    reviews: number;
}

const CourseCard = ({ title, status, students, rating, reviews }: CourseCardProps) => {

    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mt-4">
            {/* Course Image */}
            <div className="w-16 h-16 relative">
                <Image src="/course-thumbnail.jpg" alt="Course Thumbnail" layout="fill" className="rounded-md" />
            </div>

            {/* Course Details */}
            <div className=" ml-4">
                <h3 className="text-lg font-semibold">{title}</h3>
               
            </div>

            {/* Status Badge */}
            <div className={`px-4 py-2 text-black border rounded-lg `}>
                {status}
            </div>

            <div>
                <p className="text-sm text-gray-600">
                    {students} Students  
                </p>
            </div>

            <div>
                <p className="text-sm text-gray-600">
                    ⭐ {rating} ({reviews} Reviews)
                </p>
            </div>


            

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button className="p-2 border border-blue-500 rounded-md hover:bg-gray-300">
                    <FiEdit className="text-blue-500" />
                </button>
                <button className="p-2 border border-red-500 rounded-md hover:bg-gray-300">
                    <FiTrash2 className="text-red-500" />
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
