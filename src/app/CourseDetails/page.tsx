"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchCourseDetails } from "@/api/courses";
import { ISection, ILesson, ICourseDetailsResponse } from "@/types/types";
import {
  FaCheckCircle,
  FaClock,
  FaDotCircle,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Image from "next/image";
import ReadMore from "@/components/GeneralComponents/ReadMore";
import Layout from "@/components/GeneralComponents/GeneralLayout";
import Link from "next/link";

// Wrapper component to handle Suspense
export default function CoursePage() {
  return (
    <Layout>
      <Suspense fallback={<div className="p-10 text-center">Loading course details...</div>}>
        <CourseDetails />
      </Suspense>
    </Layout>
  );
}

// Main course details component
function CourseDetails() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [data, setData] = useState<ICourseDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const courseId = searchParams.get("course_id");

  const toggleSection = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        if (!courseId) {
          setError("No course ID provided");
          return;
        }

        const response = await fetchCourseDetails(Number(courseId));
        if (response) {
          setData(response);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        setError("Failed to load course details");
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="p-10 text-center">Loading course details...</div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">{error}</div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center">No course data available</div>
    );
  }

  const { course_info, curriculum_details, profile_info } = data;

  return (
    <div className="mx-auto py-[80px]">
      {/* Hero Section */}
      <div className="w-full bg-[#060D1E] text-white px-[80px] lg:py-12 py-8 flex flex-col lg:flex-row items-center md:items-start ">
        <div className="lg:w-1/2 ">
          <div className="text-[#88D613] text-sm">MARKETING</div>
          <h1 className="text-3xl">{course_info?.title}</h1>
          <div className="flex items-center space-x-2 text-sm mt-6">
            <p className="mt-2">
              By{" "}
              <span className="font-medium">
                {profile_info?.firstname} {profile_info?.lastname}
              </span>
            </p>
            <div className="flex items-center space-x-2 mt-2 text-white border-l border-[#ffffff20] border-opacity-15 px-4">
              <FaDotCircle className="text-[#88D613]" />
              <span>Beginner</span>
            </div>
            <div className="flex items-center space-x-2 mt-2 text-yellow-400 border-l border-[#ffffff20] border-opacity-15 px-4">
              <FaStar />
              <span>4.7 (267 Reviews)</span>
            </div>
            <p className="text-gray-300 text-sm mt-2 border-l border-[#ffffff20] border-opacity-15 px-4">
              Updated 01/2025
            </p>
          </div>
          <p className="mt-8 font-normal">{course_info?.subtitle}</p>
          <div className="flex space-x-3 mt-8">
            <span className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded">
              Social Media Ads
            </span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded">
              ROI Analysis
            </span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded">
              2,385,487 Students
            </span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded flex items-center">
              <FaClock className="mr-1" /> 4 hours
            </span>
          </div>
          <button className="bg-[#1B09A2] lg:w-fit w-full text-sm text-white px-3 py-3 rounded-md mt-12 cusor-pointer">
            Buy Course Now
          </button>
        </div>
        <div className="lg:w-1/2 xl:px-20 lg:px-0">
          <Image
            src={course_info?.image || "/assets/images/course-detais.svg"}
            alt="Course"
            className="w-full h-[401px] space-between object-cover rounded-lg mt-6  lg:ml-6"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-[80px] bg-[#f9f9f9]">
        {/* Main Content - Will be full width on mobile, 7/12 on lg+ */}
        <div className="w-full lg:w-7/12 lg:pr-6">
          {/* Description */}
          <div className="mt-6 py-6 rounded-lg">
            <h2 className="text-lg font-semibold">Course Description</h2>
            <div className="text-gray-600 mt-2">
              <ReadMore
                html={course_info?.subtitle || "No description provided."}
                wordLimit={40}
                className="text-sm"
              />
            </div>
          </div>

          {/* Prerequisites */}
          <div className="mt-6 p-6 border border-gray-300 rounded-lg">
            <h2 className="text-[10px] font-bold text-[#9BA3AB]">PREREQUISITES</h2>
            <div className="flex items-center mt-2">
              <FaCheckCircle className="mr-2 text-green-600 text-sm" />
              <p className="text-gray-600 text-sm">
                There are no prerequisites for this course
              </p>
            </div>
          </div>

          {/* Curriculum */}
          <div className="py-6 rounded-lg">
            {curriculum_details?.map((section: ISection, index: number) => (
              <div key={index} className="mt-4 border border-gray-300 rounded-sm">
                <div
                  className="flex justify-between items-center cursor-pointer p-3 rounded-lg"
                  onClick={() => toggleSection(index)}
                >
                  <span className="text-sm">{section.name}</span>
                  <span className="text-[#1B09A2] text-xs font-bold">
                    {expanded === index ? (
                      <div className="flex items-center justify-center space-x-1">
                        <div>Hide Details</div> <FaChevronUp className="pt-1" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-1">
                        <div>Show Details</div> <FaChevronDown className="pt-1" />
                      </div>
                    )}
                  </span>
                </div>
                {expanded === index && section.lesson?.length > 0 && (
                  <div className="px-3 rounded-lg">
                    <div className="border-b border-gray-300 my-2"></div>
                    <ul className="list-disc pl-6 text-sm">
                      {section.lesson.map((lesson: ILesson, i: number) => (
                        <li key={i} className="text-gray-600 py-3">
                          {lesson.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Will be full width on mobile, fixed width on lg+ */}
        <div className="w-full lg:w-5/12 lg:min-w-[300px] mt-6 lg:mt-0 xl:px-24">
          <div className="bg-white p-6 border border-gray-300 rounded-lg lg:mx-0 mx-auto lg:w-full w-11/12 mt-20">
            <h2 className="font-semibold">Instructors</h2>
            <div className="border-b border-gray-300 my-2"></div>
            <div className="mt-3 flex items-center">
              <Image
                src={"/assets/images/course1.jpg"}
                alt="Instructor"
                className="h-12 w-12 rounded-full"
                height={100}
                width={100}
                priority
              />
              <div className="ml-3">
                <p className="font-semibold text-[#1B09A2]">
                  {profile_info?.firstname} {profile_info?.lastname}
                </p>
                <p className="text-gray-500 text-sm">
                  {profile_info?.email ?? "Instructor"}
                </p>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="mt-5">
            <div className="bg-white p-6 border border-gray-300 rounded-lg lg:mx-0 mx-auto lg:w-full w-11/12">
              <div className="flex items-center mt-3">
                <input
                  type="text"
                  placeholder="Have a voucher code? Input here"
                  className="border border-gray-700 p-2 rounded-bl-md rounded-tl-md w-full text-sm"
                />
                <button className="bg-[#1B09A2] text-white px-4 py-2 rounded-br-md rounded-tr-md text-base cusor-pointer">
                  Apply
                </button>
              </div>
              <div className="border-b border-gray-300 my-5"></div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-[#1B09A2]">Price</p>
                <p className="text-lg font-semibold text-[#1B09A2]">
                  N 30,000
                </p>
              </div>
            </div>
            <div className="bg-white lg:mx-0 mx-auto lg:w-full w-11/12">
              <button className="mt-4 bg-[#1B09A2] text-white px-4 py-3 rounded-lg w-full text-sm cusor-pointer">
                Add Course to Cart
              </button>
              <Link href="/ShoppingCart">
                <div className="mt-2 text-center border border-[#1B09A2] text-[#1B09A2] px-4 py-3 rounded-lg w-full text-sm">
                  Buy Course Now
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}