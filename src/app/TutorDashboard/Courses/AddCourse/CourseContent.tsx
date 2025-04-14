"use client";
import { useState } from "react";
import { FiTrash, FiEdit, FiPlus, FiX } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { createCourseCurriculum } from "@/api/course-setup";

interface Lesson {
    id: string;
    title: string;
    contentType: "video" | "article" | "slides" | null;
    content: File | string | null;
    note?: string;
}

interface Module {
    id: string;
    title: string;
    editing: boolean;
    lessons: Lesson[];
}

const CourseContent = ({ currentStep, nextStep, prevStep }: { currentStep: number, nextStep: () => void, prevStep: () => void }) => {
    const [modules, setModules] = useState<Module[]>([
        {
            id: "1",
            title: "Module 1: Introduction",
            editing: false,
            lessons: [],
        },
    ]);
    const [isSaving, setIsSaving] = useState(false);

    // Function to prepare and submit the form data
    const submitCurriculum = async (moduleToSave?: Module) => {
        setIsSaving(true);

        try {
            const modulesToSave = moduleToSave ? [moduleToSave] : modules;

            for (const module of modulesToSave) {
                const formData = new FormData();

                // Append required fields
                formData.append("course_id", "1"); // Ensure this is a string
                formData.append("course_section", module.title);

                // Append lessons
                module.lessons.forEach((lesson, index) => {
                    formData.append(`course_lesson[${index}][title]`, lesson.title);
                    if (lesson.note) {
                        formData.append(`course_lesson[${index}][note]`, lesson.note);
                    }

                    // Handle file uploads
                    if (lesson.contentType === "video" && lesson.content instanceof File) {
                        formData.append(`course_lesson[${index}][video]`, lesson.content);
                    }
                    else if (lesson.contentType === "slides" && lesson.content instanceof File) {
                        formData.append(`course_lesson[${index}][resource]`, lesson.content);
                    }
                    else if (lesson.contentType === "article" && typeof lesson.content === "string") {
                        formData.append(`course_lesson[${index}][content]`, lesson.content);
                    }
                });

                // Debug: Log FormData before sending
                console.log("--- FormData Contents ---");
                for (const [key, value] of formData.entries()) {
                    console.log(key, value instanceof File ? `[File] ${value.name}` : value);
                }

                // Send the request
                const response = await createCourseCurriculum(formData);
                console.log("API Response:", response);
            }
        } catch (error) {
            console.error("Error submitting curriculum:", error);
        } finally {
            setIsSaving(false);
        }
    };



    // Function to validate if a module can be saved
    const canAddNewModule = () => {
        if (modules.length === 0) return true;

        const lastModule = modules[modules.length - 1];
        return (
            lastModule.title.trim() !== "" &&
            lastModule.lessons.length > 0 &&
            lastModule.lessons.every(lesson =>
                lesson.title.trim() !== "" &&
                (lesson.contentType !== null && (
                    (lesson.contentType === "article" && typeof lesson.content === "string" && lesson.content.trim() !== "") ||
                    (lesson.contentType !== "article" && lesson.content instanceof File)
                ))
            )
        );
    };

    // Function to add a new module (with auto-save)
    const addModule = async () => {
        if (modules.length > 0 && !canAddNewModule()) {
            alert("Please complete the current module before adding a new one");
            return;
        }

        // Save the current module if it exists
        if (modules.length > 0) {
            await submitCurriculum(modules[modules.length - 1]);
        }

        // Add new module
        const newModule = {
            id: Date.now().toString(),
            title: `Module ${modules.length + 1}: Untitled`,
            editing: false,
            lessons: [],
        };
        setModules([...modules, newModule]);
    };

    // Function to remove a module
    const removeModule = (id: string) => {
        const updatedModules = modules.filter((module) => module.id !== id);
        setModules(updatedModules.map((m, i) => ({ ...m, title: `Module ${i + 1}: ${m.title.split(": ")[1]}` })));
    };

    // Function to toggle edit mode
    const toggleEdit = (id: string) => {
        setModules(
            modules.map((module) =>
                module.id === id ? { ...module, editing: !module.editing } : module
            )
        );
    };

    // Function to update module title
    const updateTitle = (id: string, newTitle: string) => {
        setModules(
            modules.map((module) =>
                module.id === id ? { ...module, title: newTitle } : module
            )
        );
    };

    // Function to add a lesson
    const addLesson = (moduleId: string) => {
        setModules(
            modules.map((module) =>
                module.id === moduleId
                    ? {
                        ...module,
                        lessons: [
                            ...module.lessons,
                            {
                                id: Date.now().toString(),
                                title: "",
                                contentType: null,
                                content: null,
                                note: ""
                            }
                        ]
                    }
                    : module
            )
        );
    };

    // Function to set lesson content type
    const setLessonContent = (moduleId: string, lessonId: string, type: "video" | "article" | "slides") => {
        setModules(
            modules.map((module) =>
                module.id === moduleId
                    ? {
                        ...module,
                        lessons: module.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, contentType: type, content: type === "article" ? "" : null } : lesson
                        ),
                    }
                    : module
            )
        );
    };

    // Function to handle file upload
    const handleFileUpload = (moduleId: string, lessonId: string, file: File) => {
        setModules(
            modules.map((module) =>
                module.id === moduleId
                    ? {
                        ...module,
                        lessons: module.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, content: file } : lesson
                        ),
                    }
                    : module
            )
        );
    };

    // Function to update lesson title
    const updateLessonTitle = (moduleId: string, lessonId: string, title: string) => {
        setModules(
            modules.map((module) =>
                module.id === moduleId
                    ? {
                        ...module,
                        lessons: module.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, title } : lesson
                        ),
                    }
                    : module
            )
        );
    };

    // Function to update lesson note
    const updateLessonNote = (moduleId: string, lessonId: string, note: string) => {
        setModules(
            modules.map((module) =>
                module.id === moduleId
                    ? {
                        ...module,
                        lessons: module.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, note } : lesson
                        ),
                    }
                    : module
            )
        );
    };

    // Function to update article content
    const updateArticleContent = (moduleId: string, lessonId: string, content: string) => {
        setModules(
            modules.map((module) =>
                module.id === moduleId
                    ? {
                        ...module,
                        lessons: module.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, content } : lesson
                        ),
                    }
                    : module
            )
        );
    };

    // Function to remove lesson content
    const removeLessonContent = (moduleId: string, lessonId: string) => {
        setModules(
            modules.map((module) =>
                module.id === moduleId
                    ? {
                        ...module,
                        lessons: module.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, contentType: null, content: null } : lesson
                        ),
                    }
                    : module
            )
        );
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Course Content</h1>

            <div className="space-y-4">
                <AnimatePresence>
                    {modules.map((module) => (
                        <div key={module.id}
                            className="border rounded p-4 bg-gray-100 flex flex-col"
                        >
                            {/* Module Header */}
                            <div className="flex justify-between items-center">
                                {module.editing ? (
                                    <input
                                        type="text"
                                        value={module.title}
                                        onChange={(e) => updateTitle(module.id, e.target.value)}
                                        onBlur={() => toggleEdit(module.id)}
                                        autoFocus
                                        className="border p-1 rounded w-full"
                                    />
                                ) : (
                                    <h2 className="font-semibold">{module.title}</h2>
                                )}

                                <div className="flex items-center space-x-2">
                                    <FiEdit className="text-gray-500 cursor-pointer" onClick={() => toggleEdit(module.id)} />
                                    <FiTrash className="text-red-500 cursor-pointer" onClick={() => removeModule(module.id)} />
                                </div>
                            </div>

                            {/* Module Actions */}
                            <div className="mt-3 flex space-x-4 text-blue-600 text-sm">
                                <button onClick={() => addLesson(module.id)} className="flex items-center">
                                    <FiPlus className="mr-1" /> Add Lesson
                                </button>
                            </div>

                            {/* Lessons Section */}
                            {module.lessons.map((lesson) => (
                                <div key={lesson.id} className="mt-3 border p-3 rounded bg-white">
                                    <label className="text-sm font-semibold">Lecture Title</label>
                                    <input
                                        type="text"
                                        placeholder="Lecture Title Here"
                                        className="border p-2 w-full mt-1 rounded"
                                        value={lesson.title}
                                        onChange={(e) => updateLessonTitle(module.id, lesson.id, e.target.value)}
                                        required
                                    />

                                    <label className="text-sm font-semibold mt-3 block">Lecture Note</label>
                                    <input
                                        type="text"
                                        placeholder="Short description"
                                        className="border p-2 w-full mt-1 rounded"
                                        value={lesson.note || ""}
                                        onChange={(e) => updateLessonNote(module.id, lesson.id, e.target.value)}
                                    />

                                    <label className="text-sm font-semibold mt-3 block">Lecture Content</label>
                                    <div className="flex space-x-4 mt-2">
                                        <button
                                            onClick={() => setLessonContent(module.id, lesson.id, "video")}
                                            className={`border p-2 rounded text-center w-1/3 ${lesson.contentType === "video" ? "bg-blue-100" : ""
                                                }`}
                                        >
                                            Video
                                        </button>
                                        <button
                                            onClick={() => setLessonContent(module.id, lesson.id, "article")}
                                            className={`border p-2 rounded text-center w-1/3 ${lesson.contentType === "article" ? "bg-blue-100" : ""
                                                }`}
                                        >
                                            Article
                                        </button>
                                        <button
                                            onClick={() => setLessonContent(module.id, lesson.id, "slides")}
                                            className={`border p-2 rounded text-center w-1/3 ${lesson.contentType === "slides" ? "bg-blue-100" : ""
                                                }`}
                                        >
                                            Slides
                                        </button>
                                    </div>

                                    {/* Video Upload */}
                                    {lesson.contentType === "video" && (
                                        <div className="border-dashed border-2 border-gray-400 p-4 mt-3 relative">
                                            <input
                                                type="file"
                                                className="w-full"
                                                accept="video/*"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        handleFileUpload(module.id, lesson.id, e.target.files[0]);
                                                    }
                                                }}
                                                required
                                            />
                                            <button onClick={() => removeLessonContent(module.id, lesson.id)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">
                                                <FiX />
                                            </button>
                                        </div>
                                    )}

                                    {/* Article Text Field */}
                                    {lesson.contentType === "article" && (
                                        <div className="mt-3">
                                            <textarea
                                                placeholder="Write your article here..."
                                                className="border p-2 w-full rounded"
                                                value={typeof lesson.content === "string" ? lesson.content : ""}
                                                onChange={(e) => updateArticleContent(module.id, lesson.id, e.target.value)}
                                                required
                                            ></textarea>
                                            <button onClick={() => removeLessonContent(module.id, lesson.id)} className="mt-2 bg-red-500 text-white p-1 rounded">
                                                Remove
                                            </button>
                                        </div>
                                    )}

                                    {/* Slides Upload */}
                                    {lesson.contentType === "slides" && (
                                        <div className="border p-4 mt-3 relative">
                                            <input
                                                type="file"
                                                accept=".ppt,.pptx,.pdf"
                                                className="w-full"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        handleFileUpload(module.id, lesson.id, e.target.files[0]);
                                                    }
                                                }}
                                                required
                                            />
                                            <button onClick={() => removeLessonContent(module.id, lesson.id)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">
                                                <FiX />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add Module Button */}
            <button
                onClick={addModule}
                disabled={isSaving}
                className="mt-4 px-4 py-2 bg-[#1B09A2] text-white rounded flex items-center disabled:opacity-50"
            >
                {isSaving ? "Saving..." : (
                    <>
                        <FiPlus className="mr-1" /> Add Module
                    </>
                )}
            </button>

            {/* Manual Save Button */}
            <button
                onClick={nextStep}
                disabled={isSaving}
                className="mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded flex items-center disabled:opacity-50"
            >
               Next
            </button>
        </div>
    );
};

export default CourseContent;