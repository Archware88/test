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

interface CourseModule {
    id: string;
    title: string;
    editing: boolean;
    lessons: Lesson[];
}

const CourseContent = ({ nextStep }: { currentStep: number, nextStep: () => void, prevStep: () => void }) => {
    const [courseModules, setCourseModules] = useState<CourseModule[]>([
        {
            id: "1",
            title: "Module 1: Introduction",
            editing: false,
            lessons: [],
        },
    ]);
    const [isSaving, setIsSaving] = useState(false);

    const submitCurriculum = async (moduleToSave?: CourseModule) => {
        setIsSaving(true);

        try {
            const modulesToSave = moduleToSave ? [moduleToSave] : courseModules;

            for (const courseModule of modulesToSave) {
                const formData = new FormData();
                formData.append("course_id", "1");
                formData.append("course_section", courseModule.title);

                courseModule.lessons.forEach((lesson, index) => {
                    formData.append(`course_lesson[${index}][title]`, lesson.title);
                    if (lesson.note) {
                        formData.append(`course_lesson[${index}][note]`, lesson.note);
                    }

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

                console.log("--- FormData Contents ---");
                for (const [key, value] of formData.entries()) {
                    console.log(key, value instanceof File ? `[File] ${value.name}` : value);
                }

                const response = await createCourseCurriculum(formData);
                console.log("API Response:", response);
            }
        } catch (error) {
            console.error("Error submitting curriculum:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const canAddNewModule = () => {
        if (courseModules.length === 0) return true;

        const lastModule = courseModules[courseModules.length - 1];
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

    const addModule = async () => {
        if (courseModules.length > 0 && !canAddNewModule()) {
            alert("Please complete the current module before adding a new one");
            return;
        }

        if (courseModules.length > 0) {
            await submitCurriculum(courseModules[courseModules.length - 1]);
        }

        const newModule = {
            id: Date.now().toString(),
            title: `Module ${courseModules.length + 1}: Untitled`,
            editing: false,
            lessons: [],
        };
        setCourseModules([...courseModules, newModule]);
    };

    const removeModule = (id: string) => {
        const updatedModules = courseModules.filter((courseModule) => courseModule.id !== id);
        setCourseModules(updatedModules.map((m, i) => ({ ...m, title: `Module ${i + 1}: ${m.title.split(": ")[1]}` })));
    };

    const toggleEdit = (id: string) => {
        setCourseModules(
            courseModules.map((courseModule) =>
                courseModule.id === id ? { ...courseModule, editing: !courseModule.editing } : courseModule
            )
        );
    };

    const updateTitle = (id: string, newTitle: string) => {
        setCourseModules(
            courseModules.map((courseModule) =>
                courseModule.id === id ? { ...courseModule, title: newTitle } : courseModule
            )
        );
    };

    const addLesson = (moduleId: string) => {
        setCourseModules(
            courseModules.map((courseModule) =>
                courseModule.id === moduleId
                    ? {
                        ...courseModule,
                        lessons: [
                            ...courseModule.lessons,
                            {
                                id: Date.now().toString(),
                                title: "",
                                contentType: null,
                                content: null,
                                note: ""
                            }
                        ]
                    }
                    : courseModule
            )
        );
    };

    const setLessonContent = (moduleId: string, lessonId: string, type: "video" | "article" | "slides") => {
        setCourseModules(
            courseModules.map((courseModule) =>
                courseModule.id === moduleId
                    ? {
                        ...courseModule,
                        lessons: courseModule.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, contentType: type, content: type === "article" ? "" : null } : lesson
                        ),
                    }
                    : courseModule
            )
        );
    };

    const handleFileUpload = (moduleId: string, lessonId: string, file: File) => {
        setCourseModules(
            courseModules.map((courseModule) =>
                courseModule.id === moduleId
                    ? {
                        ...courseModule,
                        lessons: courseModule.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, content: file } : lesson
                        ),
                    }
                    : courseModule
            )
        );
    };

    const updateLessonTitle = (moduleId: string, lessonId: string, title: string) => {
        setCourseModules(
            courseModules.map((courseModule) =>
                courseModule.id === moduleId
                    ? {
                        ...courseModule,
                        lessons: courseModule.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, title } : lesson
                        ),
                    }
                    : courseModule
            )
        );
    };

    const updateLessonNote = (moduleId: string, lessonId: string, note: string) => {
        setCourseModules(
            courseModules.map((courseModule) =>
                courseModule.id === moduleId
                    ? {
                        ...courseModule,
                        lessons: courseModule.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, note } : lesson
                        ),
                    }
                    : courseModule
            )
        );
    };

    const updateArticleContent = (moduleId: string, lessonId: string, content: string) => {
        setCourseModules(
            courseModules.map((courseModule) =>
                courseModule.id === moduleId
                    ? {
                        ...courseModule,
                        lessons: courseModule.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, content } : lesson
                        ),
                    }
                    : courseModule
            )
        );
    };

    const removeLessonContent = (moduleId: string, lessonId: string) => {
        setCourseModules(
            courseModules.map((courseModule) =>
                courseModule.id === moduleId
                    ? {
                        ...courseModule,
                        lessons: courseModule.lessons.map((lesson) =>
                            lesson.id === lessonId ? { ...lesson, contentType: null, content: null } : lesson
                        ),
                    }
                    : courseModule
            )
        );
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Course Content</h1>

            <div className="space-y-4">
                <AnimatePresence>
                    {courseModules.map((courseModule) => (
                        <div key={courseModule.id} className="border rounded p-4 bg-gray-100 flex flex-col">
                            <div className="flex justify-between items-center">
                                {courseModule.editing ? (
                                    <input
                                        type="text"
                                        value={courseModule.title}
                                        onChange={(e) => updateTitle(courseModule.id, e.target.value)}
                                        onBlur={() => toggleEdit(courseModule.id)}
                                        autoFocus
                                        className="border p-1 rounded w-full"
                                    />
                                ) : (
                                    <h2 className="font-semibold">{courseModule.title}</h2>
                                )}

                                <div className="flex items-center space-x-2">
                                    <FiEdit className="text-gray-500 cursor-pointer" onClick={() => toggleEdit(courseModule.id)} />
                                    <FiTrash className="text-red-500 cursor-pointer" onClick={() => removeModule(courseModule.id)} />
                                </div>
                            </div>

                            <div className="mt-3 flex space-x-4 text-blue-600 text-sm">
                                <button onClick={() => addLesson(courseModule.id)} className="flex items-center">
                                    <FiPlus className="mr-1" /> Add Lesson
                                </button>
                            </div>

                            {courseModule.lessons.map((lesson) => (
                                <div key={lesson.id} className="mt-3 border p-3 rounded bg-white">
                                    <label className="text-sm font-semibold">Lecture Title</label>
                                    <input
                                        type="text"
                                        placeholder="Lecture Title Here"
                                        className="border p-2 w-full mt-1 rounded"
                                        value={lesson.title}
                                        onChange={(e) => updateLessonTitle(courseModule.id, lesson.id, e.target.value)}
                                        required
                                    />

                                    <label className="text-sm font-semibold mt-3 block">Lecture Note</label>
                                    <input
                                        type="text"
                                        placeholder="Short description"
                                        className="border p-2 w-full mt-1 rounded"
                                        value={lesson.note || ""}
                                        onChange={(e) => updateLessonNote(courseModule.id, lesson.id, e.target.value)}
                                    />

                                    <label className="text-sm font-semibold mt-3 block">Lecture Content</label>
                                    <div className="flex space-x-4 mt-2">
                                        <button
                                            onClick={() => setLessonContent(courseModule.id, lesson.id, "video")}
                                            className={`border p-2 rounded text-center w-1/3 ${lesson.contentType === "video" ? "bg-blue-100" : ""}`}
                                        >
                                            Video
                                        </button>
                                        <button
                                            onClick={() => setLessonContent(courseModule.id, lesson.id, "article")}
                                            className={`border p-2 rounded text-center w-1/3 ${lesson.contentType === "article" ? "bg-blue-100" : ""}`}
                                        >
                                            Article
                                        </button>
                                        <button
                                            onClick={() => setLessonContent(courseModule.id, lesson.id, "slides")}
                                            className={`border p-2 rounded text-center w-1/3 ${lesson.contentType === "slides" ? "bg-blue-100" : ""}`}
                                        >
                                            Slides
                                        </button>
                                    </div>

                                    {lesson.contentType === "video" && (
                                        <div className="border-dashed border-2 border-gray-400 p-4 mt-3 relative">
                                            <input
                                                type="file"
                                                className="w-full"
                                                accept="video/*"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        handleFileUpload(courseModule.id, lesson.id, e.target.files[0]);
                                                    }
                                                }}
                                                required
                                            />
                                            <button onClick={() => removeLessonContent(courseModule.id, lesson.id)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">
                                                <FiX />
                                            </button>
                                        </div>
                                    )}

                                    {lesson.contentType === "article" && (
                                        <div className="mt-3">
                                            <textarea
                                                placeholder="Write your article here..."
                                                className="border p-2 w-full rounded"
                                                value={typeof lesson.content === "string" ? lesson.content : ""}
                                                onChange={(e) => updateArticleContent(courseModule.id, lesson.id, e.target.value)}
                                                required
                                            ></textarea>
                                            <button onClick={() => removeLessonContent(courseModule.id, lesson.id)} className="mt-2 bg-red-500 text-white p-1 rounded">
                                                Remove
                                            </button>
                                        </div>
                                    )}

                                    {lesson.contentType === "slides" && (
                                        <div className="border p-4 mt-3 relative">
                                            <input
                                                type="file"
                                                accept=".ppt,.pptx,.pdf"
                                                className="w-full"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        handleFileUpload(courseModule.id, lesson.id, e.target.files[0]);
                                                    }
                                                }}
                                                required
                                            />
                                            <button onClick={() => removeLessonContent(courseModule.id, lesson.id)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">
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