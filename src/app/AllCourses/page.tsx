"use client";
import UnpurchasedCard from "@/components/Essentials/UnpurchasedCard";
// import UserNavbar from "@/components/GeneralComponents/UserNavbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ICourse } from "@/types/types";
import {
  
    fetchPopularCourses,
    fetchTrendingCourses,
} from "@/api/courses";
import { useEffect, useState } from "react";
// import AuthLayout from "@/components/GeneralComponents/AuthLayout";
import Layout from "@/components/GeneralComponents/GeneralLayout";
import SkeletonLoader from "@/components/GeneralComponents/SkeletonLoader";

const CourseListing = () => {
   
    const [popularCourses, setPopularCourses] = useState<ICourse[] | null>(null);
    const [trendingCourses, setTrendingCourses] = useState<ICourse[] | null>(
        null
    );

    const [loadingPopular, setLoadingPopular] = useState<boolean>(true);
    const [loadingTrending, setLoadingTrending] = useState<boolean>(true);

    useEffect(() => {
        // const loadCourses = async () => {
        //     setLoading(true);
        //     const courses = await fetchStudentCourses();
        //     setPurchasedCourses(courses);
        //     setLoading(false);
        // };

        const loadPopularCourses = async () => {
            setLoadingPopular(true);
            const courses = await fetchPopularCourses();
            setPopularCourses(courses);
            setLoadingPopular(false);
        };

        const loadTrendingCourses = async () => {
            setLoadingTrending(true);
            const courses = await fetchTrendingCourses();
            setTrendingCourses(courses);
            setLoadingTrending(false);
        };

        loadPopularCourses();
        loadTrendingCourses();
    }, []);

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3.2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2.2, slidesToScroll: 1 },
            },
        ],
    };

    return (
        <Layout>
            {/* <UserNavbar /> */}
            <div className="p-6 md:p-12 bg-gray-50">
                {/* My Courses (Purchased) */}
               

                {/* Trending Courses */}
                <section className="mt-12">
                    <h2 className="text-2xl text-[#1B09A2] uppercase">
                        Trending Courses
                    </h2>
                    {loadingTrending ? (
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {[...Array(4)].map((_, i) => (
                                <SkeletonLoader key={i} />
                            ))}
                        </div>
                    ) : trendingCourses?.length ? (
                        <Slider {...sliderSettings} className="mt-4">
                            {trendingCourses.map((course, index) => (
                                <div key={index} className="p-2">
                                    <UnpurchasedCard
                                        image={course.thumbnail}
                                        authors={[]}
                                        rating={0}
                                        reviews={0}
                                        status="New"
                                        {...course}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p className="text-center mt-4">
                            No trending courses available at the moment.
                        </p>
                    )}
                </section>

                {/* Popular Courses */}
                <section className="mt-12">
                    <h2 className="text-2xl text-[#1B09A2] uppercase">Popular Courses</h2>
                    {loadingPopular ? (
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {[...Array(4)].map((_, i) => (
                                <SkeletonLoader key={i} />
                            ))}
                        </div>
                    ) : popularCourses?.length ? (
                        <Slider {...sliderSettings} className="mt-4">
                            {popularCourses.map((course, index) => (
                                <div key={index} className="p-2">
                                    <UnpurchasedCard
                                        image={course.thumbnail}
                                        authors={[]}
                                        rating={0}
                                        reviews={0}
                                        status="New"
                                        {...course}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p className="text-center mt-4">
                            No popular courses available at the moment.
                        </p>
                    )}
                </section>
            </div>
        </Layout>
    );
};

export default CourseListing;
