"use client"

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import PurchasedCard from "@/components/Essentials/PurchasedCards";
import UserNavbar from "@/components/GeneralComponents/UserNavbar";
import { fetchCategories, fetchAllCourses, fetchCoursesByCategory } from "@/api/courses";
import { ICourse, ICategory } from "@/types/types";
import AuthLayout from "@/components/GeneralComponents/AuthLayout";
import SkeletonLoader from "@/components/GeneralComponents/SkeletonLoader";

const MyCourses = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("Ongoing");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const fetchedCategories = await fetchCategories();
                if (fetchedCategories) {
                    setCategories([{ id: 0, name: "All Categories" }, ...fetchedCategories]);
                }
                const fetchedCourses = await fetchAllCourses();
                if (fetchedCourses) setCourses(fetchedCourses);
            } catch (error) {
                console.error("Error loading data:", error);
            }
            setLoading(false);
        };

        loadData();
    }, []);

    const handleCategoryChange = async (category: string, categoryId: number) => {
        setCategoryFilter(category);
        setLoading(true);
        try {
            const fetchedCourses =
                category === "All Categories"
                    ? await fetchAllCourses()
                    : await fetchCoursesByCategory(categoryId);
            if (fetchedCourses) setCourses(fetchedCourses);
        } catch (error) {
            console.error("Error fetching courses by category:", error);
        }
        setLoading(false);
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthLayout>
            <div>
                <UserNavbar />
                <div className="lg:px-[120px] pt-32">
                    <h1 className="text-2xl font-bold mb-4">MY COURSES</h1>

                    {/* Sort & Filter Controls */}
                    <div className="flex flex-col md:flex-row justify-between mb-6">
                        <div className="flex space-x-4">
                            <select
                                className="border bg-white border-gray-300 p-2 rounded-md"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="Ongoing">Sort By: Ongoing</option>
                                <option value="Completed">Sort By: Completed</option>
                            </select>

                            <select
                                className="border bg-white border-gray-300 p-2 rounded-md"
                                value={categoryFilter}
                                onChange={(e) =>
                                    handleCategoryChange(e.target.value, categories.find((c) => c.name === e.target.value)?.id || 0)
                                }
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search Bar */}
                        <div className="relative mt-4 md:mt-0">
                            <input
                                type="text"
                                placeholder="Search My Courses..."
                                className="border bg-white border-gray-300 rounded-lg pl-10 pr-4 py-2 w-72"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>

                    {/* Courses Grid */}
                    {loading ? (
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {[...Array(4)].map((_, i) => (
                                <SkeletonLoader key={i} />
                            ))}
                        </div>
                    ) : filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredCourses.map((course) => (
                                <PurchasedCard
                                    image={course.thumbnail}
                                    authors={[]}
                                    rating={0}
                                    progress={0}
                                    {...course}
                                 key={course.id} {...course} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No courses found.</p>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
};

export default MyCourses;
