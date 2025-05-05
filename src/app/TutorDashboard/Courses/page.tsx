"use client";
import InstructorLayout from "../Components/InstructorLayout";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import CourseCard from "../Components/CourseCards";
import { useRouter } from "next/navigation";
import { fetchInstructorCourses } from "@/api/courses";
import { ICourse } from "@/types/types";

const InstructorPage = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);
    const [filter, setFilter] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        const loadCourses = async () => {
            const data = await fetchInstructorCourses();
            if (data) {
                setCourses(data);
                setFilteredCourses(data);
            }
            setLoading(false);
        };

        loadCourses();
    }, []);

    // Filter and Search Logic
    useEffect(() => {
        let updatedCourses = courses;

        if (filter !== "All") {
            updatedCourses = updatedCourses.filter(course => course.status === filter);
        }

        if (searchQuery) {
            updatedCourses = updatedCourses.filter(course =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredCourses(updatedCourses);
    }, [filter, searchQuery, courses]);

    if (loading) return (<InstructorLayout><p className="text-center mt-10">Loading courses...</p></InstructorLayout>);

    return (
        <InstructorLayout>
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold">Courses</h1>

                {/* Top Controls */}
                <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex gap-4">
                        {/* Filter Dropdown */}
                        <select
                            className="border p-2 rounded-lg"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Live">Live</option>
                            <option value="Draft">Draft</option>
                            <option value="In Review">In Review</option>
                        </select>

                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search My Courses"
                                className="border p-2 rounded-lg pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    {/* Add Course Button */}
                    <button
                        className="bg-[#1B09A2] text-white px-4 py-2 rounded-lg cusor-pointer"
                        onClick={() => router.push("/TutorDashboard/Courses/AddCourse")}
                    >
                        + Add New Course
                    </button>
                </div>

                {/* Course List */}
                <div className="mt-4 py-3">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
                            <CourseCard
                                image={course.image}
                                key={index}
                                title={course.title}
                                status={course.status as "Draft" | "Live" | "In Review"}
                                students={course.student_count || 0} // Adjust based on backend data
                                rating={course.rating || 0} // Adjust based on backend data
                                reviews={Array.isArray(course.reviews) ? course.reviews.length : course.reviews || 0} // Adjust based on backend data
                            />
                        ))
                    ) : (
                        <p className="text-center mt-5">No courses found.</p>
                    )}
                </div>
            </div>
        </InstructorLayout>
    );
};

export default InstructorPage;
