"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { createCourseDescription } from "@/api/course-setup"; // Import API helper

const CourseStructure = ({
    nextStep,
    // prevStep,
}: {
    currentStep: number;
    nextStep: () => void;
    prevStep: () => void;
}) => {

    const [learningObjectives, setLearningObjectives] = useState(["", "", "", ""]);
    const [prerequisites, setPrerequisites] = useState([""]);
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [congratulationsMessage, setCongratulationsMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [courseId, setCourseId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setCourseId(params.get('courseId'));
        }
    }, []);

    // Handle Input Changes
    const handleLearningObjectiveChange = (index: number, value: string) => {
        const newObjectives = [...learningObjectives];
        newObjectives[index] = value;
        setLearningObjectives(newObjectives);
    };

    const addLearningObjective = () => setLearningObjectives([...learningObjectives, ""]);
    const removeLearningObjective = (index: number) => {
        if (learningObjectives.length > 4) {
            setLearningObjectives(learningObjectives.filter((_, i) => i !== index));
        }
    };

    const handlePrerequisiteChange = (index: number, value: string) => {
        const newPrerequisites = [...prerequisites];
        newPrerequisites[index] = value;
        setPrerequisites(newPrerequisites);
    };

    const addPrerequisite = () => setPrerequisites([...prerequisites, ""]);
    const removePrerequisite = (index: number) => {
        setPrerequisites(prerequisites.filter((_, i) => i !== index));
    };

    // Submit Data as JSON
    const handleSubmit = async () => {
        if (!courseId) {
            alert("Course ID is missing");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("course_id", courseId); // Use the courseId from URL

        // Append each learning objective
        learningObjectives
            .filter(obj => obj.trim() !== "")
            .forEach((obj, index) => {
                formData.append(`course_objective[${index}]`, obj);
            });

        // ... (rest of your formData appends remain the same) ...

        try {
            const response = await createCourseDescription(formData);
            if (response?.status) {
                console.log("Course description added successfully:", response);
                nextStep();
            } else {
                console.error("Failed to add course description:", response);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Course Structure</h1>

            {/* Learning Objectives */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">
                    What will the students learn?{" "}
                    <span className="text-gray-500 text-sm">(At least 4 objectives)</span>
                </label>
                {learningObjectives.map((objective, index) => (
                    <div key={index} className="relative mb-2">
                        <input
                            type="text"
                            placeholder="Write Course objectives here"
                            value={objective}
                            onChange={(e) => handleLearningObjectiveChange(index, e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {learningObjectives.length > 4 && (
                            <button onClick={() => removeLearningObjective(index)} className="absolute right-2 top-2 text-red-500">
                                <FiX />
                            </button>
                        )}
                    </div>
                ))}
                <button onClick={addLearningObjective} className="text-blue-600 flex items-center mt-2">
                    <FiPlus className="mr-1" /> Add More response
                </button>
            </div>

            {/* Prerequisites */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">
                    What are the prerequisites?{" "}
                    <span className="text-gray-500 text-sm">(Required skills, tools, etc.)</span>
                </label>
                {prerequisites.map((prerequisite, index) => (
                    <div key={index} className="relative mb-2">
                        <input
                            type="text"
                            placeholder="Write Course Prerequisite here"
                            value={prerequisite}
                            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {prerequisites.length > 1 && (
                            <button onClick={() => removePrerequisite(index)} className="absolute right-2 top-2 text-red-500">
                                <FiX />
                            </button>
                        )}
                    </div>
                ))}
                <button onClick={addPrerequisite} className="text-blue-600 flex items-center mt-2">
                    <FiPlus className="mr-1" /> Add More response
                </button>
            </div>

            {/* Welcome Message */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Welcome Message</label>
                <textarea
                    placeholder="Welcome Message Here"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    className="w-full p-2 border rounded h-24"
                />
            </div>

            {/* Congratulations Message */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Congratulations Message</label>
                <textarea
                    placeholder="Congratulations Message Here"
                    value={congratulationsMessage}
                    onChange={(e) => setCongratulationsMessage(e.target.value)}
                    className="w-full p-2 border rounded h-24"
                />
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-2 mt-4 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
                {loading ? "Submitting..." : "Save & Continue"}
            </button>
            <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-[#1B09A2] text-white rounded-lg"
            >
                Next
            </button>
        </div>
    );
};

export default CourseStructure;
