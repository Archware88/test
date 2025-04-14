import { get } from "./api";
import { ICourse, ICategory } from "../types/types";

export const fetchStudentCourses = async (): Promise<ICourse[] | null> => {
  try {
    const response = await get<{ status: boolean; courses: ICourse[] }>(
      "/get-course-student-purhcase"
    );
    return response.status ? response.courses : null;
  } catch (error) {
    console.error("Fetch Student Courses API error:", error);
    return null;
  }
};

// New function to fetch popular courses
export const fetchPopularCourses = async (): Promise<ICourse[] | null> => {
  try {
    const response = await get<{ courses: ICourse[] }>("/get-popular-courses");
    return response.courses ?? null;
  } catch (error) {
    console.error("Fetch Popular Courses API error:", error);
    return null;
  }
};

export const fetchTrendingCourses = async (): Promise<ICourse[] | null> => {
  try {
    const response = await get<{ courses: ICourse[] }>("/get-trending-courses");
    return response.courses || null;
  } catch (error) {
    console.error("Fetch Trending Courses API error:", error);
    return null;
  }
};

export const fetchCategories = async (): Promise<ICategory[] | null> => {
  try {
    const response = await get<{ categories: ICategory[] }>(
      "/get-all-categories"
    );
    return response.categories ?? null;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

// Fetch courses for a specific category
export const fetchCoursesByCategory = async (
  categoryId: number
): Promise<ICourse[] | null> => {
  try {
    const response = await get<{ courses: ICourse[] }>(
      `/get-courses-in-category/${categoryId}`
    );
    return response.courses ?? null;
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    return null;
  }
};

export const fetchAllCourses = async (): Promise<ICourse[] | null> => {
  try {
    const response = await get<{ courses: ICourse[] }>("/get-all-courses");
    return response.courses ?? null;
  } catch (error) {
    console.error("Error fetching all courses:", error);
    return null;
  }
};

// Fetch courses created by the instructor
export const fetchInstructorCourses = async (): Promise<ICourse[] | null> => {
  try {
    const response = await get<{ courses: ICourse[] }>("/instructor-courses");
    return response.courses ?? null;
  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    return null;
  }
};