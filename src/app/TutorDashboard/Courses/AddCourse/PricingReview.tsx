"use client";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { createCoursePricing, createCourseMessages, markCourseSetupDone } from "@/api/course-setup"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const PricingReview = () => {
    const [currency, setCurrency] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [referralLink] = useState("https://www.archwareinstitute.com/course/6448211?referralCode=2B09B2B83BD5A2A267");
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [congratsMessage, setCongratsMessage] = useState("");
    const [loading, setLoading] = useState(false); // State for loading
 
    const router = useRouter();

    const [courseId, setCourseId] = useState<string | null>(null);
    
        useEffect(() => {
            if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                setCourseId(params.get('courseId'));
            }
        }, []);

    // Function to copy referral link
    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        alert("Referral link copied!");
    };

    // Submit function to trigger both APIs
    const handleSubmit = async () => {
        if (!courseId) {
            alert("Course ID is missing");
            return;
        }

        setLoading(true);

        try {
            // Prepare FormData for Course Pricing
            const pricingFormData = new FormData();
            pricingFormData.append("course_id", courseId);
            pricingFormData.append("course_price[]", String(price));

            // Prepare FormData for Course Messages
            const messagesFormData = new FormData();
            messagesFormData.append("course_id", courseId);
            messagesFormData.append("welcome_message", welcomeMessage);
            messagesFormData.append("congratulation_message", congratsMessage);

            // Send pricing and message requests in parallel
            const [pricingResponse, messagesResponse] = await Promise.all([
                createCoursePricing(pricingFormData),
                createCourseMessages(messagesFormData),
            ]);

            if (pricingResponse?.status && messagesResponse?.status) {
                // ✅ Now mark the course setup as completed
                const setupResponse = await markCourseSetupDone({
                    course_id: Number(courseId),
                    completed_status: true,
                });

                if (setupResponse?.status) {
                    alert("Course setup completed successfully!");
                    router.push("/TutorDashboard/Courses"); 
                } else {
                    alert("Course setup marking failed. Please try again.");
                    console.error("Setup error:", setupResponse?.errors);
                }
            } else {
                alert("Failed to update some course data. Check your inputs and try again.");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("An error occurred while updating course data.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-6 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Pricing & Review</h1>

            {/* Currency & Price */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block font-semibold mb-1">Currency</label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="border p-2 w-full rounded"
                    >
                        <option value="">Select Currency</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                    </select>
                </div>
                <div>
                    <label className="block font-semibold mb-1">Price (in numbers)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                        placeholder="Enter a number"
                        className="border p-2 w-full rounded"
                    />
                </div>
            </div>

            {/* Referral Link */}
            <div className="mb-4">
                <label className="block font-semibold mb-1">Referral</label>
                <p className="text-sm text-gray-500 mb-1">
                    (Any time a student uses this link, we will credit you with the sale.
                    <a href="#" className="text-blue-600"> Learn more</a>)
                </p>
                <div className="flex items-center border rounded p-2">
                    <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="w-full bg-gray-100 border-none outline-none"
                    />
                    <button onClick={copyToClipboard} className="bg-blue-600 text-white px-3 py-1 rounded ml-2">
                        <FiCopy />
                    </button>
                </div>
            </div>

            {/* Coupons Section */}
            <div className="mb-4">
                <h2 className="font-semibold">Coupons and Promotions</h2>
                <div className="border p-3 rounded mt-2">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Active Coupons</h3>
                        <button className="text-blue-600 text-sm">Create Coupon</button>
                    </div>
                    <p className="text-gray-500">No Coupon Found</p>
                </div>
                <div className="border p-3 rounded mt-2">
                    <h3 className="font-medium">Expired Coupons</h3>
                    <p className="text-gray-500">No Coupon Found</p>
                </div>
            </div>

            {/* Course Messages */}
            <div className="mb-4">
                <h2 className="font-semibold">Course Messages</h2>
                <div className="mt-2">
                    <label className="block font-medium">Welcome Message</label>
                    <textarea
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        placeholder="Welcome Message Here"
                        className="border p-2 w-full rounded mt-1"
                        rows={3}
                    ></textarea>
                </div>
                <div className="mt-2">
                    <label className="block font-medium">Congratulations Message</label>
                    <textarea
                        value={congratsMessage}
                        onChange={(e) => setCongratsMessage(e.target.value)}
                        placeholder="Congratulations Message Here"
                        className="border p-2 w-full rounded mt-1"
                        rows={3}
                    ></textarea>
                </div>
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className={`mt-4 px-6 py-2 bg-blue-800 text-white rounded w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
        </div>
    );
};

export default PricingReview;
