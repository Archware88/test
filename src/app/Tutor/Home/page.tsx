"use client"

import { useState } from "react";
import React from "react";
import Navbar from "@/components/GeneralComponents/NavbarState";
import Footer from "@/components/GeneralComponents/Footer";
// import Link from "next/link";
import AuthContainer from "@/components/AuthComponents/AuthContainer";
import Image from "next/image";
import { SiLinkedin } from "react-icons/si";
import { BsFillPersonPlusFill, BsCameraVideoFill, BsCashStack } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
    { question: "What is Archware Institute?", answer: "Archware Institute is an online learning platform offering courses in various disciplines to help learners grow their skills." },
    { question: "Who are the courses designed for?", answer: "Our courses are designed for students, professionals, and anyone looking to enhance their knowledge in a specific field." },
    { question: "What types of courses are available?", answer: "We offer a variety of courses, including technology, business, personal development, and more." },
    { question: "Are the courses self-paced?", answer: "Yes, all our courses are self-paced, allowing you to learn at your convenience." },
    { question: "Do I receive a certificate after completing a course?", answer: "Yes, upon successful completion, you will receive a certificate that you can showcase on LinkedIn or your resume." },
    { question: "How are the courses delivered?", answer: "Courses are delivered online through video lectures, readings, and interactive assignments." }
];


const TeachPage = () => {

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const [showAuth, setShowAuth] = useState(false);
    const [authDefaultStep, setAuthDefaultStep] = useState<"login" | "signup">("login");

    const openSignupModal = () => {
        setAuthDefaultStep("signup");
        setShowAuth(true);
    };

    return (
        <div className="w-full">

            <Navbar/>

            {/* Hero Section */}
            <section className="relative w-full h-[420px] bg-cover bg-[center_top_-43px] flex flex-col items-center justify-center text-white text-center px-4 pt-[86px] pb-[1px] mt-[80px]"
                style={{ backgroundImage: "url('/assets/images/instructor-home.jpg')" }}>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-70"></div>

                {/* Content */}
                <div className="relative z-10 mt-[-200px]">
                    <h1 className="text-[42px] font-medium">Inspire Creativity in Others</h1>
                    <p className="mt-4 max-w-[592px]">
                        Teach on Archware Institute and share your passion with members around the world.
                    </p>
                </div>

                {/* Bottom Box */}
                <div className="absolute bottom-0 w-[592px] h-[164px] bg-[#1B09A2] text-white text-sm font-normal px-4 pt-[23px] rounded-t-lg ">

                    <p>
                        Before signing up, check out this
                        <a href="#" className="text-[#88D613] border-b-2 border-[#88D613] pb-1"> Teacher Help Center </a>
                        article, which will guide you through the sign-up process.
                    </p>

                    <button
                        onClick={openSignupModal}>
                        <div className="mt-5 text-[#101010] px-6 py-2 rounded-md hover:brightness-110 cusor-pointer"
                            style={{ backgroundColor: '#88D613', border: '2px solid #88D613' }}>
                            Become a Tutor
                        </div>
                    </button>
                </div>
            </section>


            {/* Why Teach Section */}
            <section className="w-full bg-gray-50 py-16 flex justify-center">
                {/* Outer Container */}
                <div className="max-w-5xl w-full bg-white rounded-md  py-16 relative">
                    {/* Decorative Icons (optional) */}
                    <Image
                        src="/assets/images/star1.svg"
                        alt="Decor Left"
                        className="absolute top-0 left-0"
                        width={40}
                        height={40}
                    />
                    <Image
                        src="/assets/images/star.svg"
                        alt="Decor Right"
                        className="absolute top-0 right-0"
                        width={40}
                        height={40}
                    />

                    {/* Title */}
                    <h2 className="text-3xl font-medium text-center ">
                        Why Teach on Archware Institute?
                    </h2>

                    {/* Subheading */}
                    <p className="mt-4 text-lg font-medium text-center">
                        When you help others along their creative journey, it’s rewarding in more ways than one.
                    </p>

                    {/* Paragraph */}
                    <p className="mt-6 text-gray-600 text-sm leading-relaxed max-w-3xl mx-auto text-center">
                        By teaching on Archware Institute, you can grow your online following, give back,
                        and earn money. Top-earning teachers make $100,000+ each year. Archware Institute
                        teachers are real working creatives and experts eager to share their expertise.
                        If you`&apos;`re an experienced creative pro with tips, techniques, and skills to demonstrate,
                        we offer an extensive suite of resources and responsive support to help you create
                        classes that inspire.
                    </p>
                </div>
            </section>

            {/* Testimonial Section */}
            <div className="mt-20 bg-gray-50">
            <section className="w-full bg-[#1B09A2] pt-16 pb-12 text-white text-center relative">
                {/* Star Shapes on Both Sides */}
                <div className="absolute left-16 top-1/2 transform -translate-y-1/2">
                    <Image
                        src="/assets/images/star3.svg"
                        alt="Left Star"
                        className="w-[58px] h-auto"
                        width={58}
                        height={58}
                    />
                </div>
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                    <Image
                        src="/assets/images/star4.svg"
                        alt="Right Star"
                        className="w-[58px] h-auto"
                        width={58}
                        height={58}
                    />
                </div>
                {/* Overlapping Image */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <Image
                        src="/assets/images/container.svg"
                        alt="Gbolahan Adekoya"
                        className="w-32 h-32 rounded-full  object-cover shadow-lg"
                        width={128}
                        height={128}
                    />
                </div>

                {/* Content Container */}
                <div className="max-w-3xl mx-auto mt-10 px-4">
                    <p className="text-xl font-bold">
                        Teaching on Archware Institute helped Gbolahan Adekoya see his work in a whole new way,
                        and inspire members all over the world.
                    </p>
                    <p className="mt-4 text-gray-300">
                        Meet <span className="font-bold">Gbolahan Adekoya</span>, Senior Software Developer, Google Inc &amp; Instructor at Archware Institute
                    </p>

                    {/* View LinkedIn Button */}
                    <center>
                            <button className="mt-6 px-6 py-2 cusor-pointer border-[0.5px] text-sm border-white rounded-md hover:bg-white hover:text-[#1B09A2] transition flex items-center justify-center gap-2">
                        <SiLinkedin size={24} color="white" className="w-3 h-3"/>
                        View LinkedIn
                    </button>
                        </center>
                </div>
            </section>
            </div>


            {/* How Teaching Works Section */}
            <section className="py-16 px-6 bg-gray-100 text-center">
                <h2 className="text-3xl font-meduium text-gray-900 mb-10">How Teaching Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="border border-[#1B09A2] p-6 rounded-lg bg-white shadow-md">
                        <div className="flex justify-center mb-4">
                            <BsFillPersonPlusFill size={40} color="#1B09A2" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Sign Up to Teach</h3>
                        <p className="text-gray-600">
                            Start an account and sign up to teach a class or offer 1-on-1s! You`&apos;`ll be approved almost instantly if your topic aligns with our Content Guidelines.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="border border-[#1B09A2] p-6 rounded-lg bg-white shadow-md">
                        <div className="flex justify-center mb-4">
                            <BsCameraVideoFill size={40} color="#1B09A2" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Create Your Content</h3>
                        <p className="text-gray-600">
                            Film your class and publish it with our easy upload tool, or offer mentorship via our 1-on-1 feature. We provide help every step of the way!
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="border border-[#1B09A2] p-6 rounded-lg bg-white shadow-md">
                        <div className="flex justify-center mb-4">
                            <BsCashStack size={40} color="#1B09A2" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Start Earning</h3>
                        <p className="text-gray-600">
                            You`&apos;`ll be paid monthly for every member who watches your classes, forever. Top earning teachers make $100,000+ a year.
                        </p>
                    </div>
                </div>

                {/* Button */}
                <div className="mt-10">
                    <button
                        onClick={openSignupModal} className="bg-[#88D613] text-sm text-black cusor-pointer px-6 py-3 rounded-lg  font-medium hover:bg-[#2F9A53] transition">
                        <>
                            Become a Tutor
                        </>
                    </button>
                </div>
            </section>


            {/* FAQ Section */}
            <section className="py-16 px-6 bg-gray-100">
                <h2 className="text-xl md:text-2xl  text-center text-gray-900 mb-8">
                    FREQUENTLY ASKED QUESTIONS
                </h2>

                <div className="max-w-3xl mx-auto">
                    <div className="border-b border-gray-300"></div>
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-300">
                            <button
                                className="w-full text-left py-6 px-2 flex justify-between cusor-pointer items-center text-gray-800 hover:text-blue-600 transition"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-lg font-medium">{faq.question}</span>
                                <span className="text-xl">
                                    {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                                </span>
                            </button>
                            {openIndex === index && (
                                <p className="px-4 pb-4 text-gray-600">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
            {showAuth && (
                <AuthContainer
                    onClose={() => setShowAuth(false)}
                    defaultStep={authDefaultStep}
                />
            )}

        </div>

    );
};

export default TeachPage;