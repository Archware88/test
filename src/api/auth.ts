import { get , post } from "./api";
import {
  IUserCreateData,
  IUserResponse,
  IInstructorCreateData,
  IUserLoginData,
  IUserUpdateData,
} from "../types/types";

// Create a new user
export const createUser = async (
  data: IUserCreateData
): Promise<IUserResponse | null> => {
  try {
    const response = await post<IUserResponse>("/register", data);
    return response;
  } catch (error) {
    console.error("Create User API error:", error);
    return null;
  }
};

// Register a new instructor
export const registerInstructor = async (
  data: IInstructorCreateData
): Promise<IUserResponse | null> => {
  try {
    const response = await post<IUserResponse>("/register-instructor", data);
    return response;
  } catch (error) {
    console.error("Register Instructor API error:", error);
    return null;
  }
};

// User login
export const loginUser = async (
  data: IUserLoginData
): Promise<IUserResponse | null> => {
  try {
    const response = await post<IUserResponse>("/login", data);
    return response;
  } catch (error) {
    console.error("Login User API error:", error);
    return null;
  }
};
export const verifyEmail = async (
  token: string
): Promise<{ message: string } | null> => {
  try {
    const response = await get<{ message: string }>(`/verify-email/${token}`);
    return response;
  } catch (error) {
    console.error("Verify Email API error:", error);
    return null;
  }
};
export const updateUserProfile = async (
  data: IUserUpdateData
): Promise<IUserResponse | null> => {
  try {
    const response = await post<IUserResponse>("/update-user-profile", data);
    return response;
  } catch (error) {
    console.error("Update User API error:", error);
    return null;
  }
};