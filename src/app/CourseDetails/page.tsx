"use client";
import { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaDotCircle,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import UserNavbar from "@/components/GeneralComponents/UserNavbar";
import Image from "next/image";
import ReadMore from "@/components/GeneralComponents/ReadMore";

const CourseDetails = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const curriculum = [
    { title: "Understanding Your Audience", lessons: [] },
    {
      title: "Building a Winning Marketing Strategy",
      lessons: [
        "Developing a Comprehensive Marketing Plan",
        "Crafting Your Unique Value Proposition",
        "Aligning Marketing Goals with Business Objectives",
        "Competitive Analysis: Learning from Your Rivals",
      ],
    },
    { title: "Content and Campaign Mastery", lessons: [1, 2] },
    { title: "Data-Driven Marketing and Analytics", lessons: [] },
    { title: "Sustaining Growth and Building Brand Loyalty", lessons: [] },
  ];

  return (
    <>
      <UserNavbar />
      <div className=" mx-auto py-[80px] ">
        {/* Hero Section */}
        <div className="bg-[#060D1E] text-white  px-[80px]  lg:py-12 flex flex-col md:flex-row items-center md:items-start">
          <div className="lg:w-1/2 w-full">
            <div className="text-[#88D613] text-sm">MARKETING</div>
            <h1 className="text-3xl ">
              Advanced Marketing Tactics for Brand Growth
            </h1>
            <div className="flex items-center space-x-2 text-sm mt-6">
              <p className="mt-2">
                By{" "}
                <span className="font-medium">Shai Hulud & Shadout Mapes</span>
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
            <p className="mt-8 font-normal">
              Master advanced marketing tactics to drive brand growth, including
              audience segmentation, influencer partnerships, and ROI analysis.
              Learn how to craft impactful campaigns and optimize strategies
              with real-world case studies and practical tools.
            </p>
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
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-[#1B09A2] text-sm text-white px-3 py-3 rounded-md mt-12"
            >
              Buy Course Now
            </button>
          </div>
          <div className="lg:w-1/2 w-full ">
            <Image
              src="/assets/images/course-detais.svg"
              alt="Course"
              className="w-full h-[401px]  px-30 object-cover rounded-lg mt-6 md:mt-0 md:ml-6"
              height={10}
              width={10}
            />
          </div>
        </div>
        <div className="lg:flex px-[80px] bg-[#f9f9f9]">
          <div className="lg:w-7/12 w-full">
            {/* Course Description */}
            <div className="mt-6 py-6 rounded-lg">
              <h2 className="text-lg font-semibold">Course Description</h2>
              <p className="text-gray-600 mt-2">
                <ReadMore
                  html={`Learn advanced strategies top marketers use. This includes audience segmentation, ROI analysis, and influencer marketing techniques.Each module includes hands-on tools and case studies that will guide you in executing campaigns that drive real business results.`}
                  wordLimit={40}
                  className="text-sm"
                />
              </p>
            </div>

            {/* Prerequisites */}
            <div className="mt-6 p-6 border border-gray-300 rounded-lg">
              <h2 className="text-[10px] font-bold text-[#9BA3AB] ">PREREQUISITES</h2>
              <div className="flex items-center  mt-2">
                <FaCheckCircle className="mr-2 text-green-600 text-sm" />
                <p className="text-gray-600 text-sm">There are no prerequisites for this course</p>
              </div>
            </div>

            {/* Curriculum */}
            <div className=" py-6 rounded-lg">
              {curriculum.map((section, index) => (
                <div key={index} className="mt-4 border border-gray-300 rounded-sm">
                  <div
                    className="flex justify-between items-center cursor-pointer  p-3 rounded-lg"
                    onClick={() => toggleSection(index)}
                  >
                    <span className="text-sm">{section.title}</span>
                    <span className="text-[#1B09A2] text-xs font-bold">
                      {expanded === index ? (
                        <div className="flex items-center justify-center space-x-1"><div>Hide Details</div> <FaChevronUp className="pt-1" /></div>
                      ) : (
                          <div className="flex items-center justify-center space-x-1"><div>Show Details</div> <FaChevronDown className="pt-1" /></div>
                      )}
                    </span>
                  </div>
                 
                  {expanded === index && section.lessons.length > 0 && (
                    <div className=" px-3 rounded-lg">
                      <div className="border-b border-gray-300 my-2"></div>
                      <ul className="list-disc pl-6 text-sm ">
                        {section.lessons.map((lesson, i) => (
                          <li key={i} className="text-gray-600 py-3">
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-6 px-40 lg:w-5/12 w-full">
            <div className="bg-white p-6 border border-gray-300 rounded-lg mx-auto w-10/12">
              <h2 className="font-semibold">Instructors</h2>
              <div className="border-b border-gray-300 my-2"></div>
              <div className="mt-3 flex items-center">
                <Image
                  src="/assets/images/course1.jpg"
                  alt="Instructor"
                  className="h-12 w-12 rounded-full"
                  height={100}
                  width={100}
                />
                <div className="ml-3">
                  <p className="font-semibold text-[#1B09A2]">Shadout Mapes</p>
                  <p className="text-gray-500 text-sm">
                    Co-founder of DataCamp
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center">
                <Image
                  src="/assets/images/course2.jpeg"
                  alt="Instructor"
                  className="h-12 w-12 rounded-full"
                  height={100}
                  width={100}
                />
                <div className="ml-3">
                  <p className="font-semibold text-[#1B09A2]">Shai Hulud</p>
                  <p className="text-gray-500 text-sm">
                    Co-founder of DataCamp
                  </p>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="mt-5">
              <div className="bg-white p-6 border border-gray-300 rounded-lg mx-auto w-10/12">
                <div className="flex items-center mt-3">
                  <input
                    type="text"
                    placeholder="Have a voucher code? Input here"
                    className="border border-gray-700 p-2 rounded-bl-md rounded-tl-md  w-full text-sm"
                  />
                  <button className="bg-[#1B09A2] text-white px-4 py-2 rounded-br-md rounded-tr-md text-base">
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
              <div className="bg-white  mx-auto w-10/12">
                <button className="mt-4 bg-[#1B09A2] text-white px-4 py-3 rounded-lg w-full text-sm">
                  Add Course to Cart
                </button>
                <button className="mt-2 border border-[#1B09A2] text-[#1B09A2] px-4 py-3 rounded-lg w-full text-sm">
                  Buy Course Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
