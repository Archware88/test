import { get } from "./api"; // Assuming `get` is a pre-configured method
import { IProfileInfo } from "../types/types";

export const fetchProfileInfo = async (): Promise<IProfileInfo | null> => {
  try {
    const response = await get<{ status: boolean; user_info: IProfileInfo }>(
      "/profile-info"
    );
    return response.status ? response.user_info : null;
  } catch (error) {
    console.error("Fetch Profile Info API error:", error);
    return null;
  }
};

