"use client";
import UnpurchasedCard from "@/components/Essentials/UnpurchasedCard";
import PurchasedCard from "@/components/Essentials/PurchasedCards";
import UserNavbar from "@/components/GeneralComponents/UserNavbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ICourse } from "@/types/types";
import {
  fetchStudentCourses,
  fetchPopularCourses,
  fetchTrendingCourses,
} from "@/api/courses";
import { useEffect, useState } from "react";
import AuthLayout from "@/components/GeneralComponents/AuthLayout";
import Image from "next/image";
import SkeletonLoader from "@/components/GeneralComponents/SkeletonLoader";
import Link from "next/link";

const CourseListing = () => {
  const [purchasedCourses, setPurchasedCourses] = useState<ICourse[]>([]);
  const [popularCourses, setPopularCourses] = useState<ICourse[]>([]);
  const [trendingCourses, setTrendingCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingPopular, setLoadingPopular] = useState<boolean>(true);
  const [loadingTrending, setLoadingTrending] = useState<boolean>(true);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const courses = await fetchStudentCourses();
      if (courses !== null) {
        setPurchasedCourses(courses);
      }
      setLoading(false);
    };

    const loadPopularCourses = async () => {
      setLoadingPopular(true);
      const courses = await fetchPopularCourses();
      if (courses !== null) {
        setPopularCourses(courses);
      }
      setLoadingPopular(false);
    };

    const loadTrendingCourses = async () => {
      setLoadingTrending(true);
      const courses = await fetchTrendingCourses();
      if (courses !== null) {
        setTrendingCourses(courses);
      }
      setLoadingTrending(false);
    };

    loadCourses();
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
    <AuthLayout>
      <UserNavbar />
      <div className="p-6 md:p-12 bg-gray-50">
        {/* My Courses (Purchased) */}
        <section className="mt-12">
          {loading ? (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          ) : purchasedCourses?.length ? (
            <div>
              <h2 className="text-2xl text-[#1B09A2]">CONTINUE LEARNING</h2>
              <Slider {...sliderSettings} className="mt-4">
                {purchasedCourses.map((course, index) => (
                  <div key={index} className="p-2">
                    <PurchasedCard
                      image={course.thumbnail}
                      authors={Array.isArray(course.authors) ? course.authors : [course.authors ?? ""]}
                      rating={0}
                      progress={0}
                      {...course}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="md:flex items-center bg-[#88D613] text-white p-6 md:p-12 rounded-lg">
              <Image
                src="/assets/images/undraw_learning_re_45gp.svg"
                alt="Learning illustration"
                className="md:w-1/3 h-60 bg-white rounded-lg w-full"
                height={100}
                width={100}
              />
              <div className=" md:pl-12 md:pt-0 pt-6">
                <h2 className="text-3xl font-bold">HEY CHAMP!</h2>
                <p className="mt-2 text-lg">
                  Join thousands of learners who are unlocking new careers and
                  shaping their future.
                </p>
                <Link href="/AllCourses">
                  <div className="mt-4 text-white py-2 px-6 rounded-lg font-semibold bg-[#1B09A2]">
                    Browse Courses
                  </div>
                </Link>
              </div>
            </div>
          )}
        </section>

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
                    authors={[course.instructors ?? "no one"]}
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
    </AuthLayout>
  );
};

export default CourseListing;
