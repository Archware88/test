import { get } from "./api"; // Assuming `get` is a pre-configured method
import { IInstructorInfo } from "../types/types";

export const fetchInstructorInfo = async (): Promise<IInstructorInfo | null> => {
  try {
    const response = await get<{ status: boolean; user_info: IInstructorInfo }>(
      "/my-profile"
    );

    if (response.status) {
      return response.user_info;
    }

    return null;
  } catch (error) {
    console.error("Fetch Profile Info API error:", error);
    return null;
  }
};
